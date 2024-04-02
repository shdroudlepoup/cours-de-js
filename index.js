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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

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
  const result = await clientDB.query('SELECT * FROM moteurporsche ORDER BY moteur;');
  // Fabrication de la sous-partie HTML que je stocke dans tableRows
  let tableRows = '';
  // Parcours des resultats
  result.rows.forEach(row => {
      // Pour chaque ligne de résultat j'ajoute une ligne dans tableRows
      tableRows += `<tr><td>${row.moteur}</td><td>${row.carburant}</td><td>${row.puissance}</td></tr>`;
  });

  // A la fin, envoyer le code HTML en y insérant ma variable tableRows
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
    </body>
  </html>`)
})

const displayMoteur = async (req, res) => {
  console.log('Requete display');
    const result = await clientDB.query('select * from moteurporsche order by moteur;');
    let tableRows = '';
    result.rows.forEach(row => {
      tableRows += `<form method="POST">
        <input type="hidden" name="update" value="1" />
        <input type="hidden" name="anciennom" value="${row.moteur}" /></td>
        <tr>
          <td><input name="moteur" value="${row.moteur}" /></td>
          <td><input name="carburant" value="${row.carburant}" /></td>
          <td><input name="puissance" value="${row.puissance}" /></td>
          <td><button type="submit">Sauvegarde ligne</button></td>
          <td><button onclick="efface('${row.moteur}','${row.carburant}','${row.puissance}')">Boom</button></td>
        </tr>
      </form>
      `;
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
    <script>
    function efface(moteur, carburant, puissance) {
      console.log('Efface'),
      fetch('/moteur', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:  JSON.stringify({
          delete: 1,
          moteur,
          carburant,
          puissance,
        })
      }).then((resultat) => {
        console.log('end of fetch');
        location.reload();
      })
    }
    </script>
    </html>`)
};

app.get('/moteur', async (req, res) => {
    // Récupérer les données et les insérer dans la base
    /* Le formulaire peut faire du GET
    await clientDB.query(
      {
          text: 'INSERT INTO moteurporsche (moteur, carburant, puissance) VALUES($1, $2, $3)',
          values: [req.query.moteur, req.query.carburant, req.query.puissance]
      }
      
    )*/
  await displayMoteur(req,res)
})

app.post('/moteur', async (req, res) => {
  try {
    // Récupérer les données et les insérer dans la base
    if (req.body.delete) {
      console.log('Requete DELETE');
      await clientDB.query(
        {
            text: 'DELETE FROM moteurporsche WHERE moteur=$1 AND carburant=$2 AND puissance=$3',
            values: [req.body.moteur, req.body.carburant, req.body.puissance]
        }
      )
    }
    else if (req.body.update) {
      console.log('Requete update', req.body);
      await clientDB.query(
        {
          text: 'UPDATE moteurporsche SET moteur=$1, carburant=$2, puissance=$3 WHERE moteur=$4',
          values: [req.body.moteur, req.body.carburant, req.body.puissance, req.body.anciennom]
        }
      )
      // Update
    }
    else if ( req.body.moteur && req.body.carburant && req.body.puissance) {
      console.log('Requete AJOUTE');
      await clientDB.query(
          {
              text: 'INSERT INTO moteurporsche (moteur, carburant, puissance) VALUES($1, $2, $3)',
              values: [req.body.moteur, req.body.carburant, req.body.puissance]
          }
      )
    }
    else {
      console.log('RIEN', req.body)
    }
    //console.log(req.body, `${req.body.moteur}`);

    // Puis afficher la page "moteur"
    //await displayMoteur(req,res)

    // A la place, on dit au navigateur de réafficher
    res.redirect('/moteur');
  } catch(error) {
    console.error('Erreur', error)
    res.send(`
      <html>
        <body>
          Une erreur est survenue.<br/>
          <a href="/moteur">Continuer</a>
        </body>
      </html>
    `);
  }
})

/*
  TODO:

  * ne pas changer /moteur
  * faire une autre URL /voitures qui fait la même chose que /moteur mais sur la table "gammeporsche"
  * exercice suivant (qu'on fera ensemble), le champ "moteur" de la page /voitures sera un <input type="select"> utilisant les moteurs de la table "moteurporsche"
*/

const displayGammeporsche = async (req, res) => {
  console.log('Requete display');
  const result = await clientDB.query('select * from gammeporsche order by modele;');
  let tableRows = '';
  result.rows.forEach(row => {
    tableRows += `<form method="POST">
      <input type="hidden" name="update" value="1" />
      <input type="hidden" name="ancienmodele" value="${row.modele}" /></td>
      <tr>
        <td><input name="modele" value="${row.modele}" /></td>
        <td><input name="moteur" value="${row.moteur}" /></td>
        <td><input name="puissance" value="${row.puissance}" /></td>
        <td><button type="submit">Sauvegarde ligne</button></td>
        <td><button onclick="efface('${row.modele}','${row.moteur}','${row.puissance}')">Boom</button></td>
      </tr>
    </form>
    `;
  });

  res.send(`<html>
  <body>
      Hello <b>toto</b>
      <table>
        <tr>
          <th>Modele</th>
          <th>Moteur</th>
          <th>Puissance</th>
        </tr>
        ${tableRows}
      </table>
      <h1>Ajouter un modele</h1>
      <form method="POST">
        <label>Modele<input name="modele" /></label>
        <label>Moteur<input name="moteur" /></label>
        <label>Puissance<input name="puissance" /></label>
        <button type="submit">OK</button>
      </form>
  </body>
  <script>
  function efface(modele, moteur, puissance) {
    console.log('Efface'),
    fetch('/gammeporsche', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:  JSON.stringify({
        delete: 1,
        modele,
        moteur,
        puissance,
      })
    }).then((resultat) => {
      console.log('end of fetch');
      location.reload();
    })
  }
  </script>
  </html>`)
};

app.get('/gammeporsche', async (req, res) => {
  await displayGammeporsche(req,res)
})

app.post('/gammeporsche', async (req, res) => {
  try {
    if (req.body.delete) {
      console.log('Requete DELETE');
      await clientDB.query(
        {
            text: 'DELETE FROM gammeporsche WHERE modele=$1 AND moteur=$2 AND puissance=$3',
            values: [req.body.modele, req.body.moteur, req.body.puissance]
        }
      )
    }
    else if (req.body.update) {
      console.log('Requete update', req.body);
      await clientDB.query(
        {
          text: 'UPDATE gammeporsche SET modele=$1, moteur=$2, puissance=$3 WHERE modele=$4',
          values: [req.body.modele, req.body.moteur, req.body.puissance, req.body.ancienmodele]
        }
      )
    }
    else if ( req.body.modele && req.body.moteur && req.body.puissance) {
      console.log('Requete AJOUTE');
      await clientDB.query(
          {
              text: 'INSERT INTO gammeporsche (modele, moteur, puissance) VALUES($1, $2, $3)',
              values: [req.body.modele, req.body.moteur, req.body.puissance]
          }
      )
    }
    else {
      console.log('RIEN', req.body)
    }
    res.redirect('/gammeporsche');
  } catch(error) {
    console.error('Erreur', error)
    res.send(`
      <html>
        <body>
          Une erreur est survenue.<br/>
          <a href="/gammeporsche">Continuer</a>
        </body>
      </html>
    `);
  }
})

console.log('Listen on port 3000');
app.listen(3000);