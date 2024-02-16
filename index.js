const express = require('express');
const app = express();
const PORT = 3000;
const PDFDocument = require('pdfkit');
const fs = require('fs');

app.get('/', (req, res) => {
    res.send('Weeee saluuuut');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.get('/generate-pdf', (req, res) => {
    const doc = new PDFDocument();

    let filename = 'Document';
    filename = encodeURIComponent(filename) + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.text('Saluuuut, ceci est un exemple de PDF test pour savoir si tout marche bien hihi', 100, 100);

    doc.pipe(res);
    doc.end();
});