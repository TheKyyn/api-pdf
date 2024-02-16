document.getElementById('pdfForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const documentType = document.getElementById('documentType').value;
    window.open(`http://localhost:3000/generate-pdf?type=${documentType}`, '_blank');
});
