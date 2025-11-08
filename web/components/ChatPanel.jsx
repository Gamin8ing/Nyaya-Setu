"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button.jsx";

function MessageBubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
  <div className={`${isUser ? "bg-accent text-white" : "bg-white/5 text-white"} rounded-lg px-4 py-2 max-w-[80%] backdrop-blur-md border ${isUser ? "border-accent/50 shadow-glow" : "border-white/10 shadow-glass"}`}>
        {children}
      </div>
    </div>
  );
}

export function ChatPanel({ session, onAppend }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [session]);

  async function send() {
    const content = input.trim();
    if (!content) return;
    onAppend({ role: "user", content });
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: session?.id, message: content }),
      });
      const data = await res.json();
      onAppend({ role: "assistant", content: data.reply || "(No response)" });
    } catch (e) {
      console.error(e);
      onAppend({ role: "assistant", content: "Error reaching assistant." });
    }
  }

  function onKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 p-4">
        {(session?.messages || []).map((m, i) => (
          <MessageBubble key={i} role={m.role}>{m.content}</MessageBubble>
        ))}
      </div>
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            className="input min-h-[44px] flex-1"
            placeholder="Ask a question… (Ctrl/Cmd+Enter to send)"
          />
          <Button variant="accent" onClick={send}>Send</Button>
        </div>
      </div>
    </div>
  );
}
