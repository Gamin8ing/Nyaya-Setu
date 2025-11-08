"use client";
import { useEffect, useMemo, useState } from "react";
// Shapes via JSDoc in ../types/index.js

export function useLocalChats() {
  /** @type {import('../types/index.js').ChatSession[]} */
  const [chats, setChats] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("nyaya-setu:chats");
      if (raw) setChats(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("nyaya-setu:chats", JSON.stringify(chats));
    } catch {}
  }, [chats]);

  const actions = useMemo(() => ({
    /** @param {string} title */
    addSession(title) {
      const s = {
        id: crypto.randomUUID(),
        title,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: [],
      };
      setChats((prev) => [s, ...prev]);
      return s;
    },
    /** @param {string} id */
    deleteSession(id) {
      setChats((prev) => prev.filter((c) => c.id !== id));
    },
    /** @param {import('../types/index.js').ChatSession} updated */
    updateSession(updated) {
      setChats((prev) => prev.map((c) => (c.id === updated.id ? { ...updated, updatedAt: Date.now() } : c)));
    },
  }), []);

  return { chats, setChats, ...actions };
}
