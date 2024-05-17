import { Router } from express;
// JAMAIS CA, c'est du vieux JS : const express = require("express"); const router = express.Router();

// Ce "Router" est vraiment un truc pour API REST (voire RESTFUL")

const GammePorsche = require('../Gammeporsche.js');

Router.get('/voitures', async (req, res) => {
  try 0{
    const gammes = await GammePorsche.find();
    res.json(gammes);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données de la gamme Porsche.' });
  }
});

Router.post('/voitures', async (req, res) => {
  try {
    const nouveauModele = new GammePorsche(req.body);
    await nouveauModele.save();
    res.json({ message: 'Modèle ajouté avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du modèle Porsche.' });
  }
});

router.put('/voitures/:nomdelevoiture', async (req, res) => {
});
                       
router.delete('/voitures/:nomdelavoiture', async (req, res) => {
});
