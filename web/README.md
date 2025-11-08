# NyayaSetu Web (Hackathon Build)

NyayaSetu is a Legal-AI assistant helping Indian legal teams bridge raw case material to relevant precedents and bilingual (Hindi/English) legal articulation.

## Features
- Landing page with mission & workflow explanation.
- Dashboard with sidebar (past chats via local storage) & New Case modal.
- Case submission form: facts, issue, rationale, current judgment, documents, comments.
- API route integrates with N8N workflow via `N8N_WEBHOOK_URL` (multipart compatible) or returns mock data when unset.
- Displays extracted facts, issues, statutes, precedent matches, language-law alignment, assistant notes.
- Responsive design (Tailwind CSS) + accessible modal.
- TypeScript types for structured data.

## Tech Stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- JavaScript (no TypeScript)

## Getting Started
```bash
# Install deps
npm install
# Run dev
npm run dev
```
Visit http://localhost:3000.

## Environment
Create `.env.local`:
```
N8N_WEBHOOK_URL=https://your-n8n-endpoint/webhook/nyayasetu
```
If unset, a mock response is used for demo.

## Folder Structure
```
app/                # App Router pages
  page.tsx          # Landing page
  dashboard/        # Main interface
  api/new-case/     # Submission endpoint
components/         # UI components (Sidebar, NewCaseModal, CaseOutputPanel)
hooks/              # Custom React hooks (local chat persistence)
types/              # Shared TypeScript types
```

## Design System
Colors: Indigo (primary), Emerald (accent), Amber (highlight), Neutral greys. Font: Inter.

## Disclaimer
NyayaSetu does not provide legal advice. Always validate AI outputs against authoritative sources.

## Next Steps (Potential Enhancements)
- Real similarity search integration (vector DB + embeddings).
- Auth & role-based access.
- Persistent backend (Supabase / Postgres) for chats & cases.
- Hindi → English alignment expansion with stat provisions knowledge base.
- Rate limiting & audit logging.

---
Made for rapid hackathon prototyping.
