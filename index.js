import express from 'express';
import bodyParser from 'body-parser';


// Importer les fonctions de vos fichiers
import { displayGammeporsche, updateGammePorsche } from './Gammeporsche.js';
import { displayMoteurPorsche, updateMoteurPorsche } from './MoteurPorsche.js';

import { apiAddMoteurPorsche, apiDeleteMoteurPorsche, apiDisplayMoteurPorsche, apiUpdateMoteurPorsche } from './api/moteur.js';
import { apiDisplayGammeporsche, apiUpdateGammeporsche } from './api/gamme.js';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Utilisez les fonctions comme d'habitude
app.get('/gammeporsche', displayGammeporsche);
app.post('/gammeporsche', updateGammePorsche)
app.get('/moteurporsche', displayMoteurPorsche);
app.post('/moteurporsche', updateMoteurPorsche);

// API MOTEURS
app.get('/api/moteurporsche', apiDisplayMoteurPorsche);
app.post('/api/moteurporsche', apiAddMoteurPorsche);
app.put('/api/moteurporsche/:moteur', apiUpdateMoteurPorsche);
app.delete('/api/moteurporsche/:moteur', apiDeleteMoteurPorsche);

// API GAMME
app.get('/api/gammeporsche', apiDisplayGammeporsche);
app.post('/api/gammeporsche', apiUpdateGammeporsche);
// Code Remi
app.get('/', (req, res) => {
    res.send(`<html>
    <body>
        Hello <b>world</b>
    </body>
    </html>`)
});

console.log('Listen on port 3000');
app.listen(3000);