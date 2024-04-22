import { clientDB } from "./dbAccess.js";

export const displayGammeporsche = async (req, res) => {
  console.log('Requete display');

  const resultMoteurs = await clientDB.query('SELECT moteur FROM moteurporsche');
  const selectMoteur = (moteur) => {
    let selectHTML = '<select name="moteur">';
    resultMoteurs.rows.forEach(row => {
      selectHTML += `<option value="${row.moteur}"`;
      if (row.moteur == moteur) selectHTML += 'selected'
      selectHTML += `>${row.moteur}</option>`;
    });
    selectHTML += '</select>';
    return selectHTML
  }
  
  const result = await clientDB.query('select * from gammeporsche order by modele;');

  let tableRows = '';

  /* Lancer une requete pour avoir la liste des moteurs
  
  Puis, créer une nouvelle variable contenant d'abord <select name="moteur">
  Pour chaque moteur trouvé dans la base de données, ajouter <option value="${ligne.moteur}">${ligne.moteur}</option> à cette nouvelle chaîne de caractère
  A la fin, ajouter </select>


  Ensuite remplacer le <input name="moteur" ...> par ${nouvelleChaine}
  */
  const resultVl = await clientDB.query('SELECT * FROM gammeporsche');
  resultVl.rows.forEach(row => {
    
    tableRows += `<form method="POST">
      <input type="hidden" name="update" value="1" />
      <input type="hidden" name="ancienmodele" value="${row.modele}" /></td>
      <tr>
        <td><input name="modele" value="${row.modele}" /></td>
        <td>${selectMoteur(row.moteur)}</td> <!-- Remplacer le champ d'entrée du moteur par nouvelleChaine -->
        <td><input name="puissance" value="${row.puissance}" /></td>
        <td><button type="submit">Sauvegarde ligne</button></td>
        <td><button onclick="efface('${row.modele}','${row.moteur}','${row.puissance}')">Boom</button></td>
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
          <th>Modele</th>
          <th>Moteur</th>
          <th>Puissance</th>
        </tr>
        ${tableRows}
      </table>
      <h1>Ajouter un modele</h1>
      <form method="POST">
        <label>Modele<input name="modele" /></label>
        ${selectMoteur()} <!-- Ajout du select ici -->
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
  </html>
  `);
  
};
   
export const updateGammePorsche = async (req, res) => {
  console.log('Requete update');
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
  }
