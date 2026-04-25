import { motion } from "framer-motion";
import { Heart, BookOpen, Users } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Pastoral Care",
    text: "We walk with you through every season — joy, grief, doubt and breakthrough.",
  },
  {
    icon: BookOpen,
    title: "The Word",
    text: "Sound teaching from Scripture, accessible to every heart that seeks Him.",
  },
  {
    icon: Users,
    title: "Community",
    text: "A family across parishes, ministries and generations — welcoming you home.",
  },
];

export const About = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">About ESOMS</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            A community rooted in <span className="text-gradient">faith & love.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            ESOMS Church is a faith-centered community committed to spiritual growth, pastoral care, and
            meaningful service. Wherever you are on your journey, there is a seat for you here.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl border border-border bg-card p-7 shadow-bubble transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-bubble">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-2xl text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
