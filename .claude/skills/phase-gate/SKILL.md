---
name: phase-gate
description: Workflow a fasi per il progetto Lombardo Serramenti. Usa SEMPRE questa skill all'inizio di ogni fase di sviluppo, prima di ogni task, prima di ogni commit e prima di ogni push. Si applica ogni volta che l'utente incolla un task, chiede di iniziare una fase, chiede di committare, pushare o deployare, o quando una fase sta per concludersi.
---

# Phase Gate — Workflow Lombardo Serramenti

Il developer umano (Antonino) NON segue lo sviluppo passo-passo. Interviene SOLO alla fine di ogni fase per lo UAT. Tutto il resto deve essere automatizzato e auto-verificato.

## Regole non negoziabili

1. **Un task = un commit.** Mai mescolare due task nello stesso commit. Formato commit: `fase-N: <verbo> <cosa>` (es. `fase-2: aggiunge routing 6 pagine`).
2. **Le decisioni vivono nei docs.** Ogni scelta tecnica (libreria, struttura, integrazione) va registrata in CLAUDE.md o SPEC.md nello stesso commit in cui viene presa. Una decisione presa solo in chat non esiste.
3. **Niente segreti nel codice o in chat.** API key e credenziali solo in `.env` (già in `.gitignore`). Prima di ogni commit: verifica con `git diff --staged` che non ci siano segreti.
4. **Verifica locale prima di ogni push.** Mai dichiarare "verificato" senza aver eseguito realmente il comando di verifica e incollato l'output. Se un check non è stato eseguito, scrivi "NON VERIFICATO" esplicitamente.
5. **Dopo ogni push: conferma deploy.** Controlla che il deploy Vercel sia partito e concluso con successo prima di considerare il task chiuso.
6. **No scope creep.** Se durante un task emerge qualcosa di utile ma fuori recinzione, NON implementarlo: annotalo in SPEC.md sezione "Backlog" e prosegui.

## Apertura di fase (obbligatorio)

Prima di scrivere qualsiasi codice della fase, produci un blocco `## Fase N — Contratto` in SPEC.md con:

- **Cosa aspettarsi a fine fase:** elenco concreto e osservabile (es. "le 6 pagine navigabili su URL distinti").
- **Come Antonino testa:** passi manuali espliciti, dal punto di vista utente, senza conoscenze tecniche richieste (es. "apri <url>, clicca su Galleria, verifica che le foto si vedano su mobile").
- **Verifiche automatiche:** i comandi/test che TU esegui prima di dichiarare la fase pronta (build, lint, smoke test, E2E dove previsti).

## Chiusura di fase (obbligatorio)

1. Esegui tutte le verifiche automatiche del contratto e riporta l'output reale.
2. Compila la checklist del contratto: ogni voce marcata PASS / FAIL / NON VERIFICATO.
3. Produci il messaggio "Fase N pronta per UAT" con: URL da testare, passi di test per Antonino, limiti noti.
4. NON iniziare la fase successiva finché Antonino non ha approvato lo UAT.

## Auto-verifica minima per ogni task

- `npm run build` passa senza errori
- smoke test passa (dalla Fase 2 in poi)
- nessun file segreto in staging
- CLAUDE.md/SPEC.md aggiornati se il task ha preso decisioni
