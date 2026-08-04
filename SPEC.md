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
- 2026-08-02: Form preventivo → api/preventivo.js (Vercel function) → Resend REST via fetch (zero dipendenze) → destinatario lombardoserramenti.contatti@gmail.com; free tier con mittente onboarding@resend.dev; honeypot anti-spam; segreto solo in env var RESEND_API_KEY (Vercel + .env locale)
- 2026-08-02: Dati contatti reali inseriti (indirizzo Viale Europa 44 Moio Alcantara ME, orari), sostituiscono i placeholder di Fase 2. Telefono provvisorio, vedi voce Backlog dedicata.
- 2026-08-02: Telefono inserito (366 547 2502) è PROVVISORIO/FAKE in attesa del numero reale dal cliente — sostituire appena disponibile in data/contatti.js (da cui deriva anche l'href "tel:" della CTA "Chiamaci" in Home)
- 2026-08-02: Mappa Contatti sostituita con embed Google Maps reale (formato query senza API key) sulle coordinate dell'officina, con link alla scheda Google Business completa

- 2026-08-03: Fase 6 (restyling visivo): rename dei token Tailwind `@theme` in `src/index.css` da `iron-*`/`ember-ink` (palette dark/metallica provvisoria) a `cream-*`/`ink-*`/`ember-*` (palette chiara/showroom) — rename scelto invece di solo ricolorare gli stessi nomi, per evitare nomi permanentemente fuorvianti (es. `bg-iron-700` userebbe una var chiamata "iron" per uno sfondo crema chiaro)
- 2026-08-03: Fase 6: Galleria resta catalogo unico senza filtri per categoria (decisione Fase 3a confermata) — il brief di restyling menzionava "filtri pill" ma si riferiva a una versione di mockup precedente alla scelta cliente di Fase 3a; nessun filtro reintrodotto
- 2026-08-03: Fase 6: nessuna sezione "recensioni Google" aggiunta in Contatti in questa fase — non esiste ancora una scheda Google Business pubblica né recensioni reali da mostrare (deciso con Antonino: si evita di inventare contenuti); voce Backlog dedicata per quando la scheda esisterà
- 2026-08-03: Fase 6: logo (`src/assets/logo-lombardo.png`, sfondo bianco pieno con cornice scura perimetrale e timbratura) ritagliato via script automatico (`scripts/crop-logo.mjs`, sharp) a coordinate fisse attorno alla scritta; sfondo bianco mantenuto, nessun tentativo di rimozione/trasparenza (deciso con Antonino: opzione più sicura, niente rischio di artefatti da chroma-key)
- 2026-08-03: Fase 3f: foto reali per le 5 categorie Prodotti, ottimizzate in WebP via `scripts/optimize-prodotti-images.mjs` (adattamento di `scripts/optimize-galleria-images.mjs`): sorgenti in `materiali/foto-prodotti/*.jpeg` (i nomi file forniti dal cliente non seguono gli slug di `prodotti.js`, es. `"ringhiere e balaustre.jpeg"` → slug `ringhiere`, mappa esplicita nello script), output in `src/assets/prodotti/{slug}.webp`, larghezza max 1200px, qualità 80, un solo formato (foto già piccole, nessuna variante full/thumb necessaria)
- 2026-08-03: Fase 3f: le 5 foto ottimizzate sostituiscono i Placeholder in `ZigZagBlock.jsx` (Prodotti) e `CategoryCard.jsx` (anteprima categorie Home), tramite nuovo campo `image` in `prodotti.js`; entrambi i componenti mantengono `Placeholder` come fallback se `image` non è presente. `imageAlt` non modificato (resta testo placeholder generico, vedi Backlog)
- 2026-08-02: Corretti i fatti storici (2 generazioni, non 3) e rimossa la dicitura "lavorazioni artigianali" isolata dal contesto ferro, in tutte le pagine e in entrambe le lingue
- 2026-08-02: Quotes hero portate da 5 a 10 (5 nuove, IT+SCN); rimossi gli indicatori a pallini della rotazione su richiesta cliente — resta solo la transizione testuale
- 2026-08-02: Rimosso il pulsante "Chiamaci" dalla Home (CTA finale); email e telefono in Contatti resi interattivi (mailto:/tel:) e corretto il wrapping dell'email che usciva dal box
- 2026-08-02: Aggiunta sezione "Dicono di noi" in Home, solo link alla scheda Google Business (nessuna recensione mostrata: profilo verificato di recente, ancora senza recensioni reali). Arricchimento con recensioni vere selezionate rimane in Backlog (Fase 7).
- 2026-08-04: Fase 3h: 3 foto per materiale (ferro, acciaio, alluminio) fornite dal cliente in `materiali/categorie_prodotti/{slug}.jpeg` (nomi file già coincidenti con lo slug, nessuna mappa di rinomina necessaria a differenza di Fase 3f), ottimizzate in WebP via nuovo `scripts/optimize-categorie-materiale-images.mjs` (stesso pattern di `optimize-prodotti-images.mjs`), output in `src/assets/categorie-materiale/{slug}.webp`, larghezza max 1200px, qualità 80: 84 KB → 80 KB totali. Sorgenti originali committate in git come già `materiali/foto-prodotti/`.
- 2026-08-04: Fase 3h: la sezione "Le nostre lavorazioni" in Home mostra ora 3 card per materiale (Ferro, Acciaio, Alluminio, nuovo `src/data/materiali.js`) invece delle 5 categorie prodotto (`data/prodotti.js`, invariato, resta usato solo da `/prodotti` e dal form Preventivo). Le 3 card linkano genericamente a `/prodotti` (nessun anchor `#slug`, che esiste solo per le 5 categorie prodotto): restano cliccabili come tutte le altre card della Home, invece di introdurre un pattern "card non cliccabile" nuovo. `CategoryCard.jsx` esteso con due prop opzionali — `to` (override della destinazione, default invariato `/prodotti#${slug}` se omesso) e `description` (paragrafo opzionale sotto il titolo) — senza impatto sull'uso esistente per le 5 categorie prodotto. Testi delle 3 card in nuovo namespace dizionario `home.lavorazioni.{ferro,acciaio,alluminio}`, visibili nella card stessa (non solo alt text), nel rispetto della regola "artigianale solo per il ferro": presente nel testo Ferro, assente in Acciaio e Alluminio.
- 2026-08-04: Fase 3h: aggiornato `prodotti.pageDescription` (IT/SCN) per citare esplicitamente ferro, acciaio e alluminio, nel rispetto della regola di copy ("tecnica artigianale"/"artigiana" riferita solo al ferro). Le 5 categorie sotto l'intro (`ZigZagBlock` da `data/prodotti.js`) restano invariate.
- 2026-08-02: Sostituita immagine categoria Ferro in Home con versione senza watermark fornita dal cliente
- 2026-08-02: Aggiunta 15ª foto alla Galleria (galleria15), ottimizzata con lo stesso script esistente (`scripts/optimize-galleria-images.mjs`, aggiornato solo il controllo di sanità da 14 a 15 file attesi); peso `thumb/` con 15 foto: 1,1 MB totali, sotto il budget ~2.5 MB
- 2026-08-02: Griglia Galleria passata da 2×7 a 3×5 colonne per accogliere la 15ª foto, tutte le altre caratteristiche (celle verticali, full-width, gap zero, reveal) invariate
- 2026-08-03: Fase 6 (feedback UAT): rivista la decisione precedente sul logo — Antonino ha chiesto la rimozione dello sfondo bianco (che appariva come un "adesivo" separato su Navbar/Hero) e un logo più grande in Navbar. `scripts/crop-logo.mjs` ora applica una trasparenza per chiave colore (alpha = distanza dal bianco per canale, con decontaminazione del colore per evitare aloni chiari sui bordi anti-aliasati) invece del semplice ritaglio con sfondo bianco pieno. Il chip crema dietro al logo nel footer scuro resta invariato: la trasparenza risolve il problema su sfondo chiaro (Navbar/Hero), ma su sfondo scuro il logo (testo blu/nero) resta illeggibile senza una base chiara dietro. Logo Navbar ingrandito da `h-8` a `h-16`, padding verticale header da `py-3` a `py-4` per ospitarlo comodamente.

## Fuori scope
Express, MongoDB, autenticazione, CMS, e-commerce

## Backlog
- Claim hero: motto ufficiale impostato come claim provvisorio; conferma definitiva del cliente in attesa (alternative: "Il ferro si piega alla tua idea" o altro)
- Validazione della colonna SCN da parte di un parlante nativo della famiglia: NON bloccante per i deploy di lavoro, BLOCCANTE per il lancio ufficiale del sito al pubblico
- Setup SSH GitHub (opzionale, non bloccante: i push funzionano via HTTPS)
- Alt text delle foto: rivedere/rifinire i testi descrittivi (accessibilità/SEO)
- Recuperare/aggiungere una foto col padre (fondatore) in officina
- Creare/collegare una scheda Google Business Profile per l'officina
- Numero di telefono provvisorio/fake (366 547 2502) in uso in data/contatti.js: sostituire con il numero reale dell'officina appena disponibile
- ~~Foto "Ferro" con watermark Shutterstock~~ RISOLTO 2026-08-02: sostituita con versione ritagliata senza watermark fornita dal cliente. Restano `acciaio.jpeg`/`alluminio.jpeg`, foto stock generiche (non dell'officina): da valutare se sostituire con foto reali quando disponibili
- Sezione "Dicono di noi" in Home: versione solo-link a Google aggiunta in Fase 3g; arricchimento con recensioni vere selezionate (stelle, citazioni clienti) resta da valutare quando il cliente le sceglierà
- Prenotazione interventi online — da valutare
- Lightbox per la Galleria — da valutare (le immagini `full/` sono già predisposte, vedi decisione Fase 3a)
- Dominio custom (fine progetto) — sbloccherebbe anche un mittente email professionale su Resend (invece di onboarding@resend.dev)
- Valutare rate limiting/captcha sul form Preventivo se arriva spam nonostante l'honeypot
- Valutare `npm audit fix` per l'advisory su react-router (RSC Mode CSRF Bypass) — non applicabile a questo setup SPA senza data router, ma da rivalutare se si passa a `createBrowserRouter`
- Sezione "recensioni Google" in Contatti (stelle, card): implementare con dati reali quando esisterà una scheda Google Business Profile pubblica per l'officina — vedi anche voce Backlog "Creare/collegare una scheda Google Business Profile"
- Valutare self-hosting dei font Oswald/Barlow (oggi Google Fonts via `<link>` in `index.html`) — non implementato in Fase 6, non richiesto esplicitamente

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

### Checklist di chiusura (compilata da Claude Code, 2026-08-02)
- `npm run build` senza errori: **PASS** (build in 459ms, nessun errore)
- `npm run lint` senza errori: **PASS** (nessun errore/warning; aggiunto un blocco `globals.node` in `eslint.config.js` per `api/**/*.js`, unica modifica infrastrutturale oltre ai file di feature)
- `npm test` verde: **PASS** (15 file di test, 58/58 test: hook useRotator, rotazione Home incluso reset al cambio lingua, funzione serverless `api/preventivo.js` con tutti i rami di risposta, invio form con fetch mockato con successo/errore/payload, più i test preesistenti invariati)
- `node scripts/check-i18n-coverage.mjs`: **PASS** (nessuna stringa hardcoded su 24 file `.jsx` controllati)
- Verifica browser headless (Playwright, installato temporaneamente fuori dal progetto, non aggiunto a package.json) su https://lombardo-serramenti.vercel.app: **PASS** — 8/8 controlli: prima quote mostrata al caricamento, la quote cambia dopo 6s, nessun layout shift (stessa bounding box prima/dopo la rotazione), dopo il toggle SIC riparte dalla prima quote in siciliano, `prefers-reduced-motion` blocca la rotazione, il form con `/api/preventivo` bloccato (route intercettata) mostra l'errore e mantiene i valori compilati, nessun errore console
- Verifica mobile headless (390×844) su produzione: **PASS** — nessuno scroll orizzontale (`document.body.scrollWidth` = `window.innerWidth` = 390), rotazione quotes funzionante, nessun errore console
- Verifica via `curl` sull'endpoint `/api/preventivo` in produzione: **PASS** — `GET` → 405; payload vuoto (`{}`) → 400 con 5 errori di validazione; payload con honeypot `azienda` valorizzato → 200 `{"ok":true}` senza chiamare Resend (verificato anche in unit test); payload completo e valido (nome "Test Fase 3b") → 200 `{"ok":true}`
- Invio reale di prova ("Test Fase 3b") dal sito in produzione: **PASS** l'endpoint (risposta 200 confermata sopra) — **NON VERIFICATO** l'arrivo effettivo dell'email nella casella `lombardoserramenti.contatti@gmail.com`, non verificabile da Claude Code: richiede conferma di Antonino in UAT (controllare anche la cartella Spam)
- Deploy Vercel "Ready" dopo ogni push della fase: **PASS** — verificato via GitHub commit status API su tutti i commit della fase (contratto, quotes hero, serverless function, collegamento form, sync backlog), tutti "success"

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) e `curl` diretto sulla produzione come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate — in particolare la lettura umana della rotazione delle quote e, soprattutto, la conferma dell'arrivo reale dell'email nella casella Gmail, che nessun controllo automatico può sostituire.

## Fase 3e — Contratto

### Cosa aspettarsi a fine fase
- Contatti (/contatti) e footer mostrano i dati reali dell'officina: indirizzo Viale Europa 44, 98030 Moio Alcantara (ME); orari Lun–Ven 7:30–13:00/14:00–18:00, Sab 9:00–12:30, Dom chiuso
- Il numero di telefono mostrato (366 547 2502) è **provvisorio/fake**, in attesa del numero reale dal cliente (vedi Backlog); è comunque un link `tel:` funzionante da mobile
- La CTA "Chiamaci" in Home punta allo stesso numero (derivato da `data/contatti.js`, non più duplicato)
- La mappa in Contatti non è più un segnaposto grigio: è un embed Google Maps reale centrato sulle coordinate dell'officina, con un link "Apri in Google Maps →" che porta alla scheda Google Business completa (recensioni incluse)
- Tutto tradotto/coerente in italiano e siciliano

### Come testa Antonino (UAT, da browser)
1. Apri /contatti da PC: verifica che indirizzo, telefono e orari siano **esatti** (un refuso su questi dati è un problema serio per i clienti veri)
2. Verifica che la mappa mostri il punto giusto (Viale Europa 44, Moio Alcantara) e non un placeholder grigio
3. Clicca "Apri in Google Maps →": deve aprirsi la scheda Google Business dell'officina in una nuova scheda
4. Dal telefono, tocca il pulsante "Chiamaci" in fondo alla Home: verifica che componga la chiamata al numero mostrato (366 547 2502 — **numero provvisorio**, non ancora quello reale dell'officina)
5. Ripeti i punti 1-2 in siciliano (toggle SIC)
6. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide
7. **Importante**: il numero di telefono attuale è FAKE/PROVVISORIO — appena hai il numero reale dell'officina, comunicalo per l'aggiornamento

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build` senza errori
- `npm run lint` senza errori
- `npm test` verde (Contatti con dati reali, mappa embed, link Maps, entrambe le lingue)
- `node scripts/check-i18n-coverage.mjs` senza nuove stringhe hardcoded
- Verifica browser headless: Contatti mostra dati reali, iframe mappa carica, link Maps esterno corretto, CTA "Chiamaci" in Home punta al numero vero, in entrambe le lingue, desktop + mobile
- Deploy Vercel "Ready" dopo il push finale

### Checklist di chiusura (compilata da Claude Code, 2026-08-02)
- `npm run build` senza errori: **PASS** (build in 298ms, nessun errore)
- `npm run lint` senza errori: **PASS** (nessun errore/warning)
- `npm test` verde: **PASS** (15 file di test, 60/60 test: 2 nuovi test Contatti su iframe mappa e link Maps IT/SIC, più i 58 test preesistenti invariati; aggiunto `beforeEach` con `localStorage.clear()` in `Contatti.test.jsx` per isolare i test di lingua)
- `node scripts/check-i18n-coverage.mjs`: **PASS** (nessuna stringa hardcoded su 24 file `.jsx` controllati)
- Verifica browser headless (Playwright, installato temporaneamente fuori dal progetto, non aggiunto a package.json) su https://lombardo-serramenti.vercel.app, desktop (1440×900) e mobile (390×844): **PASS** — 30/30 controlli: indirizzo/telefono/orari reali visibili in Contatti IT e SIC, iframe mappa presente con `src` sulle coordinate corrette, link "Apri in Google Maps →" (IT) / "Rapri in Google Maps →" (SIC) presente e punta alla scheda Google Business reale con `target="_blank"`, CTA "Chiamaci" in Home punta a `tel:+393665472502`, nessuno scroll orizzontale, nessun errore console
- Screenshot Contatti desktop e mobile: **PASS** — ispezionati visivamente, mappa mostra correttamente il punto su Moio Alcantara (pin rosso), card dati reali leggibili, link Maps visibile sotto la mappa
- Numero di telefono cliccabile da mobile: **PASS** per il pulsante "Chiamaci" in Home (link `tel:` verificato) — la card "Telefono" in Contatti mostra il numero come testo semplice, non come link `tel:` (nessuna richiesta esplicita del task in tal senso); segnalato come possibile micro-miglioramento futuro, non bloccante
- Deploy Vercel "Ready" dopo ogni push della fase: **PASS** — verificato via GitHub commit status API sui commit `7c0b374` (dati contatti reali) e `d10f2c3` (mappa embed), entrambi "success"
- Conferma domenica chiusa: **PASS** — confermato esplicitamente da Antonino prima di iniziare la fase (nessuna ambiguità residua)
- Lettura umana di indirizzo/telefono/orari per errori di battitura, verifica del punto esatto sulla mappa da un utente reale, prova del tasto "Chiamaci" su un telefono reale: **NON VERIFICATO** — richiede conferma di Antonino in UAT, non verificabile in modo affidabile da Claude Code

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate — in particolare la lettura umana dei dati di contatto (dove un errore di battitura avrebbe conseguenze reali sui clienti) e la verifica del numero di telefono da un dispositivo reale.

## Fase 6 — Contratto

### Cosa aspettarsi a fine fase
- Nuova palette "chiara/showroom" su tutte le 6 pagine: sfondo crema, testo scuro, accento arancio caldo, sezioni di contrasto scure (banda numeri, footer, bottone primario "Richiedi Preventivo")
- Header con sfondo crema, logo reale ritagliato (senza cornice/timbratura) affiancato dalla scritta "OFFICINA ARTIGIANA DAL 1968", voce di menu attiva in arancio, toggle lingua "ITA | SIC" trattato come elemento di brand (ITA sottolineato in arancio quando attivo)
- Home: hero riprogettato a griglia esplicita a due colonne (testo a sinistra, logo reale a destra, mai sovrapposti), con piccoli indicatori a barre sotto la citazione che segnalano la rotazione ogni 6s; sezioni sottostanti (perché sceglierci, categorie prodotti, banda numeri, carosello realizzazioni, CTA finale) ricolorate nella nuova palette, stessa identica funzionalità di prima (rotazione quote, carosello con swipe/frecce, nessun cambio di logica)
- Footer scuro con logo su un riquadro chiaro, colonne Naviga/Contatti/Orari
- Chi Siamo, Prodotti, Galleria, Contatti, Preventivo: stessa struttura e stessi contenuti di oggi, solo ricolorati/ristilizzati nella nuova palette e font
- Galleria: resta catalogo unico senza filtri per categoria (nessuna modifica funzionale)
- Contatti: nessuna sezione "recensioni Google" aggiunta in questa fase (dati non ancora disponibili, vedi Backlog); mappa Google invariata
- Nessun cambio di routing, contenuti/testi (salvo 2 nuove etichette: tagline header e sottoclaim hero), i18n IT/SCN, o funzionalità del form preventivo

### Come testa Antonino (UAT, da browser)
1. Apri il sito da PC: verifica che tutta la navbar sia chiara (sfondo crema), col logo vero (non più un rettangolo generico) e la scritta "Officina artigiana dal 1968" accanto
2. Apri la Home: verifica che il titolo e il logo stiano ciascuno nella propria metà, senza che si sovrappongano, a qualsiasi larghezza della finestra (prova anche a restringere la finestra del browser)
3. Osserva la riga di citazione sotto il titolo per 30 secondi: deve cambiare ogni 6s come prima, ma ora con dei piccoli trattini/pallini sotto che indicano quale citazione è attiva
4. Scorri tutta la Home: verifica che i colori siano coerenti (crema/arancio/scuro) su ogni sezione, inclusa la banda scura con i numeri (anni, progetti, generazioni) e il carosello delle realizzazioni (le frecce non devono più coprire le foto)
5. Naviga su tutte le altre 5 pagine (Chi Siamo, Prodotti, Galleria, Contatti, Preventivo): verifica che tutte abbiano la stessa palette chiara e che nessun contenuto sia sparito o cambiato (stesse foto, stessi testi, stesse categorie)
6. In Galleria: conferma che NON ci siano filtri per categoria (resta una griglia unica di foto, come oggi)
7. In Contatti: verifica che la mappa funzioni come prima e che non ci sia (per ora) una sezione recensioni
8. Compila e invia il form Preventivo: deve funzionare esattamente come prima, con il messaggio di conferma ristilizzato
9. Ripeti i punti principali dal telefono: menu leggibile, nessun elemento tagliato o sovrapposto, niente scroll orizzontale
10. Ripeti la navigazione in siciliano (toggle SIC): stessa palette, stessi testi già noti
11. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build` senza errori
- `npm run lint` senza errori
- `npm test` verde (nessuna regressione: routing, i18n, form, rotazione quote, scroll-reveal, carosello)
- `node scripts/check-i18n-coverage.mjs` senza nuove stringhe hardcoded (incluse le 2 nuove chiavi aggiunte correttamente ai dizionari)
- Verifica browser headless: palette applicata coerentemente su tutte le pagine desktop+mobile, hero a due colonne senza sovrapposizioni a nessuna larghezza, indicatori rotazione quote presenti e funzionanti, carosello con frecce non sovrapposte alle card, nessun filtro in Galleria, nessuna sezione recensioni in Contatti, nessun errore console, nessuno scroll orizzontale
- Deploy Vercel "Ready" dopo il push finale

### Checklist di chiusura (compilata da Claude Code, 2026-08-03)
- `npm run build` senza errori: **PASS** (build in ~520ms, nessun errore, in tutti i 14 commit della fase)
- `npm run lint` senza errori: **PASS** (nessun errore/warning dopo ogni task)
- `npm test` verde: **PASS** (15 file di test, 60/60 test invariati — nessuna regressione su routing, i18n, rotazione quote, scroll-reveal, carosello, form)
- `node scripts/check-i18n-coverage.mjs`: **PASS** (nessuna stringa hardcoded su 24 file `.jsx` controllati, incluse le 2 nuove chiavi `nav.brandTagline` e `home.hero.subclaim` correttamente nei dizionari IT/SCN)
- Grep finale residui `iron-`/`ember-ink` su `src/`: **PASS** (zero occorrenze, anche nei file di test)
- Verifica browser headless (Playwright, installato temporaneamente fuori dal progetto via `npm install --no-save`, non aggiunto a `package.json`), desktop (1440×900) e mobile (390×844) su tutte le 6 pagine: **PASS** — 0 errori console su tutte le 12 combinazioni pagina/viewport, nessuno scroll orizzontale (`document.body.scrollWidth === window.innerWidth` su tutte)
- Hero Home a griglia 2 colonne: **PASS** — verificato via screenshot a 1440px, 768px e 390px: testo e logo mai sovrapposti a nessuna larghezza (sotto il breakpoint `lg` la griglia collassa a singola colonna impilata, non sovrapposta)
- Indicatori rotazione quote: **PASS** — barre presenti sotto la citazione, quella attiva evidenziata in arancio (verificato via screenshot; comportamento temporale della rotazione già coperto da `useRotator.test.jsx`, non ri-verificato manualmente in questa fase perché la logica non è stata toccata)
- Carosello realizzazioni: frecce ricolorate e spostate fuori dal bordo della riga, meccanica invariata: **PASS** — verificato che il pulsante "Foto precedente" diventi visibile dopo click su "Foto successiva" (scroll-snap funzionante)
- Galleria: nessun filtro reintrodotto, effetto scroll-reveal funzionante: **PASS** — verificato via `getComputedStyle` che l'opacità di un elemento passi da 0 (prima dello scroll) a 1 (dopo scroll a fondo pagina)
- Toggle lingua ITA/SIC: **PASS** — verificato che il claim H1 cambi in siciliano dopo il click su "SIC"
- Nessuna sezione recensioni Google aggiunta in Contatti, mappa invariata: **PASS** (verificato via screenshot)
- Regola "artigianale riferito solo al ferro": **PASS** — nessun contenuto in `src/` menziona alluminio o prodotti industriali
- Deploy Vercel "Ready" dopo il push finale (commit `d1c6c30`): **PASS** — verificato via GitHub commit status API (`state: success`) e via `curl` diretto su https://lombardo-serramenti.vercel.app/ e /galleria (HTTP 200)
- Lettura umana della resa visiva su schermo reale (colori, leggibilità, gerarchia), prova su telefono reale, verifica del ritaglio logo a occhio umano non esperto di design: **NON VERIFICATO** — richiede conferma di Antonino in UAT, non sostituibile da controlli automatici

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) e comandi automatici come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate — in particolare il giudizio estetico complessivo (che è lo scopo stesso di questa fase) resta da validare a occhio umano.

## Fase 3f — Contratto

### Cosa aspettarsi a fine fase
- Pagina Prodotti (/prodotti): ciascuna delle 5 categorie (cancelli, ringhiere, portoni, inferriate, opere su misura) mostra la foto reale fornita dal cliente al posto del riquadro grigio a righe (Placeholder)
- Home (/): l'anteprima categorie prodotti mostra le stesse 5 foto reali al posto dei Placeholder
- Nessun'altra sezione toccata: Galleria, carosello realizzazioni Home, mappa Contatti restano invariati
- Alt text delle foto: resta quello placeholder generico già esistente in `prodotti.js` (non modificato, in attesa di testi definitivi dal cliente — vedi Backlog)
- Le foto sono ottimizzate in WebP (peso ridotto) tramite script dedicato, sullo stesso pattern della Fase 3a

### Come testa Antonino (UAT, da browser)
1. Apri /prodotti da PC: verifica che ognuna delle 5 categorie mostri la foto giusta (non scambiata con un'altra categoria) e che il ritaglio dell'immagine non tagli male il soggetto principale
2. Apri la Home e controlla l'anteprima categorie prodotti: stesse 5 foto reali, stesso controllo su ritaglio/corrispondenza categoria
3. Ripeti i punti 1-2 dal telefono: foto leggibili, nessun elemento tagliato o sovrapposto
4. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build` senza errori
- `npm run lint` senza errori
- `npm test` verde (nessuna regressione)
- `node scripts/check-i18n-coverage.mjs` senza nuove stringhe hardcoded
- Verifica browser headless: 5 foto reali renderizzate in Prodotti e in Home (nessun Placeholder residuo per queste categorie), nessun errore console, screenshot desktop + mobile
- Peso ottimizzato delle foto in `src/assets/prodotti/` riportato nel commit
- Deploy Vercel "Ready" dopo il push finale

### Checklist di chiusura (compilata da Claude Code, 2026-08-03)
- `npm run build` senza errori: **PASS** (build in ~600ms, nessun errore, in entrambi i commit della fase)
- `npm run lint` senza errori: **PASS** (nessun errore/warning)
- `npm test` verde: **PASS** (15 file di test, 60/60 test invariati — nessuna regressione)
- `node scripts/check-i18n-coverage.mjs`: **PASS** (nessuna stringa hardcoded su 24 file `.jsx` controllati, nessuna nuova stringa introdotta da questa fase)
- Peso foto ottimizzate in `src/assets/prodotti/`: **PASS** — 224 KB → 221 KB totali (foto già piccole in origine, il guadagno principale è l'uniformità di formato WebP, non la compressione: 2 delle 5 foto sono leggermente cresciute in KB, differenza trascurabile)
- Verifica browser headless (Playwright, installato temporaneamente via `npm install --no-save`, rimosso a verifica completata) su https://lombardo-serramenti.vercel.app, desktop (1440×900) e mobile (390×844): **PASS** — Prodotti mostra 5 `<img>` reali (0 elementi `role="img"` Placeholder residui), Home mostra 20 `<img>` totali (5 categorie + 14 galleria + 1 logo hero), nessun errore console su tutte e 4 le combinazioni pagina/viewport, nessuno scroll orizzontale (`document.body.scrollWidth === window.innerWidth`)
- Screenshot Prodotti e Home, desktop e mobile: **PASS** — ispezionati visivamente, ciascuna foto corrisponde alla categoria giusta (cancello per Cancelli, grata decorativa per Ringhiere & Balaustre, portone in ferro battuto per Portoni & Serrande, inferriata a losanghe per Inferriate & Grate di Sicurezza, dettaglio in ferro battuto ornamentale per Opere su Misura), nessun ritaglio che tagli male il soggetto principale
- Deploy Vercel "Ready" dopo ogni push della fase: **PASS** — verificato via GitHub commit status API sui commit `0287f90` (ottimizzazione foto) e `092b47f` (sostituzione placeholder), entrambi "success"
- Corrispondenza foto/categoria e qualità del ritaglio giudicata da un occhio umano reale (non lo screenshot di Claude Code): **NON VERIFICATO** — richiede conferma di Antonino in UAT

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate — in particolare il giudizio umano su corrispondenza foto/categoria e qualità del ritaglio, che è lo scopo stesso di questa fase.

## Fase 3g — Contratto

### Cosa aspettarsi a fine fase
- Home (/): nuova sezione "Dicono di noi" tra il carosello "Dalle nostre realizzazioni" e la CTA finale "Hai un progetto in mente?"
- La sezione mostra solo un titolo, una breve frase di invito e un link "Leggi le recensioni su Google →" (SIC: "Talìa i recensioni supra Google →") che apre in una nuova scheda la scheda Google Business reale dell'officina (stessa scheda già linkata da "Apri in Google Maps" in Contatti)
- Nessuna recensione, stella, punteggio o nome cliente mostrato a schermo: il profilo Google è verificato ma non ha ancora recensioni reali, e non vengono mai mostrate testimonianze finte/placeholder
- Sezione tradotta in italiano e siciliano, coerente nello stile con le altre sezioni della Home ma visivamente distinta dalla CTA preventivo

### Come testa Antonino (UAT, da browser)
1. Apri la Home e scorri fino a dopo il carosello delle realizzazioni: verifica che compaia la sezione "Dicono di noi" prima della CTA finale "Hai un progetto in mente?"
2. Verifica che non ci sia nessuna recensione, stella o nome cliente a schermo: solo l'invito e il link
3. Clicca "Leggi le recensioni su Google →": deve aprirsi in una nuova scheda la scheda Google Business reale dell'officina
4. Ripeti i punti 1-3 in siciliano (toggle SIC)
5. Ripeti dal telefono: sezione leggibile, link cliccabile, niente elementi tagliati o sovrapposti
6. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build` senza errori
- `npm run lint` senza errori
- `npm test` verde (nuovi test sulla sezione "Dicono di noi" in italiano e siciliano)
- `node scripts/check-i18n-coverage.mjs` senza nuove stringhe hardcoded
- Verifica browser headless: sezione visibile tra carosello e CTA finale, link con `href` corretto verso la scheda Google e `target="_blank"`, nessuna recensione/stella/nome a schermo, screenshot desktop + mobile, nessun errore console
- Deploy Vercel "Ready" dopo il push finale

### Checklist di chiusura (compilata da Claude Code, 2026-08-02)
- `npm run build` senza errori: **PASS** (build in ~340ms, nessun errore)
- `npm run lint` senza errori: **PASS** (nessun errore/warning)
- `npm test` verde: **PASS** (15 file di test, 64/64 test — 2 nuovi su "Dicono di noi" IT/SCN, nessuna regressione)
- `node scripts/check-i18n-coverage.mjs`: **PASS** (nessuna stringa hardcoded su 25 file `.jsx` controllati, incluso il nuovo `ReviewsBanner.jsx`)
- Verifica browser headless (Playwright, installato temporaneamente via `npm install --no-save`, rimosso a verifica completata) su build locale (`vite preview`), desktop (1440×900) e mobile (390×844): **PASS** — sezione "Dicono di noi" presente una sola volta, posizionata correttamente tra il carosello realizzazioni e la CTA finale "Hai un progetto in mente?" (verificato via ordine dei `<section>` nel DOM), link con `href` verso la scheda Google Business reale e `target="_blank"`, nessun termine sospetto di recensione (stelle, "5/5", "4.5" ecc.) trovato nel testo della pagina, nessun errore console, nessuno scroll orizzontale
- Screenshot desktop e mobile con la sezione scrollata in vista: **PASS** — ispezionati visivamente, box bianco bordato + bottone outline chiaramente distinto dalla CTA preventivo (box scuro/crema con bottone pieno) subito sotto, nessuna recensione/stella/nome cliente mostrata
- Deploy Vercel "Ready" dopo il push finale: verrà confermato dopo il push (vedi commit di chiusura)

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate.

## Fase 3h — Contratto

### Cosa aspettarsi a fine fase
- Home (/): la sezione "Le nostre lavorazioni" mostra 3 card per materiale (Ferro, Acciaio, Alluminio) con foto reali, al posto delle 5 card per categoria prodotto
- Il link "Vedi tutti i prodotti →" e il click su ciascuna delle 3 card portano a `/prodotti`, invariata sotto l'intro: le 5 categorie (Cancelli, Ringhiere & Balaustre, Portoni & Serrande, Inferriate & Grate di Sicurezza, Opere su Misura) restano identiche, solo il testo introduttivo della pagina è aggiornato per citare ferro/acciaio/alluminio
- Il form Richiedi Preventivo (menu "Tipo di lavoro") resta invariato
- Regola di copy rispettata: "artigianale"/"lavorato a mano" solo per il ferro; i testi di Acciaio e Alluminio non la usano mai
- Tutto tradotto in italiano e siciliano

### Come testa Antonino (UAT, da browser)
1. Apri la Home: verifica che la sezione "Le nostre lavorazioni" mostri 3 card — Ferro, Acciaio, Alluminio — con foto reali coerenti col materiale
2. Clicca una delle 3 card: deve portare alla pagina Prodotti
3. Apri /prodotti direttamente: verifica che sotto il testo introduttivo (ora aggiornato) ci siano ancora le 5 categorie di prima, invariate
4. Apri Richiedi Preventivo: verifica che il menu "Tipo di lavoro" mostri le stesse opzioni di sempre
5. Leggi il testo della card Alluminio (Home): verifica che non compaia mai la parola "artigianale"
6. Ripeti i punti 1-5 in siciliano (toggle SIC)
7. Ripeti dal telefono: card leggibili, foto corrette, niente elementi tagliati
8. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build`, `npm run lint`, `npm test` senza errori dopo ogni task
- `node scripts/check-i18n-coverage.mjs` senza nuove stringhe hardcoded
- Verifica browser headless: 3 card materiale in Home con immagini reali, link a `/prodotti` senza anchor, `/prodotti` invariata sotto l'intro con le 5 categorie originali, form Preventivo invariato, testo Alluminio/Acciaio senza "artigian…" in nessuna lingua, nessun errore console, screenshot desktop+mobile
- Deploy Vercel "Ready" dopo ogni push della fase

### Checklist di chiusura (compilata da Claude Code, 2026-08-04)
- `npm run build` senza errori: **PASS** (nessun errore, in tutti e 4 i task della fase)
- `npm run lint` senza errori: **PASS** (nessun errore/warning)
- `npm test` verde: **PASS** (15 file di test, 66/66 test — 4 nuovi su Home per le card materiale IT/SIC, nessuna regressione su Prodotti/Preventivo/resto della suite)
- `node scripts/check-i18n-coverage.mjs`: **PASS** (nessuna stringa hardcoded su 25 file `.jsx` controllati)
- Peso immagini `src/assets/categorie-materiale/`: **PASS** — 84 KB → 80 KB totali (3 foto)
- Verifica browser headless (Playwright, installato temporaneamente via `npm install --no-save`, rimosso a verifica completata) su build locale (`vite preview`), desktop (1440×900) e mobile (390×844), IT e SIC: **PASS** — Home mostra esattamente 3 card materiale (Ferro/Acciaio/Alluminio, Ferru/Acciaru/Alluminiu in SIC) con href `/prodotti` su tutte e 3, testo Acciaio/Alluminio (ed equivalenti SIC) verificato senza "artigian…"; Prodotti mostra tutte e 5 le categorie originali invariate (Cancelli, Ringhiere & Balaustre, Portoni & Serrande, Inferriate & Grate di Sicurezza, Opere su Misura, ed equivalenti SIC) con il nuovo testo intro che cita ferro/acciaio/alluminio; form Preventivo — menu "Tipo di lavoro" con le stesse 6 opzioni di sempre (Seleziona…, Cancelli, Ringhiere & Balaustre, Portoni & Serrande, Inferriate & Grate di Sicurezza, Opere su Misura, Altro); nessun errore console su tutte le combinazioni testate; nessuno scroll orizzontale
- Screenshot Home e Prodotti, desktop e mobile, IT e SIC: **PASS** — ispezionati visivamente, card materiale coerenti col layout esistente, pagina Prodotti pixel-identica alle 5 categorie di prima salvo il nuovo testo intro
- Deploy Vercel "Ready" dopo ogni push della fase (commit `e64a879`, `2ad125b`, `ec8fb4f`): **PASS** — verificato via GitHub commit status API su ognuno dei 3 push, tutti "success"
- Foto "Ferro" (Shutterstock, watermark visibile, bassa risoluzione): pubblicata su decisione esplicita di Antonino durante la fase (vedi Backlog), non un difetto non segnalato — **PASS** come da istruzione ricevuta, non **FAIL**
- Corrispondenza foto/materiale e giudizio estetico complessivo da un occhio umano reale: **NON VERIFICATO** — richiede conferma di Antonino in UAT

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate.

## Fase 3i — Contratto

### Cosa aspettarsi a fine fase
- Galleria (/galleria): 15 foto invece di 14, la nuova in coda come ultimo elemento (nessun riordino delle 14 esistenti)
- Griglia passata da 2 a 3 colonne (desktop/tablet), 1 colonna su mobile — 3×5 invece di 2×7
- Tutte le altre caratteristiche invariate: celle verticali, full-width, gap zero, effetto scroll-reveal (fade+zoom-in)
- Home, Prodotti, Contatti non toccati; il carosello "Dalle nostre realizzazioni" in Home mostrerà automaticamente anche la 15ª foto (stessa fonte dati, nessuna modifica al carosello stesso)

### Come testa Antonino (UAT, da browser)
1. Apri /galleria da PC: conta le foto (devono essere 15) e le colonne (3, non più 2)
2. Verifica che la nuova foto (l'ultima) non sia tagliata male dal ritaglio automatico (object-cover)
3. Scrolla lentamente: verifica che l'effetto di comparsa (dissolvenza/ingrandimento) funzioni ancora su tutte le foto, incluse le ultime
4. Ripeti da tablet e da telefono: su mobile resta 1 colonna, nessuno scroll orizzontale
5. Apri la Home e controlla che il carosello "Dalle nostre realizzazioni" includa anche la nuova foto
6. Segna ogni punto PASS/FAIL e riporta i FAIL nella chat con il project guide

### Verifiche automatiche (eseguite da Claude Code prima di dichiarare pronta la fase)
- `npm run build`, `npm run lint`, `npm test` senza errori dopo ogni task
- `node scripts/check-i18n-coverage.mjs` senza nuove stringhe hardcoded
- Peso totale `src/assets/galleria/thumb/` con 15 foto sotto il budget ~2.5 MB
- Verifica browser headless: 15 foto in griglia 3 colonne (desktop/tablet) / 1 colonna (mobile), nessun gap, reveal funzionante, nessuno scroll orizzontale a 390/768/1440px, screenshot desktop+mobile
- Deploy Vercel "Ready" dopo ogni push della fase

### Checklist di chiusura (compilata da Claude Code, 2026-08-04)
- `npm run build` senza errori: **PASS** (nessun errore, in tutti e 3 i task della fase)
- `npm run lint` senza errori: **PASS** (nessun errore/warning)
- `npm test` verde: **PASS** (15 file di test, 66/66 test — `Galleria.test.jsx` aggiornato a 15 immagini, nessuna regressione)
- `node scripts/check-i18n-coverage.mjs`: **PASS** (nessuna stringa hardcoded su 25 file `.jsx` controllati)
- Peso `src/assets/galleria/thumb/` con 15 foto: **PASS** — 1,1 MB totali, sotto il budget ~2.5 MB
- Verifica browser headless (Playwright, installato temporaneamente via `npm install --no-save`, rimosso a verifica completata) su build locale (`vite preview`), 390×844 (mobile), 768×1024 (tablet), 1440×900 (desktop): **PASS** — 15 foto renderizzate su tutti i viewport (verificato con selettore scoped alla griglia, per non contare il logo in navbar); 3 colonne rilevate a 768px e 1440px, 1 colonna a 390px; gap orizzontale tra celle adiacenti ~0 (subpixel, 0.007–0.035px, coerente con `gap-0`); nessuno scroll orizzontale su nessun viewport; nessun errore console
- Effetto reveal con 15 foto: **PASS** — verificato con scroll incrementale (a step, non un salto istantaneo) per replicare uno scroll utente reale: tutte e 15 le celle raggiungono opacità 1 dopo essere passate nel viewport, su tutti e 3 i viewport testati. Nota tecnica: uno screenshot `fullPage` scattato dopo un salto istantaneo a fine pagina mostra le righe centrali "sbiadite" — è un artefatto della cattura `fullPage` (che include sezioni mai transitate nel viewport reale, quindi mai osservate da `IntersectionObserver`), non un difetto del sito; con scroll incrementale il comportamento è corretto
- Screenshot Galleria, desktop (1440px) e tablet (768px), con scroll incrementale: **PASS** — ispezionati visivamente, 3 colonne, celle verticali, nessun gap, nessun ritaglio evidentemente sbagliato sulla 15ª foto
- Deploy Vercel "Ready" dopo ogni push della fase (commit `aa3405e`, `e5afe9a`): **PASS** — verificato via GitHub commit status API su entrambi i push, tutti "success"
- Corrispondenza foto/posizione e giudizio sul ritaglio (`object-cover`) da un occhio umano reale, prova di scroll fluido su un telefono reale: **NON VERIFICATO** — richiede conferma di Antonino in UAT

Nota: le verifiche sopra sono state condotte da Claude Code con un browser headless (Playwright) come controllo di qualità interno, non sostituiscono lo UAT di Antonino richiesto dal processo phase-gate.
