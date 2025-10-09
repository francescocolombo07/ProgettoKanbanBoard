# 📌 Progetto Kanban Board


https://github.com/user-attachments/assets/975f56ac-3642-4ee9-bcad-4e4e1388f8ef


Una semplice **Web App** per la gestione di *issue* tramite una **Kanban board** interattiva.

> ⚠️ **Attenzione:** Questo progetto è concepito esclusivamente a scopo dimostrativo e non dovrebbe essere utilizzato in produzione, specialmente per la gestione di dati sensibili. Ulteriori dettagli più in basso.

---

## 🚀 Funzionalità

- ✏️ Creazione di nuove issue tramite il form dedicato
- 📋 Visualizzazione e organizzazione delle issue in una classica **Kanban board** con 4 colonne:
  - Backlog
  - In Progress
  - Review
  - Done
- 🔄 Spostamento dinamico delle issue tra colonne (drag & drop)
- ❌ Eliminazione delle issue
- 💾 Salvataggio automatico su `localStorage` per mantenere lo stato anche dopo il riavvio dell'applicazione

---

## 🧠 Tecnologie utilizzate

- **HTML5**
- **CSS3**
- **JavaScript (vanilla)**  
- **LocalStorage API**

---

## 🛑 Limitazioni e sicurezza

Questa applicazione salva i dati nel browser tramite `localStorage`, una tecnica semplice ma **non sicura** per la persistenza dei dati.  
Ecco alcune limitazioni e problematiche da considerare:

- ❗️I dati non sono criptati: chiunque abbia accesso al browser può leggerli.
- ❗️`localStorage` è vulnerabile a XSS (Cross-Site Scripting), se l'applicazione non è protetta adeguatamente.
- ❗️I dati sono salvati **solo localmente**: non vengono sincronizzati tra dispositivi o browser diversi.

Per questi motivi, **questa applicazione non è adatta all'uso in ambienti di produzione**, né per la gestione di dati riservati o critici.

---

## 📂 Struttura della board

Ogni issue può essere trascinata liberamente tra le seguenti colonne, rappresentando il flusso di lavoro tipico:

-  [Backlog] → [In Progress] → [Review] → [Done]

