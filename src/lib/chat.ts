export type ChatMsg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const ANON_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
  signal,
}: {
  messages: ChatMsg[];
  onDelta: (chunk: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
  signal?: AbortSignal;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(ANON_KEY ? { Authorization: `Bearer ${ANON_KEY}` } : {}),
      },
      body: JSON.stringify({ messages }),
      signal,
    });

    if (!resp.ok || !resp.body) {
      let msg = "Something went wrong. Please try again.";
      try {
        const j = await resp.json();
        if (j?.error) msg = j.error;
      } catch {}
      if (resp.status === 429) msg = "We're receiving many messages right now. Please try again in a moment 🙏";
      if (resp.status === 402) msg = "Our AI service needs a top-up. Please try again soon.";
      onError(msg);
      onDone();
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let done = false;

    while (!done) {
      const { done: streamDone, value } = await reader.read();
      if (streamDone) break;
      buffer += decoder.decode(value, { stream: true });

      let nl: number;
      while ((nl = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, nl);
        buffer = buffer.slice(nl + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line || line.startsWith(":")) continue;
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (payload === "[DONE]") {
          done = true;
          break;
        }
        try {
          const parsed = JSON.parse(payload);
          const text = parsed?.choices?.[0]?.delta?.content;
          if (text) onDelta(text);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    if (buffer.trim()) {
      for (let raw of buffer.split("\n")) {
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
        const payload = raw.slice(6).trim();
        if (payload === "[DONE]") continue;
        try {
          const parsed = JSON.parse(payload);
          const text = parsed?.choices?.[0]?.delta?.content;
          if (text) onDelta(text);
        } catch {}
      }
    }

    onDone();
  } catch (e) {
    if ((e as any)?.name === "AbortError") {
      onDone();
      return;
    }
    onError(e instanceof Error ? e.message : "Network error");
    onDone();
  }
}
