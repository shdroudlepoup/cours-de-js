import { clientDB } from "../dbAccess.js";

export const apiDisplayGammeporsche = async (req, res) => {
  console.log('Requete display');

  let tableRows = '';

  const resultVl = await clientDB.query('SELECT * FROM gammeporsche');
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(resultVl.rows));
};

export const apiUpdateGammeporsche = async (req, res) => {
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
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({result: true}));  // Plus court : res.json({result: true});
  } catch(error) {
    console.error('Erreur', error)
    res.status(500);
    res.send(JSON.stringify({error}));
  }
}