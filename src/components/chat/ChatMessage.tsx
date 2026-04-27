import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Props {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export const ChatMessage = ({ role, content, streaming }: Props) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
       {!isUser && (
         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-bubble">
           <img src="/chruch-logo.png" alt="ESOMS Church Logo" className="h-4 w-4" />
         </div>
       )}

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-bubble ${
          isUser
            ? "rounded-br-sm bg-gradient-primary text-primary-foreground"
            : "rounded-bl-sm bg-card text-card-foreground border border-border"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div
            className={`prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-headings:font-display prose-strong:text-primary ${
              streaming && !content ? "" : streaming ? "typing-cursor" : ""
            }`}
          >
            {content ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <span className="inline-flex gap-1 py-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary/60 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary/60 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary/60 [animation-delay:300ms]" />
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
