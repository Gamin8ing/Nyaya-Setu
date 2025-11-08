export const runtime = "nodejs";

export async function POST(req) {
  const contentType = req.headers.get("content-type") || "";
  const webhook = process.env.N8N_WEBHOOK_URL;

  try {
    let payload;
    let headers;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const f = new FormData();
      for (const [key, value] of form.entries()) {
        f.append(key, value);
      }
      payload = f;
      headers = undefined; // let fetch set boundary
    } else if (contentType.includes("application/json")) {
      const data = await req.json();
      payload = JSON.stringify(data);
      headers = { "content-type": "application/json" };
    } else {
      const form = await req.formData();
      const f = new FormData();
      for (const [key, value] of form.entries()) {
        f.append(key, value);
      }
      payload = f;
    }

    if (webhook) {
      const res = await fetch(webhook, { method: "POST", body: payload, headers });
      const json = await res.json();
      return Response.json(json);
    }

    const mock = {
      keyFacts: [
        "Complainant alleges misappropriation of funds by company director.",
        "Transactions between 2020–2022 flagged by auditor.",
      ],
      issues: [
        "Whether the director held a fiduciary duty and breached it.",
        "Applicability of Sections 405/406 IPC (Criminal Breach of Trust).",
      ],
      statutes: ["IPC 405", "IPC 406", "Companies Act, 2013 – s.166"],
      precedentMatches: [
        {
          caseName: "State of X v. Y",
          citation: "(2019) 3 SCC 123",
          court: "SC",
          year: 2019,
          whyRelevant: "Clarifies ingredients of criminal breach of trust in corporate context.",
          overlaps: ["Entrustment of property", "Dishonest misappropriation"],
        },
      ],
      languageAlignment: [
        {
          english: "He was holding funds as a director and used them for personal expenses.",
          hindiLegal: "निर्देशक के रूप में निधि का न्यास था, जिसका निजी उपयोग किया गया।",
          statuteRefs: ["IPC 405", "IPC 406"],
        },
      ],
      assistantNotes: [
        "Defense: absence of entrustment; transactions were board‑approved.",
        "Prosecution: pattern of diversion; lack of board ratification; mens rea inferred from concealment.",
      ],
      disclaimer: "This is an assistive output; verify with statutory text and binding precedents.",
    };

    return Response.json(mock);
  } catch (e) {
    console.error(e);
    return new Response("Failed to process case", { status: 500 });
  }
}
