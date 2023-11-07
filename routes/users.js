const express = require("express");
const router = express.Router();

module.exports = (dbPool) => {
    router.get("/", (req, res) => {
        dbPool.getConnection((err, connection) => {
            if (err) {
                console.error("Erreur de connexion à la base de données : " + err);
                res.status(500).send("Erreur de base de données");
            } else {
                connection.query("SELECT * FROM users", (err, rows, fields) => {
                    connection.release();
                    if (err) {
                        console.error("Erreur lors de la requête : " + err);
                        res.status(500).send("Erreur de base de données");
                    } else {
                        const htmlPage = `
                        <html>
                        <head>
                            <title>Liste des utilisateurs</title>
                        </head>
                        <body>
                            <h1>Liste des utilisateurs</h1>
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Age</th>
                                </tr>
                                ${rows.map(user => `
                                    <tr>
                                        <td>${user.users_id}</td>
                                        <td>${user.nom}</td>
                                        <td>${user.prenom}</td>
                                        <td>${user.age}</td>
                                    </tr>
                                `).join('')}
                            </table>
                            <br>
                            <a href="/">Retour à l'accueil</a>
                        </body>
                    </html>
                        `;
    
                        // définition l'en-tête Content-Type pour indiquer qu'on du HTML
                        res.setHeader('Content-Type', 'text/html');
    
                        // on renvoie la page html
                        res.send(htmlPage);
                    }
                });
            }
        });
    });

    return router;
};