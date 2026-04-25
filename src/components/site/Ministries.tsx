import { motion } from "framer-motion";
import { Music, Baby, GraduationCap, HandHelping, HeartHandshake, Sparkles } from "lucide-react";

const ministries = [
  { icon: Music, title: "Worship & Choir", text: "Lifting voices in praise across every service." },
  { icon: Baby, title: "Children's Ministry", text: "Nurturing young hearts in the love of Christ." },
  { icon: GraduationCap, title: "Youth Fellowship", text: "Faith, friendship and purpose for the next generation." },
  { icon: HandHelping, title: "Outreach & Service", text: "Hands and feet of Christ in our neighborhoods." },
  { icon: HeartHandshake, title: "Marriage & Family", text: "Covenant care for couples and homes." },
  { icon: Sparkles, title: "Prayer Band", text: "Standing in the gap for our church and city." },
];

export const Ministries = () => {
  return (
    <section id="ministries" className="relative py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Ministries</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Find your <span className="text-gradient">place to serve.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            There's a ministry for every gift and every season. Discover where you belong.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-bubble"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                <m.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">{m.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
