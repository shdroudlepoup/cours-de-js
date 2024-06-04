import { clientDB } from "../dbAccess.js";

const carburants = ["Essence", "Gasoil", "Electricite"];


export const apiDisplayGammeporsche = async (req, res) => {
  console.log('Request display');

  let tableRows = '';

  const resultVl = await clientDB.query('SELECT * FROM gammeporsche');
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(resultVl.rows));
};


export const apiAddGammeporsche = async (req, res) => {
  console.log("Request post", req.body);
  try {
    await clientDB.query(
      {
        text: 'INSERT INTO gammeporsche (modele, moteur, puissance) VALUES($1, $2, $3)',
        values: [req.body.modele, req.body.moteur, req.body.puissance]
      }
    )
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({ result: true }));
  } catch (error) {
    console.error('Error', error)
    res.status(500);
    res.send(JSON.stringify({ error }));
  }
};


export const apiDeleteGammeporsche = async (req, res) => {
  try {
    await clientDB.query(
      {
      text: 'DELETE FROM gammeporsche WHERE modele=$1',
      values: [req.params.modele]
    }
  )
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({ result: true }));
  } catch (error) {
    console.error('Error', error)
    res.status(500);
    res.send(JSON.stringify({ error }));
  }
}


export const apiUpdateGammeporsche = async (req, res) => {
  console.log('Request update');
  try {
    console.log('Request update', req.body);
    await clientDB.query(
      {
      text: 'UPDATE gammeporsche SET moteur=$1, puissance=$2 WHERE modele=$3',
      values: [req.body.moteur, req.body.puissance, req.params.modele]
    }
  )
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({ result: true }));
  } catch (error) {
    console.error('Error', error);
    res.status(500);
    res.send(JSON.stringify({ error }));
  }
}