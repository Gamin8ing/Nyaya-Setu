import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* HERO */}
      <section className="gradient-hero pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xs px-4 py-1 text-xs text-white/80">
              <span>Legal AI · India</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white">
              NyayaSetu
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              From raw case facts to relevant precedents & bilingual legal articulation. Reduce research time and preserve legal meaning across languages.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="btn-accent">Start a Case</Link>
              <a href="#about" className="btn-primary">How it works</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / WORKFLOW */}
      <section id="about" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-2xl font-semibold text-white">Why NyayaSetu?</h2>
            <p className="mt-4 text-muted text-sm leading-relaxed">
              Legal workflows are flooded with judgments, PDFs, handwritten notes, and bilingual courtroom exchanges. NyayaSetu applies retrieval + structured extraction to surface what matters fast.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li>• Extract parties, facts, issues, statutes</li>
              <li>• Find precedents with overlapping reasoning</li>
              <li>• Map English speech to precise Hindi legal phrasing</li>
              <li>• Generate balanced argument scaffolds (not advice)</li>
            </ul>
          </div>
          <div className="card">
            <h2 className="text-2xl font-semibold text-white">Workflow</h2>
            <ol className="mt-5 space-y-3 text-sm text-white/90">
              <li><span className="font-medium">1. Intake:</span> Provide facts, issue, rationale, judgment, documents.</li>
              <li><span className="font-medium">2. Structuring:</span> Converted to a JSON case blueprint.</li>
              <li><span className="font-medium">3. N8N Pipeline:</span> Retrieval + extraction + alignment tasks.</li>
              <li><span className="font-medium">4. Result:</span> Key facts, issues, statute links, precedent matches.</li>
              <li><span className="font-medium">5. Ongoing Chat:</span> Continue querying with the contextualized case memory.</li>
            </ol>
            <p className="mt-4 text-xs text-white/50">Disclaimer: Assistive only. Validate with authoritative sources.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Start a new case</h3>
            <p className="text-muted mt-2 text-sm max-w-md">Enter the initial 5 inputs. We create a structured JSON blueprint and launch the retrieval workflow.</p>
          </div>
          <Link href="/dashboard" className="btn-accent">Open Dashboard</Link>
        </div>
      </section>
    </main>
  );
}
