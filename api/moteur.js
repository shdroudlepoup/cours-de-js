import { clientDB } from "../dbAccess.js";

const carburants = [ "Essence", "Gasoil", "Electricite" ]

// Pour "GET"
export const apiDisplayMoteurPorsche = async (req, res) => {
  console.log('Requete display');

  let tableRows = '';

  const resultVl = await clientDB.query('SELECT * FROM moteurporsche');
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(resultVl.rows));
};

// Pour "POST"
export const apiAddMoteurPorsche = async (req, res) => {
  console.log("Requete post", req.body)
  try {
    await clientDB.query(
      {
          text: 'INSERT INTO moteurporsche (moteur, carburant, puissance) VALUES($1, $2, $3)',
          values: [req.body.moteur, req.body.carburant, req.body.puissance]
      }
    )
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({result: true}));  // Plus court : res.json({result: true});
  } catch(error) {
    console.error('Erreur', error)
    res.status(500);
    res.send(JSON.stringify({error}));
  }
}

// Pour "DELETE"
export const apiDeleteMoteurPorsche = async (req, res) => {
  try {
    await clientDB.query(
      {
          text: 'DELETE FROM moteurporsche WHERE moteur=$1',
          values: [req.params.moteur]
      }
    )
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({result: true}));  // Plus court : res.json({result: true});
  } catch(error) {
    console.error('Erreur', error)
    res.status(500);
    res.send(JSON.stringify({error}));
  }
}

// Pour "PUT"
export const apiUpdateMoteurPorsche = async (req, res) => {
  console.log('Requete update');
  try {
    console.log('Requete update', req.body);
    await clientDB.query(
        {
        text: 'UPDATE moteurporsche SET moteur=$1, carburant=$2, puissance=$3 WHERE moteur=$4',
        values: [req.body.moteur, req.body.carburant, req.body.puissance, req.params.moteur]
        }
    )
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({result: true}));  // Plus court : res.json({result: true});
  } catch(error) {
    console.error('Erreur', error)
    res.status(500);
    res.send(JSON.stringify({error}));
  }
}