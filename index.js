const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT || 5000;
const app = express();

// config connexion à la bdd
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tp_docker'
};

// connexion pool pour gérer les connexions à la bdd
const dbPool = mysql.createPool(dbConfig);

app.get("/", (req, res) => {
    res.send(`
        <h1>TP Docker</h1>
        <a href="/users"><button>Voir les utilisateurs</button></a>
        <a href="/produits"><button>Voir les produits</button></a>
        <a href="/commandes"><button>Voir les commandes</button></a>
    `);
});

// les routes
app.use("/users", require("./routes/users")(dbPool));
app.use("/produits", require("./routes/produits")(dbPool));
app.use("/commandes", require("./routes/commandes")(dbPool));

app.listen(port, (err) => {
    console.log("Serveur en ligne");
});