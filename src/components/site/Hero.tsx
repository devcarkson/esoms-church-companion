import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-sanctuary.jpg";

export const Hero = ({ onOpenChat }: { onOpenChat: () => void }) => {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow" aria-hidden />
      <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden />

      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            A house of prayer for all people
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Where faith meets <br />
            <span className="text-gradient">community & care.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Welcome to <strong className="text-foreground">ESOMS Church</strong> — a warm,
            spirit-filled family across Lagos and beyond. Find a parish, share a prayer
            request, or chat with our 24/7 ministry assistant whenever you need a friend.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button onClick={onOpenChat} className="btn-primary group">
              <MessageCircle className="h-4 w-4" />
              Chat with us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a href="#services" className="btn-secondary">
              Service times
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-6"
          >
            {[
              { k: "5+", v: "Parishes" },
              { k: "24/7", v: "Pastoral chat" },
              { k: "1", v: "Loving family" },
            ].map((s) => (
              <div key={s.v}>
                <p className="font-display text-3xl text-primary">{s.k}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-elevated">
            <img
              src={heroImg}
              alt="Warm sunlight streaming through stained glass into a peaceful church sanctuary"
              width={1600}
              height={1024}
              className="h-[460px] w-full object-cover sm:h-[560px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-2xl text-primary-foreground drop-shadow">
                "The Lord is near to all who call on Him."
              </p>
              <p className="mt-1 text-sm text-primary-foreground/80">— Psalm 145:18</p>
            </div>
          </div>
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-4 bottom-10 hidden rounded-2xl px-4 py-3 shadow-bubble sm:block"
          >
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Sunday service</p>
            <p className="font-display text-lg text-foreground">9:00 AM · All parishes</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
