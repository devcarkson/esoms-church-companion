import { motion } from "framer-motion";
import { Sun, Moon, Users } from "lucide-react";

const services = [
  { day: "Sunday", time: "9:00 AM", title: "Main Worship Service", icon: Sun, note: "Across all parishes" },
  { day: "Wednesday", time: "6:00 PM", title: "Bible Study & Teaching", icon: BookIcon, note: "Mid-week refresh" },
  { day: "Friday", time: "6:00 PM", title: "Prayer Meeting", icon: Moon, note: "Intercession & worship" },
];

function BookIcon(props: any) {
  return <Users {...props} />;
}

export const Services = () => {
  return (
    <section id="services" className="relative py-24 bg-gradient-surface">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Service times</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              Come worship <span className="text-gradient">with us.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Doors open 30 minutes before each service. All are warmly welcome — first-timers especially. 💛
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-bubble"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-primary opacity-10 blur-2xl" />
              <s.icon className="h-6 w-6 text-primary" />
              <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">{s.day}</p>
              <p className="mt-1 font-display text-3xl text-foreground">{s.time}</p>
              <p className="mt-3 font-medium text-foreground">{s.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
