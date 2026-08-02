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
- 2026-08-01: Remote GitHub passato da SSH a HTTPS (`gh auth setup-git`) per sbloccare i push automatici di Claude Code; niente chiave SSH configurata sulla macchina. Non annulla il backlog "Setup SSH GitHub", solo non più bloccante nel frattempo
- 2026-08-01: Aggiunti Google Fonts (Oswald+Barlow) e token palette scura/metallica (`@theme` in `index.css`) come anticipazione minima di stile; rifinitura completa (colori esatti, font, eventuale self-hosting) in Fase 6
- 2026-08-01: Aggiunto `vercel.json` con rewrite SPA (tutte le route → `/index.html`), necessario perché il routing è lato client (React Router): senza rewrite, ricaricare la pagina (F5) su una route diversa da `/` restituisce 404 su Vercel
- 2026-08-01: Test: Vitest + jsdom + React Testing Library come devDependencies (nessuna dipendenza runtime aggiunta); config `test` dentro `vite.config.js` esistente, niente file di config separato
- 2026-08-02: Cambio requisito (cliente): la Galleria abbandona il filtro per categoria e diventa catalogo unico di tutte le foto con effetto scroll-reveal (fade + zoom-in), reference: pagina galleria di cardillo.it. Le categorie restano in uso solo in Prodotti e nel form Preventivo.
- 2026-08-02: Hero Home: rotazione citazioni sul ferro ogni 6s, opzione B approvata — ruota SOLO la riga secondaria sotto il claim; claim e CTA fissi. Implementazione in task futuro dedicato.
- 2026-08-02: `sharp` aggiunto come devDependency (unica nuova dipendenza Fase 3a), usato solo dallo script una tantum `scripts/optimize-galleria-images.mjs` per generare da `materiali/foto/` (14 JPEG originali, ~3.0 MB totali, rinominato il refuso `galleri3.jpeg` → `galleria3.jpeg`) le versioni WebP ottimizzate in `src/assets/galleria/`: `full/` (max 1600px, qualità 82, non usata in questa fase, predisposta per eventuale lightbox futuro) e `thumb/` (max 800px, qualità 78, ~1.0 MB totali per 14 foto — quella effettivamente caricata da Galleria e Home). Le foto originali restano invariate e sono state aggiunte a git (come già `materiali/brand/`).
- 2026-08-02: Le versioni `full/` delle foto restano fuori da git (rigenerabili via script); si committano solo le `thumb/` effettivamente usate
- 2026-08-02: Galleria: griglia full-bleed senza gap, 2 righe da 7 su desktop (2 col mobile, 4 tablet), celle quadrate, reveal invariato — richiesta cliente, stile reference cardillo.it

## Fuori scope
Express, MongoDB, autenticazione, CMS, e-commerce

## Backlog
- Sostituire claim hero con motto ufficiale "il ferro è il nostro mestiere" o validare claim alternativo
- Setup SSH GitHub
- Invio reale form Preventivo via Resend (Vercel serverless function) — Fase 3, vedi CLAUDE.md
- Integrare mappa reale (embed Google Maps) in Contatti — Fase 3, ora solo segnaposto
- Valutare `npm audit fix` per l'advisory su react-router (RSC Mode CSRF Bypass) — non applicabile a questo setup SPA senza data router, ma da rivalutare se si passa a `createBrowserRouter`

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

