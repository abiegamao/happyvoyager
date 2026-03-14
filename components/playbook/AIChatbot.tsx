"use client";

import { useChat } from "@ai-sdk/react";
import { type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

const ABIE_AVATAR =
  "https://res.cloudinary.com/dg1i3ew9w/image/upload/v1773167430/Sticker_packs_m9fnbz.png";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();
  const isLoading = status !== "ready";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mb-4 w-80 md:w-96 h-[500px] max-h-[80vh] backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              style={{ backgroundColor: "var(--pb-surface-elevated)", border: "1px solid var(--pb-border)" }}
            >
              <div className="flex items-center justify-between p-4" style={{ backgroundColor: "var(--pb-header)", borderBottom: "1px solid var(--pb-border)" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0" style={{ border: "1px solid var(--pb-border)" }}>
                    <Image src={ABIE_AVATAR} alt="Abie" width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px]" style={{ color: "var(--pb-text)" }}>
                      Abie
                    </h3>
                    <p className="text-[12px] leading-tight" style={{ color: "var(--pb-text-muted)" }}>
                      Your Spain DNV guide
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: "var(--pb-text-muted)" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
                {messages.map((m: UIMessage) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 ${
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0" style={{ border: "1px solid var(--pb-border)" }}>
                      {m.role === "user" ? (
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "var(--pb-input-bg)" }}>
                          <User className="w-4 h-4" style={{ color: "var(--pb-text-secondary)" }} />
                        </div>
                      ) : (
                        <Image src={ABIE_AVATAR} alt="Abie" width={32} height={32} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                        m.role === "user"
                          ? "bg-[#e3a99c] text-white rounded-tr-sm"
                          : "rounded-tl-sm"
                      }`}
                      style={m.role !== "user" ? { backgroundColor: "var(--pb-surface)", color: "var(--pb-text)", border: "1px solid var(--pb-border)" } : undefined}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              className="text-[#e3a99c] hover:underline"
                              target="_blank"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-2 last:mb-0" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc pl-4 mb-2" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal pl-4 mb-2" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="mb-1" {...props} />
                          ),
                        }}
                      >
                        {m.parts
                          ? m.parts
                              .filter((p: any) => p.type === "text")
                              .map((p: any) => p.text)
                              .join("")
                          : (m as any).content || ""}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                {(status === "submitted" || status === "streaming") && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0" style={{ border: "1px solid var(--pb-border)" }}>
                      <Image src={ABIE_AVATAR} alt="Abie" width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm px-4 py-3 text-[14px]" style={{ backgroundColor: "var(--pb-surface)", color: "var(--pb-text)", border: "1px solid var(--pb-border)" }}>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s]" style={{ backgroundColor: "var(--pb-text-muted)" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s]" style={{ backgroundColor: "var(--pb-text-muted)" }}></span>
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--pb-text-muted)" }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4" style={{ backgroundColor: "var(--pb-header)", borderTop: "1px solid var(--pb-border)" }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                      sendMessage({ text: input });
                      setInput("");
                    }
                  }}
                  className="relative flex items-center"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about the Spain DNV..."
                    disabled={isLoading}
                    className="w-full pl-4 pr-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e3a99c]/50 focus:border-transparent text-[14px] transition-all disabled:opacity-50"
                    style={{ backgroundColor: "var(--pb-input-bg)", border: "1px solid var(--pb-border)", color: "var(--pb-text)" }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 w-8 h-8 bg-[#e3a99c] text-white rounded-full flex items-center justify-center hover:bg-[#d69586] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full overflow-hidden shadow-lg hover:scale-105 active:scale-95 transition-transform border-2 ring-2 ring-[#e3a99c]/20"
          style={{ borderColor: "var(--pb-border)", boxShadow: "0 4px 20px var(--pb-shadow-accent)" }}
        >
          {isOpen ? (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "var(--pb-surface-elevated)" }}>
              <X className="w-6 h-6" style={{ color: "var(--pb-text)" }} />
            </div>
          ) : (
            <Image src={ABIE_AVATAR} alt="Chat with Abie" width={56} height={56} className="w-full h-full object-cover" />
          )}
        </button>
      </div>
    </>
  );
}
