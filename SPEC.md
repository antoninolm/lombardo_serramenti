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
- 2026-08-02: Galleria: griglia 2 colonne × 7 righe, celle verticali 3/4, full-width senza gap, spazio intro-griglia ridotto — richiesta cliente
- 2026-08-02: Home: sezione realizzazioni da griglia 3 foto a carosello orizzontale scroll-snap con tutte le 14 foto, frecce + swipe, nessuna dipendenza — richiesta cliente
- 2026-08-02: Galleria: griglia full-bleed senza gap, 2 righe da 7 su desktop (2 col mobile, 4 tablet), celle quadrate, reveal invariato — richiesta cliente, stile reference cardillo.it
- 2026-08-02: Sito bilingue IT/SCN con mini-i18n custom (React Context + dizionari in `src/i18n/`), zero dipendenze. Default: italiano. Preferenza salvata in `localStorage` con fallback in-memory.
- 2026-08-02: VINCOLO: la versione siciliana è bozza AI non validata; la validazione di un parlante nativo è bloccante per il lancio (Backlog).
- 2026-08-02: `<title>` delle pagine restano in italiano in entrambe le lingue (SEO: una sola lingua indicizzata per ora).
- 2026-08-02: H1 Home allineato al motto ufficiale ("Il ferro è il nostro mestiere.") come claim provvisorio, in attesa di conferma cliente.
- 2026-08-02: Rotazione quotes hero (opzione B) con hook useRotator, 4 citazioni IT/SCN dalla bozza

## Fuori scope
Express, MongoDB, autenticazione, CMS, e-commerce

## Backlog
- Claim hero: motto ufficiale impostato come claim provvisorio; conferma definitiva del cliente in attesa (alternative: "Il ferro si piega alla tua idea" o altro)
- Validazione della colonna SCN da parte di un parlante nativo della famiglia: NON bloccante per i deploy di lavoro, BLOCCANTE per il lancio ufficiale del sito al pubblico
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

## Fase 3c — Contratto

### Cosa aspettarsi a fine fase
- Un toggle "ITA | SIC" in navbar (desktop, vicino alla CTA preventivo; mobile, dentro il menu hamburger) che commuta la lingua di tutto il sito istantaneamente, senza ricaricare la pagina
- Tutte le 6 pagine (Home, Chi Siamo, Prodotti, Galleria, Contatti, Preventivo), navbar e footer completamente tradotti in siciliano quando il toggle è su SIC, incluse etichette form e messaggi di validazione/conferma del Preventivo
- Lingua di default sempre italiano al primo accesso; la scelta fatta dall'utente viene ricordata tra una visita e l'altra sullo stesso browser
- I `<title>` delle pagine e gli alt text delle foto restano in italiano in entrambe le lingue (scelta SEO/contenuti, non un bug)
- La versione siciliana è una bozza AI non ancora validata da un parlante nativo: resta pubblicamente visibile per il lavoro in corso, ma non è testo definitivo (vedi Backlog)

