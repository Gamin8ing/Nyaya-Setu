export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;
    const webhook = process.env.N8N_CHAT_WEBHOOK_URL;

    if (webhook) {
      const resp = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await resp.json();
      return Response.json(json);
    }

    // Mock: simple echo with slight guidance behavior
    return Response.json({ reply: `Assistant (mock): I received: "${message}". Provide more detail or ask for precedents.` });
  } catch (e) {
    console.error(e);
    return new Response("Chat error", { status: 500 });
  }
}
