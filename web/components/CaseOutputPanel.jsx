export function CaseOutputPanel({ result }) {
  if (!result) {
    return (
      <div className="card p-6 text-center text-brand-neutral-700/70">
        Submit a new case to see extracted facts, similar precedents, and bilingual mappings here.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {result.keyFacts && result.keyFacts.length > 0 && (
        <section className="card p-6 bg-black/50">
          <h3 className="text-lg font-semibold">Key Facts</h3>
          <ul className="mt-2 list-disc pl-6 text-sm text-brand-neutral-800">
            {result.keyFacts.map((f, i) => (<li key={i}>{f}</li>))}
          </ul>
        </section>
      )}

      {result.issues && result.issues.length > 0 && (
        <section className="card p-6 bg-black/50">
          <h3 className="text-lg font-semibold">Issues</h3>
          <ul className="mt-2 list-disc pl-6 text-sm text-brand-neutral-800">
            {result.issues.map((f, i) => (<li key={i}>{f}</li>))}
          </ul>
        </section>
      )}

      {result.precedentMatches && result.precedentMatches.length > 0 && (
        <section className="card p-6 bg-black/50">
          <h3 className="text-lg font-semibold">Similar Precedents</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {result.precedentMatches.map((p, i) => (
              <div key={i} className="rounded-lg border border-brand-neutral-200 p-4">
                <div className="font-medium">{p.caseName}</div>
                <div className="text-xs text-brand-neutral-700/80">
                  {[p.citation, p.court, p.year].filter(Boolean).join(" · ")}
                </div>
                <p className="mt-2 text-sm">{p.whyRelevant}</p>
                {p.overlaps?.length ? (
                  <ul className="mt-2 list-disc pl-5 text-sm text-brand-neutral-800">
                    {p.overlaps.map((o, j) => (<li key={j}>{o}</li>))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {result.languageAlignment && result.languageAlignment.length > 0 && (
        <section className="card p-6 bg-black/50">
          <h3 className="text-lg font-semibold">Language & Law Alignment</h3>
          <div className="mt-3 space-y-3">
            {result.languageAlignment.map((l, i) => (
              <div key={i} className="rounded-lg border border-brand-neutral-200 p-4">
                <div className="text-sm"><span className="font-medium">English:</span> {l.english}</div>
                <div className="text-sm"><span className="font-medium">Hindi (Legal):</span> {l.hindiLegal}</div>
                {l.statuteRefs?.length ? (
                  <div className="text-xs text-brand-neutral-700/80 mt-1">Refs: {l.statuteRefs.join(", ")}</div>
                ) : null}
                {l.note ? (<div className="text-xs text-brand-neutral-700/80 mt-1">{l.note}</div>) : null}
              </div>
            ))}
          </div>
        </section>
      )}

      {result.assistantNotes && result.assistantNotes.length > 0 && (
        <section className="card p-6 bg-black/50">
          <h3 className="text-lg font-semibold">Assistant Notes</h3>
          <ul className="mt-2 list-disc pl-6 text-sm text-brand-neutral-800">
            {result.assistantNotes.map((n, i) => (<li key={i}>{n}</li>))}
          </ul>
        </section>
      )}

      <p className="text-xs text-brand-neutral-700/70">{result.disclaimer || "NyayaSetu is an assistive tool and does not provide legal advice."}</p>
    </div>
  );
}
