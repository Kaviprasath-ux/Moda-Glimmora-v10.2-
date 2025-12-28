"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useConversation } from "@/hooks/useConversation";
import { LoadingSpinner } from "@/components/shared/LoadingIntelligence";

export function FloatingAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage } = useConversation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-moda-lg transition-colors",
          isOpen
            ? "bg-noir text-ivory-cream"
            : "bg-gold-muted text-noir hover:bg-gold-deep"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Sparkles className="h-6 w-6" />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-surface-elevated rounded-xl shadow-moda-xl border border-sand/50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-ivory-warm border-b border-sand/50">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold-muted" />
                <span className="font-display font-medium text-noir">
                  Fashion Agent
                </span>
              </div>
              <p className="text-xs text-stone mt-0.5">
                Ask me anything about style
              </p>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Sparkles className="h-8 w-8 text-gold-soft mx-auto mb-3" />
                  <p className="text-sm text-stone">
                    How can I help you today?
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                        message.role === "user"
                          ? "bg-noir text-ivory-cream"
                          : "bg-sand-light text-noir"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-sand-light rounded-lg px-3 py-2">
                    <LoadingSpinner className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-sand/50 bg-surface-base"
            >
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about style, occasions..."
                  className="flex-1 h-10"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-10 w-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
