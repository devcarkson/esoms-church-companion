import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ParishRow {
  id: number;
  name: string;
  physical_address: string | null;
  elder_in_charge: string | null;
  parish_secretary: string | null;
  contact_details: string | null;
}

export const Parishes = () => {
  const [parishes, setParishes] = useState<ParishRow[]>([]);

  useEffect(() => {
    supabase
      .from("parishes")
      .select("*")
      .order("serial_number", { ascending: true })
      .then(({ data }) => setParishes((data as ParishRow[]) ?? []));
  }, []);

  return (
    <section id="parishes" className="relative py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Find a parish</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            A church <span className="text-gradient">near you.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Visit any of our parishes — you'll be welcomed like family.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {parishes.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-bubble transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <h3 className="font-display text-2xl text-foreground">{p.name} Parish</h3>
              <div className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {p.physical_address && (
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{p.physical_address}</span>
                  </p>
                )}
                {p.elder_in_charge && (
                  <p className="flex items-start gap-2">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{p.elder_in_charge}</span>
                  </p>
                )}
                {p.parish_secretary && (
                  <p className="flex items-start gap-2 pl-6 text-xs">
                    Secretary: {p.parish_secretary}
                  </p>
                )}
                {p.contact_details && (
                  <a
                    href={`tel:${p.contact_details}`}
                    className="flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-glow"
                  >
                    <Phone className="h-4 w-4" />
                    {p.contact_details}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
