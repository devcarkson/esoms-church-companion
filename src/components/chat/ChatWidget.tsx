import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (open) {
      setHint(false);
      return;
    }
    const dismissed = sessionStorage.getItem("esoms-hint-dismissed");
    if (dismissed) return;
    const t = setTimeout(() => setHint(true), 2500);
    return () => clearTimeout(t);
  }, [open]);

  const dismissHint = () => {
    setHint(false);
    sessionStorage.setItem("esoms-hint-dismissed", "1");
  };

  return (
    <>
      {/* Floating button + hint */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {hint && !open && (
            <motion.button
              key="hint"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              onClick={() => {
                setOpen(true);
                dismissHint();
              }}
              className="glass max-w-[260px] rounded-2xl rounded-br-sm px-4 py-3 text-left text-sm leading-snug text-foreground shadow-elevated"
            >
              <span className="font-display text-base font-semibold text-primary">
                Need prayer or guidance?
              </span>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Chat with our assistant — we're here for you. 🙏
              </p>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow ${
            open && isMobile ? "hidden" : ""
          }`}
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-primary opacity-50 blur-xl" />
          <AnimatePresence mode="wait" initial={false}>
           {open ? (
             <motion.span
               key="x"
               initial={{ rotate: -90, opacity: 0 }}
               animate={{ rotate: 0, opacity: 1 }}
               exit={{ rotate: 90, opacity: 0 }}
               transition={{ duration: 0.2 }}
             >
               <X className="h-6 w-6" />
             </motion.span>
           ) : (
             <motion.span
               key="msg"
               initial={{ rotate: 90, opacity: 0 }}
               animate={{ rotate: 0, opacity: 1 }}
               exit={{ rotate: -90, opacity: 0 }}
               transition={{ duration: 0.2 }}
             >
               <img src="/chruch-logo.png" alt="ESOMS Church Logo" className="h-6 w-6" />
             </motion.span>
           )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop on mobile only */}
            {isMobile && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
              />
            )}
            <motion.div
              key="panel"
              initial={isMobile ? { y: "100%" } : { x: 40, opacity: 0 }}
              animate={isMobile ? { y: 0 } : { x: 0, opacity: 1 }}
              exit={isMobile ? { y: "100%" } : { x: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              className={
                isMobile
                  ? "fixed inset-x-0 bottom-0 z-40 h-[88vh] overflow-hidden rounded-t-3xl border border-border bg-card shadow-elevated"
                  : "fixed bottom-24 right-6 z-40 flex h-[640px] max-h-[calc(100vh-7rem)] w-[420px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-3xl border border-border bg-card shadow-elevated"
              }
              role="dialog"
              aria-label="ESOMS Church Assistant"
            >
              <ChatPanel onClose={() => setOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
