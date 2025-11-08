"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Textarea } from "./ui/textarea.jsx";

export function NewCaseModal({ open, onClose, onResult }) {
  const dialogRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  async function handleSubmit(form) {
    setSubmitting(true);
    try {
      // Convert visible fields into a JSON blueprint for the pipeline
      const jsonBlueprint = {
        facts: form.get("facts")?.toString() || "",
        issue: form.get("issue")?.toString() || "",
        rationale: form.get("rationale")?.toString() || "",
        currentJudgment: form.get("currentJudgment")?.toString() || "",
        comments: form.get("comments")?.toString() || "",
      };

      // If files present, send multipart with JSON string; else send JSON directly
      let res;
      const docs = /** @type {FileList} */ (form.get("documents"));
      if (docs && docs.length) {
        const fd = new FormData();
        for (const [k, v] of form.entries()) {
          if (k !== "documents") fd.append(k, v);
        }
        // append documents
        for (let i = 0; i < docs.length; i++) fd.append("documents", docs[i]);
        fd.set("blueprint", JSON.stringify(jsonBlueprint));
        res = await fetch("/api/new-case", { method: "POST", body: fd });
      } else {
        res = await fetch("/api/new-case", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ blueprint: jsonBlueprint }),
        });
      }

      const json = await res.json();
      onResult(json);
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to submit case. Check console.");
    } finally {
      setSubmitting(false);
    }
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    handleSubmit(fd);
  }

  return (
    <dialog ref={dialogRef} className="card-solid w-full max-w-2xl p-0">
      <form onSubmit={onFormSubmit} className="p-6 space-y-4" method="dialog">
        <header className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">New Case</h3>
          <button type="button" className="text-sm text-white/70" onClick={onClose}>
            Close
          </button>
        </header>
        <div className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-medium text-white">Facts</span>
            <Textarea name="facts" required rows={3} placeholder="Summarize the present facts" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium text-white">Issue</span>
            <Textarea name="issue" required rows={2} placeholder="What is in dispute?" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium text-white">Rationale</span>
            <Textarea name="rationale" rows={2} placeholder="What is the reasoning so far?" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium text-white">Current Judgment</span>
            <Textarea name="currentJudgment" rows={2} placeholder="Order/ruling till now" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium text-white">Documents</span>
            <Input name="documents" type="file" multiple />
            <span className="text-xs text-white/60">PDF, DOCX, images supported via N8N workflow</span>
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium text-white">Comments</span>
            <Textarea name="comments" rows={2} placeholder="Additional notes" />
          </label>
        </div>
        <footer className="flex items-center justify-end gap-2 pt-2">
          <Button variant="muted" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="accent" disabled={submitting} type="submit">
            {submitting ? "Submitting…" : "Submit to NyayaSetu"}
          </Button>
        </footer>
      </form>
    </dialog>
  );
}
