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
  console.log("Requête POST", req.body);
  try {
    const moteurExisteQuery = {
      text: 'SELECT COUNT(*) FROM moteurporsche WHERE moteur = $1',
      values: [req.body.moteur]
    };
    
    try {
      const moteurExisteResult = await clientDB.query(moteurExisteQuery);
      const moteurExisteCount = moteurExisteResult.rows[0].count;
    
      if (moteurExisteCount > 0) {
        console.log('Le moteur existe dans la table moteurporsche.');
       
      } else {
        console.log('Le moteur n\'existe pas dans la table moteurporsche.');
        // ET donc, on continue quand même ??? Non, faut rejeter la requête
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du moteur :', error);
      
    }

    
    // Exemple d'un meilleur contrôle ici: que 1 à 25 caractères autorisés (lettres chiffres espaces et tirets)
    // if (!req.body.modele || typeof req.body.modele !== 'string' || /^[A-Za-z0-9 -]{1,25}$/.test(req.body.modele) )
  
    if (!req.body.modele || typeof req.body.modele !== 'string' || req.body.modele.length >= 1) {
      res.status(400).send(JSON.stringify({ error: "Le modèle doit être une chaîne de caractères non vide." }));
      return;
    }

   
    if (req.body.puissance <= 0) {
      res.status(400).send(JSON.stringify({ error: "La puissance doit être supérieure à zéro." }));
      return;
    }

  
    await clientDB.query({
      text: 'INSERT INTO gammeporsche (modele, moteur, puissance) VALUES($1, $2, $3)',
      values: [req.body.modele, req.body.moteur, req.body.puissance]
    });

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({ result: true }));
  } catch (error) {
    console.error('Erreur', error);
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


/*
export const apiUpdateGammeporsche = async (req, res) => {
  console.log('Request update');
  try {
    console.log('Request update', req.body);
    // SI le moteur existe, on continue
    // sinon on envoie chier:
    //   res.status(400).json({'error': 'Unauthorized motor'})
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
*/

export const apiUpdateGammeporsche = async (req, res) => {
  try {
    // Vérification si le moteur existe
    console.log('Request update', req.body);
    const wantToChangeMoteur = req.body.moteur ? true : false;
    let blockRequest = false
    if (wantToChangeMoteur) {
      const existingMoteur = await clientDB.query({
        text: 'SELECT * FROM moteurporsche WHERE moteur=$1',
        values: [req.body.moteur]
      });
      if (existingMoteur.rows.length != 1) blockRequest =  true;
    }

    // TODO: vérifier que si la puissance existe dans la requête alors elle doit être > 0

    if (blockRequest) {
      // La voiture n'a pas été trouvée
      res.status(400).json({ message: 'Le moteur n\'a pas été trouvé.' });
    } else {
      // Mettre à jour les informations du moteur
      if (req.body.moteur) {
        await clientDB.query({
          text: 'UPDATE gammeporsche SET moteur=$1 WHERE modele=$2',
          values: [req.body.moteur, req.params.modele]
        });
      }
      if (req.body.puissance) {
        await clientDB.query({
          text: 'UPDATE gammeporsche SET puissance=$1 WHERE modele=$2',
          values: [req.body.puissance, req.params.modele]
        });
      }
      res.setHeader('content-type', 'application/json');
      res.send(JSON.stringify({ result: true }));
    }
  } catch (error) {
    console.error('Erreur', error);
    res.status(500).json({ error });
  }
}
