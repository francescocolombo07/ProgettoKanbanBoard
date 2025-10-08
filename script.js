document.addEventListener('DOMContentLoaded', () => {
    // Riferimenti agli elementi del DOM (la nostra interfaccia)
    const columns = {
        backlog: document.getElementById('backlog'),
        inprogress: document.getElementById('inprogress'),
        review: document.getElementById('review'),
        done: document.getElementById('done')
    };
    const formNuovaIssue = document.getElementById('form-nuova-issue');
    const modal = document.getElementById('modal_nuova_issue');

    // La nostra "fonte di verità": un array che contiene tutte le issue.
    // Lo carichiamo dal localStorage o, se non c'è, partiamo con un array vuoto.
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

    // Funzione per "disegnare" le issue sulla board
    const renderIssues = () => {
        // 1. Svuotiamo tutte le colonne per evitare duplicati
        Object.values(columns).forEach(column => column.innerHTML = '');

        // 2. Per ogni issue nel nostro array, creiamo l'HTML corrispondente
        issues.forEach(issue => {
            const issueElement = document.createElement('div');
            issueElement.className = 'card bg-base-200 shadow-md p-4 space-y-3';
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
                    <!-- Il pulsante di eliminazione verrà aggiunto in un commit successivo -->
                </div>
            `;

            // 3. Aggiungiamo la card appena creata alla colonna giusta
            columns[issue.status].appendChild(issueElement);
        });
    };
    
    // Gestore per l'invio del modulo di creazione
    formNuovaIssue.addEventListener('submit', (e) => {
        e.preventDefault(); // Impedisce al browser di ricaricare la pagina

        // Creiamo un nuovo oggetto 'issue' con i dati del form
        const newIssue = {
            id: `issue-${Date.now()}`, // ID unico basato sul timestamp
            title: document.getElementById('issue-titolo').value,
            description: document.getElementById('issue-descrizione').value,
            assignee: document.getElementById('issue-assegna').value,
            priority: document.getElementById('issue-priorita').value,
            status: 'backlog' // Le nuove issue partono sempre da qui
        };

        issues.push(newIssue); // Aggiungiamo la nuova issue al nostro array
        saveIssues();         // Salviamo l'array aggiornato nel localStorage
        renderIssues();       // Ridisegnamo la board per mostrare la novità
        
        formNuovaIssue.reset(); // Svuotiamo il form
        modal.close();          // Chiudiamo il pop-up
    });

    // Prima esecuzione al caricamento della pagina per mostrare le issue salvate
    renderIssues();
});
