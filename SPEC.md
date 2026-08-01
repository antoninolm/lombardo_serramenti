# SPEC — Lombardo Serramenti

## Pagine (6)
Home, Chi Siamo, Prodotti, Galleria, Contatti, Richiedi Preventivo

## Decisioni
- 2026-08-01: Hosting su Vercel, dominio gratuito `lombardo-serramenti.vercel.app` (upgrade a dominio .it possibile in futuro, ~8€/anno)
- 2026-08-01: Linter: ESLint (ecosistema e familiarità > velocità di Oxlint)
- 2026-08-01: Email form preventivo: Resend free tier via Vercel serverless function
- 2026-08-01: Repo annidato dentro il repo-contenitore dei corsi; il progetto ha repo GitHub dedicato
- 2026-08-01: Fase 1 chiusa con contenuti placeholder; categorie prodotti: cancelli, ringhiere, portoni, inferriate, opere su misura; email form: placeholder
- 2026-08-01: I riferimenti di design si trovano in `materiali/brand/design/bozza1/export/*.html` e il logo in `materiali/brand/logo-lombardo.png` (percorsi corretti rispetto a `materiali/design/export/` e `materiali/design/assets/` inizialmente indicati, che non esistono)

## Fuori scope
Express, MongoDB, autenticazione, CMS, e-commerce

## Backlog
- Sostituire claim hero con motto ufficiale "il ferro è il nostro mestiere" o validare claim alternativo
- Setup SSH GitHub

## Fase 2 — Contratto

### Cosa aspettarsi a fine fase
- 6 pagine navigabili su https://lombardo-serramenti.vercel.app: Home (/), Chi Siamo (/chi-siamo), Prodotti (/prodotti), Galleria (/galleria), Contatti (/contatti), Richiedi Preventivo (/preventivo)
- Navbar con logo Lombardo Serramenti e menu (hamburger su mobile), footer con dati aziendali placeholder su tutte le pagine
- Home con 5 sezioni come da bozza design: hero con claim e CTA, punti di forza, anteprima categorie prodotti, anteprima realizzazioni, CTA preventivo finale
- Chi Siamo con storia placeholder e timeline
- Prodotti con griglia delle 5 categorie (cancelli, ringhiere, portoni, inferriate, opere su misura)
- Galleria con 8-10 immagini placeholder e filtro per categoria funzionante
- Contatti con dati placeholder e segnaposto mappa
- Preventivo con form completo, validazione e invio simulato (nessuna email reale: Fase 3)
- Tutto responsive, palette scura/metallica con accento caldo coerente con la bozza
- Testi placeholder plausibili in italiano (nessun lorem ipsum)

### Come testa Antonino (UAT, da browser)
1. Apri https://lombardo-serramenti.vercel.app da PC: verifica che la Home mostri hero, punti di forza, categorie, realizzazioni e CTA
2. Clicca ogni voce del menu: le 6 pagine si aprono, l'URL cambia, nessuna pagina bianca
3. Ricarica la pagina (F5) su /galleria: la pagina si ricarica correttamente (no errore 404)
4. In Galleria: clicca i filtri per categoria e verifica che le immagini mostrate cambino
5. In Preventivo: prova a inviare il form vuoto (devono comparire errori di validazione), poi compilalo e invia (deve comparire conferma simulata)
6. Ripeti i punti 1-2 dal telefono: menu hamburger apribile, testo leggibile senza zoom, niente scroll orizzontale
7. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build` senza errori
- `npm run lint` senza errori
- `npm test` verde (app renderizza, 6 route con titolo corretto, filtro galleria, validazione form)
- Deploy Vercel "Ready" dopo il push finale
