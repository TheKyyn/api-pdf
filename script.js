document.getElementById('pdfForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const documentType = document.getElementById('documentType').value;
    fetch(`http://localhost:3000/generate-pdf?type=${documentType}`)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${documentType}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            console.log("PDF généré et enregistré dans la base de données");
        })
        .catch(error => console.error('Erreur lors de la génération du PDF:', error));
});

let isHistoryVisible = false;

document.getElementById('showHistory').addEventListener('click', function () {
    isHistoryVisible = !isHistoryVisible; // Bascule l'état
    if (isHistoryVisible) {
        document.getElementById('historyList').style.display = 'block';
        loadHistory();
    } else {
        document.getElementById('historyList').style.display = 'none';
    }
});

function loadHistory() {
    fetch('http://localhost:3000/history')
        .then(response => response.json())
        .then(data => {
            const historyList = document.getElementById('historyList');
            historyList.innerHTML = '';
            data.forEach(pdf => {
                const listItem = document.createElement('li');
                listItem.textContent = `${pdf.filename} - ${new Date(pdf.createdAt).toLocaleString()}`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '❌';
                deleteButton.addEventListener('click', function () { deletePDF(pdf.id); });
                listItem.appendChild(deleteButton);
                historyList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erreur lors du chargement de l\'historique:', error));
}

function deletePDF(pdfId) {
    fetch(`http://localhost:3000/delete-pdf/${pdfId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                console.log("PDF supprimé avec succès");
                loadHistory();
            }
        })
        .catch(error => console.error('Erreur lors de la suppression du PDF:', error));
}
