"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar.jsx";
import { ChatPanel } from "./ChatPanel.jsx";
import { NewCaseModal } from "./NewCaseModal.jsx";
import { Button } from "./ui/button.jsx";
import { Card } from "./ui/card.jsx";
import { useLocalChats } from "../hooks/useLocalChats.js";

export function DashboardShell() {
  const { chats, addSession, updateSession } = useLocalChats();
  const [activeId, setActiveId] = useState(chats[0]?.id || null);
  const [showNewCase, setShowNewCase] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const active = chats.find((c) => c.id === activeId) || null;

  function beginNewCase() {
    // Create a chat session representing this case intake
    const s = addSession("New Case Intake");
    setActiveId(s.id);
    setShowNewCase(true);
  }

  function handleResult(result) {
    if (!activeId) return;
    const jsonBlueprint = {
      facts: result.keyFacts || [],
      issues: result.issues || [],
      statutes: result.statutes || [],
    };
    const updated = {
      ...(active || {}),
      id: activeId,
      title: active?.title || "New Case",
      messages: [
        ...(active?.messages || []),
        { role: "system", content: `Case blueprint: ${JSON.stringify(jsonBlueprint)}` },
        { role: "assistant", content: "Initial analysis ready. Ask questions to proceed." },
      ],
      lastResult: result,
    };
    updateSession(updated);
  }

  function appendMessage(msg) {
    if (!activeId) return;
    const updated = {
      ...(active || {}),
      id: activeId,
      title: active?.title || "New Case",
      messages: [ ...(active?.messages || []), { ...msg, createdAt: Date.now() } ],
    };
    updateSession(updated);
  }

  const emptyState = !active ? (
    <div className="flex h-full items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-semibold text-white">Start a Case</h2>
        <p className="text-sm text-white/60 max-w-sm mx-auto">Provide the initial five inputs (facts, issue, rationale, judgment, documents). We’ll structure it and open a contextual chat for deeper questions.</p>
        <Button variant="accent" onClick={beginNewCase}>New Case</Button>
      </div>
    </div>
  ) : null;

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar onNewCase={beginNewCase} activeId={activeId} onSelect={setActiveId} />
      </div>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50 w-72 h-full bg-black border-r border-white/10">
            <Sidebar onNewCase={() => { setSidebarOpen(false); beginNewCase(); }} activeId={activeId} onSelect={(id)=>{ setActiveId(id); setSidebarOpen(false); }} />
          </div>
        </div>
      )}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-black px-3 md:px-6 py-3">
          <div className="flex items-center gap-3">
            <button className="md:hidden btn-muted px-3 py-2" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">☰</button>
            <h1 className="text-lg font-semibold text-white">{active ? active.title : "NyayaSetu"}</h1>
            {active?.lastResult && (
              <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">context loaded</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="accent" onClick={beginNewCase}>New Case</Button>
          </div>
        </header>
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Chat column */}
          <div className="flex-1 flex flex-col md:border-r border-white/10 min-h-0">
            {active ? (
              <ChatPanel session={active} onAppend={appendMessage} />
            ) : emptyState}
          </div>
          {/* Context column */}
            <div className="hidden lg:flex w-full md:w-[420px] flex-col bg-black/60">
              <div className="border-b border-white/10 px-4 py-3 text-sm font-medium text-white">Case Context</div>
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {active?.lastResult ? (
                  <>
                    {active.lastResult.keyFacts?.length ? (
                      <div>
                        <div className="text-xs uppercase tracking-wide text-white/50 mb-1">Key Facts</div>
                        <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
                          {active.lastResult.keyFacts.map((f,i)=>(<li key={i}>{f}</li>))}
                        </ul>
                      </div>
                    ) : null}
                    {active.lastResult.issues?.length ? (
                      <div>
                        <div className="text-xs uppercase tracking-wide text-white/50 mb-1">Issues</div>
                        <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
                          {active.lastResult.issues.map((f,i)=>(<li key={i}>{f}</li>))}
                        </ul>
                      </div>
                    ) : null}
                    {active.lastResult.statutes?.length ? (
                      <div>
                        <div className="text-xs uppercase tracking-wide text-white/50 mb-1">Statutes</div>
                        <div className="flex flex-wrap gap-1">
                          {active.lastResult.statutes.map((s,i)=>(<span key={i} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{s}</span>))}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <div className="text-xs text-white/50">Context will appear after intake.</div>
                )}
              </div>
            </div>
        </div>
      </main>
      <NewCaseModal
        open={showNewCase}
        onClose={() => setShowNewCase(false)}
        onResult={handleResult}
      />
    </div>
  );
}
