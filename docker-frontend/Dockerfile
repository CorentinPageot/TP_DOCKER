# image Node.js version 18.15
FROM node:18.15

# répertoire de travail de l'appli
WORKDIR /app

# on copie les fichiers package.json et package-lock.json dans le conteneur
# et cela avant d'éxécuter npm install
COPY ./package*.json ./

# installation des dépendances
RUN npm install

# on copie le reste de l'appli dans le conteneur
COPY . .

# le port sur lequel l'appli écoute
EXPOSE 3000

# commande pour démarrer l'appli
CMD ["npm", "start"]