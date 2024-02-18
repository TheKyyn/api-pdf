# Générateur de PDF avec Node.js et Docker

Ce projet est un générateur de PDF simple et efficace utilisant Node.js, Express, et Docker. Il permet aux utilisateurs de générer différents types de documents PDF, tels que des factures, des CV, et des arrêts maladie, via une interface web. L'application intègre également une base de données SQL pour stocker l'historique des PDF générés, permettant aux utilisateurs de visualiser et de supprimer des entrées historiques.

## Fonctionnalités

- Génération de documents PDF selon le choix de l'utilisateur (facture, CV, arrêt maladie).
- Interface web simple pour sélectionner le type de document à générer.
- Historique des documents PDF générés stocké dans une base de données SQL.
- Visualisation et suppression des entrées historiques via l'interface web.
- Application entièrement dockerisée pour une déploiement et exécution faciles.

## Prérequis

Avant de lancer l'application, assurez-vous que vous avez Docker et Docker Compose installés sur votre machine. Les instructions d'installation pour Docker et Docker Compose peuvent être trouvées sur le [site officiel de Docker](https://docs.docker.com/get-docker/).

## Installation et Démarrage

1. **Cloner le dépôt**

   Clonez ce dépôt sur votre machine locale en utilisant la commande suivante :

   ```sh
   git clone https://github.com/votreUsername/votreRepo.git
   cd votreRepo
   ```
2. **Lancer l'application avec Docker Compose**

   À la racine du projet, exécutez la commande suivante pour construire et démarrer l'application ainsi que la base de données :

   ```sh
   docker-compose up --build
   ```
   Une fois les conteneurs démarrés, l'application sera accessible à l'adresse http://localhost:3000.

   ## Utilisation

   Ouvrez votre navigateur et allez sur http://localhost:3000.
   
- Sélectionnez le type de document PDF que vous souhaitez générer.
- Cliquez sur le bouton Générer un PDF pour télécharger votre document.
- Cliquez sur Afficher l'historique pour voir les PDFs générés précédemment. Vous pouvez également supprimer des entrées spécifiques de l'historique.

## Technologies Utilisées

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PDFKit](http://pdfkit.org/)
- [Sequelize](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Contribution

Les contributions à ce projet sont les bienvenues. N'hésitez pas à fork le dépôt, apporter vos modifications et soumettre une pull request.
