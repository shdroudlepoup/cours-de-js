import express, { application } from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
const { Client } = pg;

// COnnexion à la base de données, une fois pour toute
const clientDB = new Client({
    user: 'remig',
    database: 'remig',
    password: '0747',
});

clientDB.connect();

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

// Code Remi
app.get('/', (req, res) => {
    res.send(`<html>
    <body>
        Hello <b>world</b>
    </body>
    </html>`)
});

// Code exemple: il est executé chaque fois que quelqu'un va sur http://172.18.126.3:3000/toto
app.get('/toto', async (req, res) => {
    // Récupération des données
    const result = await clientDB.query('select * from gammeporsche join moteurporsche ON gammeporsche.moteur=moteurporsche.moteur join typevoiture on moteurporsche.carburant=typevoiture.carburant;');
    // Fabrication de la sous-partie HTML que je stocke dans tableRows
    let tableRows = '';
    // Parcours des resultats
    result.rows.forEach(row => {
        // Pour chaque ligne de résultat j'ajoute une ligne dans tableRows
        tableRows += `<tr><td>${row.modele}</td><td>${row.moteur}</td></tr>`;
    });

    // A la fin, envoyer le code HTML en y insérant ma variable tableRows
    res.send(`<html>
      <body>
        Hello <b>toto</b>
        <table>
          <tr>
            <th>Modele</th>
            <th>Moteur</th>
          </tr>
          ${tableRows}
        </table>
      </body>
    </html>`)
})

const displayMoteur = async (req, res) => {
    const result = await clientDB.query('select * from moteurporsche order by moteur;');
    let tableRows = '';
    result.rows.forEach(row => {
        tableRows += `<tr><td>${row.moteur}</td><td>${row.carburant}</td><td>${row.puissance}</td></tr>`;
    });

    res.send(`<html>
    <body>
        Hello <b>toto</b>
        <table>
          <tr>
            <th>Moteur</th>
            <th>Carburant</th>
            <th>Puissance</th>
          </tr>
          ${tableRows}
        </table>
        <h1>Ajouter un moteur</h1>
        <form method="POST">
          <label>Moteur<input name="moteur" /></label>
          <label>Carburant<input name="carburant" /></label>
          <label>Puissance<input name="puissance" /></label>
          <button type="submit">OK</button>
        </form>
    </body>
    </html>`)
};

app.get('/moteur', async (req, res) => {await displayMoteur(req,res)})

app.post('/moteur', async (req, res) => {
    // Récupérer les données et les insérer dans la base
    await clientDB.query(
        {
            text: 'INSERT INTO moteurporsche (moteur, carburant, puissance) VALUES($1, $2, $3)',
            values: [req.body.moteur, req.body.carburant, req.body.puissance]
        }
    )
    //console.log(req.body, `${req.body.moteur}`);

    // Puis afficher la page "moteur"
    await displayMoteur(req,res)
})

console.log('Listen on port 3000');
app.listen(3000);