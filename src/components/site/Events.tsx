import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface EventRow {
  id: number;
  name: string;
  event_date: string | null;
  location: string | null;
  description: string | null;
}

export const Events = () => {
  const [events, setEvents] = useState<EventRow[]>([]);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true })
      .then(({ data }) => setEvents((data as EventRow[]) ?? []));
  }, []);

  return (
    <section id="events" className="relative py-24 bg-gradient-surface">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Upcoming events</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              You're <span className="text-gradient">warmly invited.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Mark your calendar and join us for these special gatherings.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {events.map((e, i) => {
            const d = e.event_date ? new Date(e.event_date) : null;
            return (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-5 rounded-3xl border border-border bg-card p-6 shadow-bubble"
              >
                <div className="flex w-20 shrink-0 flex-col items-center rounded-2xl bg-gradient-primary py-3 text-primary-foreground">
                  <span className="text-xs uppercase tracking-wider opacity-90">
                    {d?.toLocaleString("en-US", { month: "short" }) ?? "TBA"}
                  </span>
                  <span className="font-display text-3xl leading-none">{d?.getDate() ?? "—"}</span>
                  <span className="mt-1 text-[10px] opacity-80">{d?.getFullYear() ?? ""}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl text-foreground">{e.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {e.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary" /> {e.location}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {d?.toLocaleDateString("en-US", { weekday: "long" })}
                    </span>
                  </div>
                  {e.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
                  )}
                </div>
              </motion.article>
            );
          })}
          {events.length === 0 && (
            <p className="text-sm text-muted-foreground">No events scheduled at the moment — check back soon.</p>
          )}
        </div>
      </div>
    </section>
  );
};
