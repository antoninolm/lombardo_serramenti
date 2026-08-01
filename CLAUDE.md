# Lombardo Serramenti — Sito vetrina

Sito vetrina per "Lombardo Serramenti", officina artigiana di fabbro.
Motto: "il ferro è il nostro mestiere".

## Stack (LOCKED — vietato aggiungere dipendenze senza decisione in SPEC.md)
- React 19 + Vite (JavaScript, no TypeScript)
- React Router DOM
- Tailwind CSS 4 (plugin @tailwindcss/vite)
- ESLint
- Hosting: Vercel + serverless function per il form preventivo
- Email: Resend (free tier)

## Workflow
- Un task = un commit. Formato: `fase-N: <verbo> <cosa>`
- Le decisioni vivono in SPEC.md, mai solo in chat
- Verifica locale (`npm run build`) prima di ogni push
- Segreti solo in `.env`, mai nel codice
- Segui la skill `.claude/skills/phase-gate/SKILL.md` per apertura/chiusura fasi
