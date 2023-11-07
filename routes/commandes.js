const express = require("express");
const router = express.Router();

module.exports = (dbPool) => {
    router.get("/", (req, res) => {
        dbPool.getConnection((err, connection) => {
            if (err) {
                console.error("Erreur de connexion à la base de données : " + err);
                res.status(500).send("Erreur de base de données");
            } else {
                connection.query("SELECT commandes.commandes_id, users.users_id, users.nom AS user_nom, produits.produits_id, produits.nom AS produit_nom FROM commandes JOIN users ON commandes.users_id = users.users_id JOIN produits ON commandes.produits_id = produits.produits_id", (err, rows, fields) => {
                    connection.release();
                    if (err) {
                        console.error("Erreur lors de la requête : " + err);
                        res.status(500).send("Erreur de base de données");
                    } else {
                        // Générez une page HTML avec les données des commandes
                        const htmlPage = `
                            <html>
                                <head>
                                    <title>Liste des commandes</title>
                                </head>
                                <body>
                                    <h1>Liste des commandes</h1>
                                    <table>
                                        <tr>
                                            <th>ID de la Commande</th>
                                            <th>ID du User</th>
                                            <th>Nom du User</th>
                                            <th>ID du Produit</th>
                                            <th>Nom du produit</th>
                                        </tr>
                                        ${rows.map(commande => `
                                            <tr>
                                                <td>${commande.commandes_id}</td>
                                                <td>${commande.users_id}</td>
                                                <td>${commande.user_nom}</td>
                                                <td>${commande.produits_id}</td>
                                                <td>${commande.produit_nom}</td>
                                            </tr>
                                        `).join('')}
                                    </table>
                                    <br>
                                    <a href="/">Retour à l'accueil</a>
                                </body>
                            </html>
                        `;
    
                        // Définissez l'en-tête Content-Type pour indiquer que vous renvoyez du HTML
                        res.setHeader('Content-Type', 'text/html');
    
                        // Renvoyez la page HTML
                        res.send(htmlPage);
                    }
                });
            }
        });
    });

    return router;
};