"use client";
import { useState } from "react";
import { useLocalChats } from "../hooks/useLocalChats.js";
import clsx from "clsx";

export function Sidebar({ onNewCase, activeId, onSelect }) {
  const { chats, deleteSession } = useLocalChats();
  const [active, setActive] = useState(activeId ?? null);

  // New chat creation removed: cases themselves become chats after intake

  return (
    <aside className="flex h-full w-72 flex-col border-r border-white/10 bg-black/40 backdrop-blur-md">
      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-white">NyayaSetu</h2>
  <button className="btn-accent w-full" onClick={onNewCase}>New Case</button>
      </div>
      <div className="px-4 pb-2 text-xs font-medium text-white/60">Past Chats</div>
      <ul className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.map((c) => (
          <li key={c.id} className={clsx("group rounded-lg", (active ?? activeId) === c.id && "bg-white/5")}> 
            <button
              onClick={() => { setActive(c.id); onSelect && onSelect(c.id); }}
              className="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-white/5 text-white transition"
            >
              <span className="block truncate font-medium">{c.title}</span>
              <span className="block text-xs text-white/50">{new Date(c.updatedAt).toLocaleString()}</span>
            </button>
            <button
              onClick={() => deleteSession(c.id)}
              aria-label="Delete chat"
              className="opacity-0 group-hover:opacity-100 absolute ml-56 mt-2 text-xs text-red-400"
            >✕</button>
          </li>
        ))}
        {chats.length === 0 && (
          <li className="px-3 py-2 text-xs text-white/50">No chats yet.</li>
        )}
      </ul>
      <div className="p-4 text-xs text-white/50">© {new Date().getFullYear()} NyayaSetu</div>
    </aside>
  );
}