### Come testa Antonino (UAT, da browser)
1. Apri il sito da PC: in alto a destra nella navbar trovi "ITA | SIC". Clicca "SIC": tutta la pagina (menu, testi, bottoni) cambia lingua all'istante, senza che la pagina si ricarichi
2. Naviga tra tutte e 6 le pagine (Home, Chi Siamo, Prodotti, Galleria, Contatti, Preventivo) restando su SIC: verifica che ogni pagina sia tradotta, non solo la Home
3. In Preventivo, prova a inviare il modulo vuoto: verifica che anche i messaggi di errore siano in siciliano
4. Ricarica la pagina (F5): la lingua scelta (SIC) deve restare impostata
5. Torna su "ITA": tutto torna in italiano
6. Ripeti i punti 1-2 dal telefono: apri il menu hamburger, verifica che il toggle lingua sia presente e funzioni allo stesso modo
7. **Importante**: leggi il sito intero in siciliano e annota ogni forma/parola che "non si direbbe così" dalle vostre parti — questa lista sarà l'input per la validazione della famiglia prima del lancio pubblico
8. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build` senza errori
- `npm run lint` senza errori
- `npm test` verde (provider/hook i18n, toggle navbar, testi Home e pagine restanti in entrambe le lingue)
- Controllo automatico (script dedicato) che nessuna stringa italiana visibile nota resti hardcoded nei componenti delle 6 pagine, fuori dai dizionari
- Verifica browser headless: toggle commuta Home e Chi Siamo, refresh mantiene la lingua scelta, nessun errore console, screenshot Home in SIC desktop + mobile
- Deploy Vercel "Ready" dopo il push finale

### Checklist di chiusura (compilata da Claude Code, 2026-08-02)
- `npm run build` senza errori: **PASS** (build in 360ms, nessun errore)
- `npm run lint` senza errori: **PASS** (nessun errore/warning)
- `npm test` verde: **PASS** (13 file di test, 40/40 test: provider/hook i18n, toggle navbar, Home, Chi Siamo, Prodotti, Contatti, Preventivo, PreventivoForm, più i test preesistenti di routing/Carousel/Galleria/useScrollReveal invariati)
- Controllo automatico "nessuna stringa italiana hardcoded fuori dai dizionari": **PASS** — creato `scripts/check-i18n-coverage.mjs`, denylist di ~45 stringhe italiane note (etichette, messaggi di validazione, testi hero/feature/CTA) grepata su tutti i `.jsx` di `src/pages`, `src/layout`, `src/components` esclusi i test; i `<title>` sono esplicitamente esclusi dal controllo perché restano in italiano per scelta (SEO). Esito: nessuna occorrenza su 24 file controllati
- Verifica browser headless (Playwright, installato temporaneamente fuori dal progetto, non aggiunto a package.json): **PASS** — 11/11 controlli: claim Home in IT di default e in SCN dopo il toggle, `document.documentElement.lang` aggiornato a `scn`, Chi Siamo resta in SCN dopo la navigazione, il refresh (F5) mantiene la lingua scelta, il toggle torna correttamente a ITA, nessun errore console desktop né mobile, toggle lingua visibile e funzionante nel menu hamburger mobile, nessuno scroll orizzontale a 390px
- Screenshot Home in SIC desktop (1440×900) e mobile (iPhone 12, 390×844): **PASS** — generati e ispezionati, layout coerente con la versione italiana, nessuna rottura visiva
- Deploy Vercel "Ready" dopo il push finale: **PASS** — verificato via GitHub commit status API su tutti i commit della fase (contratto/infrastruttura, toggle navbar, testi Home, testi pagine restanti), tutti "success"

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate — in particolare la lettura umana dei testi in siciliano, che nessun controllo automatico può sostituire.

## Fase 3b/3d — Contratto

### Cosa aspettarsi a fine fase
- Home (/): la riga sotto il claim non è più fissa, ma ruota ogni 6 secondi tra 5 frasi sul ferro/officina (la riga attuale più 4 nuove citazioni), con una piccola transizione di scorrimento; claim e pulsanti restano fissi
- Chi ha impostato "riduci movimento" nel proprio dispositivo vede solo la prima frase, ferma, senza rotazione
- La rotazione funziona sia in italiano sia in siciliano, seguendo il toggle lingua
- Il form Richiedi Preventivo invia davvero un'email quando compilato correttamente: arriva alla casella `lombardoserramenti.contatti@gmail.com`, con "Rispondi a" impostato sull'indirizzo email inserito dal cliente
- Se l'invio fallisce (problema di rete o del server), il form mostra un messaggio di errore chiaro e i dati inseriti restano compilati, pronti per un nuovo tentativo
- La pagina di conferma dopo l'invio non menziona più "Simulazione — Fase 2": è una conferma reale
- La mappa in Contatti resta un segnaposto (l'indirizzo dell'officina non è ancora stato fornito) — nessuna modifica in questa fase
- Il Backlog di SPEC.md riflette lo stato reale del progetto

### Come testa Antonino (UAT, da browser)
1. Apri la Home e osserva la riga sotto il titolo per almeno 30 secondi: deve cambiare frase circa ogni 6 secondi, con un piccolo effetto di scorrimento, senza che il resto della pagina si sposti
2. Cambia lingua (ITA/SIC) e verifica che la rotazione continui a funzionare, con le frasi tradotte
3. Se il tuo telefono/PC ha l'opzione "riduci movimento" nelle impostazioni di accessibilità, attivala e verifica che la riga resti ferma sulla prima frase
4. Vai su Richiedi Preventivo, compila il form con dati reali (puoi scrivere "Test Fase 3b" come nome) e invia: deve comparire la conferma, senza più la scritta "Simulazione"
5. **Controlla la casella Gmail `lombardoserramenti.contatti@gmail.com` (anche la cartella Spam)**: deve essere arrivata un'email con oggetto "Richiesta preventivo — Test Fase 3b (...)" e i dati inseriti
6. Prova a rispondere a quell'email: deve andare all'indirizzo email che avevi inserito nel form, non a Resend
7. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build` senza errori
- `npm run lint` senza errori
- `npm test` verde (hook useRotator, rotazione Home, invio form con fetch mockato con successo/errore, funzione serverless api/preventivo.js)
- `node scripts/check-i18n-coverage.mjs` senza nuove stringhe hardcoded
- Verifica browser headless: rotazione visibile e ciclica su Home, nessun layout shift, disattivata con `prefers-reduced-motion`, commuta con la lingua
- Verifica via `curl` sull'endpoint `/api/preventivo` in produzione: risposta 405 su metodo non consentito, 400 su payload invalido, 200 su invio valido (senza dare per scontato l'arrivo dell'email, non verificabile da Claude Code)
- Deploy Vercel "Ready" dopo il push finale