### Checklist di chiusura (compilata da Claude Code, 2026-08-01)
- `npm run build` senza errori: **PASS** (build in 232ms, nessun errore)
- `npm run lint` senza errori: **PASS** (nessun errore/warning)
- `npm test` verde: **PASS** (7/7 test, incluse le 6 route + titolo + header/footer)
- Deploy Vercel "Ready" dopo il push finale: **PASS** (verificato via GitHub commit status API su ogni commit della fase, tutti "success"; `curl` su https://lombardo-serramenti.vercel.app/ e /galleria → HTTP 200)
- 6 pagine navigabili, nessuna pagina bianca, palette scura/metallica con accento coerente: **PASS** (verificato con browser headless: screenshot Home desktop, tutte le route caricate senza errori console)
- Galleria: filtro per categoria funzionante: **PASS** (verificato: 10 card totali → 2 dopo filtro "Portoni")
- Preventivo: validazione su invio vuoto + invio simulato con successo: **PASS** (verificato: 5 errori su invio vuoto, conferma "Richiesta inviata" su invio compilato)
- Mobile: hamburger apribile, niente scroll orizzontale: **PASS** (verificato a 390px: menu si apre, `document.body.scrollWidth` = `window.innerWidth`)
- Reload (F5) su /galleria senza 404: **PASS** (grazie a `vercel.json`; verificato via `curl` diretto sulla route)
- Click letterale su ogni voce del menu dal browser, da PC e da telefono reali: **NON VERIFICATO** — verificato in modo equivalente (navigazione diretta alle route + test automatici), ma il click umano sul menu e la prova su un telefono reale restano da fare in UAT

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate.

## Fase 3a — Contratto

### Cosa aspettarsi a fine fase
- Galleria (/galleria) ristrutturata a catalogo unico: niente più filtro per categoria, tutte le foto reali dell'officina in un'unica griglia responsive (1 colonna mobile, 2 tablet, 3 desktop)
- Ogni foto compare con un effetto reveal (dissolvenza + leggero zoom) quando entra nel viewport durante lo scroll, disattivato automaticamente se l'utente ha impostato "riduci movimento" nel sistema operativo
- Home (/) con 3 foto reali al posto dei riquadri placeholder nella sezione "Dalle nostre realizzazioni"
- Peso totale delle immagini caricate dalla pagina Galleria sotto ~2.5 MB
- Nessuna funzione di categoria/filtro rimossa da Prodotti o dal form Preventivo (restano invariati)

### Come testa Antonino (UAT, da browser)
1. Apri /galleria da PC: scrolla lentamente e osserva le foto comparire una dopo l'altra con un effetto di dissolvenza/ingrandimento leggero, non tutte insieme
2. Verifica che non ci sia più nessun filtro/pulsante per categoria in Galleria, solo il testo introduttivo e la griglia di foto
3. Ripeti lo scroll da telefono: verifica che sia fluido (nessun scatto) e che le foto si carichino in tempi ragionevoli
4. Apri la Home e controlla che le 3 foto nella sezione "Dalle nostre realizzazioni" siano foto vere dell'officina, non più riquadri grigi a righe
5. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build` senza errori
- `npm run lint` senza errori
- `npm test` verde (routing invariato, hook useScrollReveal, griglia Galleria con 14 immagini)
- Peso totale delle immagini `thumb` usate da Galleria sotto ~2.5 MB (`du -sh`)
- Verifica browser headless: effetto reveal presente allo scroll, 14 immagini renderizzate, nessun errore console
- Deploy Vercel "Ready" dopo il push finale

### Checklist di chiusura (compilata da Claude Code, 2026-08-02)
- `npm run build` senza errori: **PASS** (build in 459ms, nessun errore)
- `npm run lint` senza errori: **PASS** (nessun errore/warning)
- `npm test` verde: **PASS** (11/11 test: 7 routing + 3 hook useScrollReveal + 1 griglia Galleria con 14 immagini)
- Peso totale immagini `thumb` usate da Galleria sotto ~2.5 MB: **PASS** (14 foto, 985 KB totali su https://lombardo-serramenti.vercel.app/galleria, verificato via browser headless con conteggio byte reale delle risposte di rete)
- Verifica browser headless: effetto reveal presente allo scroll, 14 immagini renderizzate, nessun errore console: **PASS** (desktop 1440×900: 0/14 foto visibili prima dello scroll sotto la piega, 14/14 visibili dopo scroll completo fino in fondo; nessun errore console su Galleria, Home, mobile 390×844)
- Home: 3 foto reali al posto dei Placeholder in "Dalle nostre realizzazioni": **PASS** (verificato: 3 `<img>` reali renderizzate nella sezione)
- Mobile: niente scroll orizzontale su /galleria (390px): **PASS** (`document.body.scrollWidth` = `window.innerWidth` = 390)
- Deploy Vercel "Ready" dopo il push finale: **NON VERIFICATO** — verrà confermato dopo il push del commit di chiusura (i 5 push precedenti della fase sono stati tutti confermati "success" via GitHub commit status API)
- Scroll fluido su mobile reale e tempi di caricamento percepiti: **NON VERIFICATO** — verificato in modo equivalente con browser headless (nessun errore, nessuno scroll orizzontale, payload contenuto), ma la prova su un telefono reale resta da fare in UAT

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright, installato temporaneamente fuori dal progetto, non aggiunto a package.json) come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate.
