import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { streamChat, ChatMsg } from "@/lib/chat";
import { Sparkles, X } from "lucide-react";

const WELCOME =
  "Hello and welcome! 👋 I'm your ESOMS Church assistant. How can I help you today with prayer requests, service times, Bible questions, or any spiritual guidance you need?";

const SUGGESTIONS = [
  "Service times",
  "Submit a prayer request",
  "Upcoming events",
  "Find a parish",
  "How to join",
];

export const ChatPanel = ({ onClose }: { onClose?: () => void }) => {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [streaming, setStreaming] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text: string) => {
    if (streaming) return;
    const userMsg: ChatMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages([...next, { role: "assistant", content: "" }]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let acc = "";

    await streamChat({
      messages: next,
      signal: controller.signal,
      onDelta: (chunk) => {
        acc += chunk;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      },
      onError: (msg) => {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: `🙏 ${msg}`,
          };
          return copy;
        });
      },
      onDone: () => setStreaming(false),
    });
  };

  const showSuggestions = messages.length === 0;

  return (
    <div className="flex h-full flex-col bg-gradient-surface">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card/80 px-5 py-4 backdrop-blur">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-bubble">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-semibold leading-none text-foreground">
            ESOMS Assistant
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Here for you, 24/7
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollerRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6"
      >
        <ChatMessage role="assistant" content={WELCOME} />

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <ChatMessage
              key={i}
              role={m.role}
              content={m.content}
              streaming={streaming && i === messages.length - 1 && m.role === "assistant"}
            />
          ))}
        </AnimatePresence>

        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-bubble"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card/80 px-4 py-3 backdrop-blur sm:px-6">
        <ChatInput onSend={send} disabled={streaming} />
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Press <kbd className="rounded bg-muted px-1">Enter</kbd> to send · <kbd className="rounded bg-muted px-1">Shift</kbd>+<kbd className="rounded bg-muted px-1">Enter</kbd> for newline
        </p>
      </div>
    </div>
  );
};
