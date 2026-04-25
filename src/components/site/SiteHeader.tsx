import { motion } from "framer-motion";
import { Cross } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Ministries", href: "#ministries" },
  { label: "Events", href: "#events" },
  { label: "Parishes", href: "#parishes" },
];

export const SiteHeader = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-30"
    >
      <div className="container mt-3">
        <div className="glass flex items-center justify-between rounded-full px-4 py-2.5 shadow-bubble sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-bubble">
              <Cross className="h-4 w-4" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">
              ESOMS <span className="text-primary">Church</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#chat" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("esoms:openChat")); }} className="btn-primary !px-5 !py-2 !text-sm">
            Chat with us
          </a>
        </div>
      </div>
    </motion.header>
  );
};
