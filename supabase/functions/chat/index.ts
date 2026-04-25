// ESOMS Church chatbot — pastoral, grounded streaming chat
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

type Msg = { role: "user" | "assistant" | "system"; content: string };

const PRAYER_KEYWORDS = [
  "pray for",
  "prayer request",
  "please pray",
  "kindly pray",
  "pray with me",
  "intercede",
  "i need prayer",
];

function detectPrayer(text: string): string | null {
  const lower = text.toLowerCase();
  if (PRAYER_KEYWORDS.some((k) => lower.includes(k))) {
    return text.trim().slice(0, 2000);
  }
  return null;
}

async function buildGroundingContext(): Promise<string> {
  const [{ data: parishes }, { data: events }] = await Promise.all([
    admin.from("parishes").select("*").order("serial_number", { ascending: true }),
    admin.from("events").select("*").order("event_date", { ascending: true }),
  ]);

  const parishLines = (parishes ?? []).map((p: any) => {
    const parts = [
      `• ${p.name} Parish`,
      p.physical_address ? `Address: ${p.physical_address}` : null,
      p.elder_in_charge ? `Elder in charge: ${p.elder_in_charge}` : null,
      p.parish_secretary ? `Secretary: ${p.parish_secretary}` : null,
      p.contact_details ? `Phone: ${p.contact_details}` : null,
    ].filter(Boolean);
    return parts.join(" | ");
  });

  const eventLines = (events ?? []).map((e: any) => {
    const date = e.event_date
      ? new Date(e.event_date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "TBA";
    return `• ${date} — ${e.name}${e.location ? ` (${e.location})` : ""}`;
  });

  return `PARISHES:\n${parishLines.join("\n") || "(none)"}\n\nUPCOMING EVENTS:\n${eventLines.join("\n") || "(none)"}`;
}

const SYSTEM_TEMPLATE = (ctx: string) => `You are the ESOMS Church Assistant — a warm, pastoral, supportive 24/7 digital ministry helper.

Tone & style:
- Warm, gentle, encouraging, faith-grounded but never preachy.
- Speak like a caring church member, not a robot. Use simple, clear language.
- Keep replies concise (usually 2–6 short sentences). Use markdown lists for events/parishes.
- Sprinkle a tasteful 🙏 ✨ 💛 only when it adds warmth — never overuse emojis.
- For prayer requests: thank the person, assure them the church stands with them in prayer, and offer one short scripture of comfort.
- If asked something outside church/spiritual scope, gently steer back: "I'm here to help with church information, prayer, and guidance."

Use ONLY the data below for parish and event facts. Do not invent phone numbers, addresses, dates, or names. If something isn't listed, say so kindly and offer to connect the person with the GHQ parish.

CHURCH DATA:
${ctx}

If the user asks about how to join / membership / baptism, invite them warmly to visit any parish on a Sunday and to speak with the Elder in charge or Secretary listed above. Encourage them to also share their name and parish of interest so the church can welcome them properly.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { messages } = (await req.json()) as { messages: Msg[] };
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save prayer requests silently in the background
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) {
      const prayer = detectPrayer(lastUser.content);
      if (prayer) {
        admin.from("prayer_requests").insert({ request: prayer }).then(
          ({ error }) => error && console.error("prayer insert", error),
        );
      }
    }

    const ctx = await buildGroundingContext();
    const systemPrompt = SYSTEM_TEMPLATE(ctx);

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.filter((m) => m.role !== "system"),
          ],
        }),
      },
    );

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: "We're receiving many messages right now. Please try again in a moment 🙏" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await aiResp.text();
      console.error("ai gateway error", aiResp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(aiResp.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
