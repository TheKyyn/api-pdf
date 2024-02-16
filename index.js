const express = require('express');
const app = express();
const PORT = 3000;
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.send('Weeee saluuuut');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.get('/generate-pdf', (req, res) => {
    const type = req.query.type;
    const doc = new PDFDocument();
    let filename = 'Document';
    switch (type) {
        case 'invoice':
            filename = 'Facture';
            doc.text('Ceci est une facture.', 100, 100);
            break;
        case 'resume':
            filename = 'CV';
            doc.text('Ceci est un CV.', 100, 100);
            break;
        case 'sickLeave':
            filename = 'Arrêt Maladie';
            doc.text('Ceci est un arrêt maladie.', 100, 100);
            break;
        default:
            doc.text('Type de document non spécifié.', 100, 100);
    }
    filename = encodeURIComponent(filename) + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);
    doc.end();
});