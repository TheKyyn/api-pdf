# image de base (img officielle de node)
FROM node:14

# repertoir de travail
WORKDIR /app

# fichiers et dépendances que l'on copie
COPY package*.json ./
RUN npm install

# le reste des fichiers
COPY . .

# le port d'execution
EXPOSE 3000

# la commande pour lancer l'app
CMD ["node", "index.js"]
