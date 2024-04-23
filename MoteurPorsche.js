import { clientDB } from "./dbAccess.js";

const carburants = [ "Essence", "Gasoil", "Electricite" ]

export const displayMoteurPorsche = async (req, res) => {
  console.log('Requete display');

  const selectCarburant = (carburant) => {
    let selectHTML = '<select name="carburant">';
    carburants.forEach(val => {
      selectHTML += `<option value="${val}"`;
      if (carburant == val) selectHTML += ' selected'
      selectHTML += `>${val}</option>`;
    });
    selectHTML += '</select>';
    return selectHTML
  }
  
  const result = await clientDB.query('select * from moteurporsche order by moteur;');

  let tableRows = '';

  const resultVl = await clientDB.query('SELECT * FROM moteurporsche');
  resultVl.rows.forEach(row => {
    
    tableRows += `<form method="POST">
      <input type="hidden" name="update" value="1" />
      <input type="hidden" name="ancienmoteur" value="${row.moteur}" /></td>
      <tr>
        <td><input name="moteur" value="${row.moteur}" /></td>
        <td>${selectCarburant(row.carburant)}</td>
        <td><input name="puissance" value="${row.puissance}" /></td>
        <td><button type="submit">Sauvegarde ligne</button></td>
        <td><button onclick="efface('${row.moteur}','${row.carburant}','${row.puissance}')">Boom</button></td>
      </tr>
    </form>
    `;
  });
  res.send(`
  <html>
  <body>
      Hello <b>toto</b>
      <table>
        <tr>
          <th>moteur</th>
          <th>carburant</th>
          <th>Puissance</th>
        </tr>
        ${tableRows}
      </table>
      <h1>Ajouter un moteur</h1>
      <form method="POST">
        <label>moteur<input name="moteur" /></label>
        ${selectCarburant()} <!-- Ajout du select ici -->
        <label>Puissance<input name="puissance" /></label>
        <button type="submit">OK</button>
      </form>
  </body>
  <script>
  function efface(moteur, carburant, puissance) {
    console.log('Efface'),
    fetch('/moteurporsche', {
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
  </html>
  `);
  
};

export const updateMoteurPorsche = async (req, res) => {
  console.log('Requete update');
    try {
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
            values: [req.body.moteur, req.body.carburant, req.body.puissance, req.body.ancienmoteur]
          }
        )
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
      res.redirect('/moteurporsche');
    } catch(error) {
      console.error('Erreur', error)
      res.send(`
        <html>
          <body>
            Une erreur est survenue.<br/>
            <a href="/moteurporsche">Continuer</a>
          </body>
        </html>
      `);
    }
  }