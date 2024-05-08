import { clientDB } from "../dbAccess.js";

const carburants = [ "Essence", "Gasoil", "Electricite" ]

export const apiDisplayMoteurPorsche = async (req, res) => {
  console.log('Requete display');

  let tableRows = '';

  const resultVl = await clientDB.query('SELECT * FROM moteurporsche');
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(resultVl.rows));
};

export const apiUpdateMoteurPorsche = async (req, res) => {
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
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({result: true}));
  } catch(error) {
    console.error('Erreur', error)
    res.status(500);
    res.send(JSON.stringify({error}));
  }
}