const express = require('express');
const app = express();
const PORT = 3000;
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sequelize = require('./models/database');
const PDF = require('./models/pdfModel');

app.use(express.static(path.join(__dirname, '.')));

sequelize.sync().then(() => console.log('La DB est prête *chef\'s kiss*'));

app.get('/', (req, res) => {
    res.send('Weeee saluuuut');
});

app.get('/generate-pdf', async (req, res) => {
    const type = req.query.type;
    const doc = new PDFDocument();
    let filename = 'Document';
    let displayFilename = '';

    switch (type) {
        case 'invoice':
            filename = 'Facture';
            displayFilename = 'Facture';
            doc.text('Ceci est une facture.', 100, 100);
            break;
        case 'resume':
            filename = 'CV';
            displayFilename = 'CV';
            doc.text('Ceci est un CV.', 100, 100);
            break;
        case 'sickLeave':
            filename = 'Arrêt Maladie';
            displayFilename = 'Arrêt Maladie';
            doc.text('Ceci est un arrêt maladie.', 100, 100);
            break;
        default:
            doc.text('Type de document non spécifié.', 100, 100);
    }


    try {
        const newPdf = await PDF.create({
            filename: displayFilename,
            type: type,
            createdAt: new Date()
        });
        console.log("PDF généré et enregistré dans la base de données:", newPdf.toJSON());
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement dans la base de données:', error);
    }

    filename = encodeURIComponent(filename) + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);
    doc.end();
});

app.get('/history', async (req, res) => {
    const pdfs = await PDF.findAll();
    res.json(pdfs);
});

app.delete('/delete-pdf/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await PDF.destroy({ where: { id } });
        res.status(200).send('PDF supprimé avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression du PDF:', error);
        res.status(500).send('Erreur lors de la suppression du PDF');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
