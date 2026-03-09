"use client";

import { useChat } from "@ai-sdk/react";
import { type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
              className="mb-4 w-80 md:w-96 h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-[#e8e8e5] flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 bg-[#f7f7f5] border-b border-[#e8e8e5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#181817] flex items-center justify-center text-white">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[15px] text-[#181817]">
                      Playbook AI
                    </h3>
                    <p className="text-[12px] text-[#787774] leading-tight">
                      Answers based on guides
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#787774] hover:bg-[#efefed] rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
                {messages.map((m: UIMessage) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 ${
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        m.role === "user"
                          ? "bg-[#efefed] text-[#181817]"
                          : "bg-[#181817] text-white"
                      }`}
                    >
                      {m.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                        m.role === "user"
                          ? "bg-[#181817] text-white rounded-tr-sm"
                          : "bg-[#f7f7f5] text-[#181817] rounded-tl-sm border border-[#e8e8e5]"
                      }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              className="text-blue-500 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
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
                    <div className="w-8 h-8 rounded-full bg-[#181817] flex items-center justify-center shrink-0 text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-[#f7f7f5] text-[#181817] rounded-2xl rounded-tl-sm border border-[#e8e8e5] px-4 py-3 text-[14px]">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-[#787774] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-[#787774] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-[#787774] rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-white border-t border-[#e8e8e5]">
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
                    className="w-full pl-4 pr-12 py-3 bg-[#f7f7f5] border border-[#e8e8e5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#181817] focus:border-transparent text-[14px] transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 w-8 h-8 bg-[#181817] text-white rounded-full flex items-center justify-center hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="w-14 h-14 bg-[#181817] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#333] transition-transform hover:scale-105 active:scale-95"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
}
