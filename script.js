document.addEventListener('DOMContentLoaded', () => {
    // Riferimenti agli elementi del DOM
    const columns = {
        backlog: document.getElementById('backlog'),
        inprogress: document.getElementById('inprogress'),
        review: document.getElementById('review'),
        done: document.getElementById('done')
    };
    const formNuovaIssue = document.getElementById('form-nuova-issue');
    const modal = document.getElementById('modal_nuova_issue');

    // Caricamento da localStorage o, se non c'è, inizializzazione di un array vuoto.
    let issues = JSON.parse(localStorage.getItem('kanban_issues')) || [];

    // Oggetto di configurazione per stili e testi delle priorità
    const priorityStyles = {
        low: { text: 'Bassa', class: 'badge-success' },
        medium: { text: 'Media', class: 'badge-warning' },
        high: { text: 'Alta', class: 'badge-error' },
        critical: { text: 'Critica', class: 'badge-neutral text-white' }
    };

    // Funzione per salvare l'array 'issues' nel localStorage del browser
    const saveIssues = () => {
        localStorage.setItem('kanban_issues', JSON.stringify(issues));
    };

    // Funzione per disegnare le issue sulla board
    const renderIssues = () => {
        // 1. Inizializzazione delle colonne per evitare duplicati
        Object.values(columns).forEach(column => column.innerHTML = '');

        // 2. Per ogni issue nell'array, creazione dell'HTML corrispondente
        issues.forEach(issue => {
            const issueElement = document.createElement('div');
            // Definizione della card con classi di stile e la classe per il drag-and-drop
            issueElement.className = 'card bg-base-200 shadow-md p-4 space-y-3 cursor-grab';
            issueElement.setAttribute('data-id', issue.id); // ID per identificarla dopo

            const priority = priorityStyles[issue.priority] || priorityStyles.medium;

            issueElement.innerHTML = `
                <div class="flex justify-between items-start">
                    <h3 class="font-bold text-base">${issue.title}</h3>
                    <span class="badge ${priority.class} text-xs font-semibold">${priority.text}</span>
                </div>
                <p class="text-sm text-gray-600">${issue.description}</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-sm font-medium">${issue.assignee}</span>
                    <button class="btn btn-xs btn-ghost text-error" onclick="deleteIssue('${issue.id}')">Elimina</button>
                </div>
            `;

            // 3. Aggiunta della card alla colonna corretta
            columns[issue.status].appendChild(issueElement);
        });
    };

    // Gestore per l'invio del modulo di creazione
    formNuovaIssue.addEventListener('submit', (e) => {
        e.preventDefault(); // Impedisce al browser di ricaricare la pagina

        // Creazione di un nuovo oggetto 'issue' con i dati del form
        const newIssue = {
            id: `issue-${Date.now()}`, // ID unico basato sul timestamp
            title: document.getElementById('issue-titolo').value,
            description: document.getElementById('issue-descrizione').value,
            assignee: document.getElementById('issue-assegna').value,
            priority: document.getElementById('issue-priorita').value,
            status: 'backlog' // 'backlog' è lo stato iniziale
        };

        issues.push(newIssue); // Aggiunta della issue all'array
        saveIssues();         // Salvataggio nel localStorage
        renderIssues();       // Aggiornamento della board

        formNuovaIssue.reset(); // Svuotamento del form
        modal.close();          // Chiusura del pop-up
    });

    window.deleteIssue = (issueId) => {
        issues = issues.filter(issue => issue.id !== issueId);
        saveIssues();
        renderIssues();
    };

    // Inizializzazione delle colonne drag-and-drop con SortableJS
    Object.values(columns).forEach(column => {
        new Sortable(column, {
            group: 'kanban-board',
            animation: 150,
            onEnd: (evt) => {
                const issueId = evt.item.dataset.id;
                const newStatus = evt.to.id;
                const issue = issues.find(i => i.id === issueId);
                if (issue) {
                    issue.status = newStatus;
                    saveIssues();
                    // Non serve rirenderizzare, SortableJS ha già aggiornato il DOM
                }
            }
        });
    });


    // Prima esecuzione al caricamento della pagina per mostrare le issue salvate
    renderIssues();
});
