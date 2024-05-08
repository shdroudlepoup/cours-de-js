import express from 'express';
import bodyParser from 'body-parser';


// Importer les fonctions de vos fichiers
import { displayGammeporsche, updateGammePorsche } from './Gammeporsche.js';
import { displayMoteurPorsche, updateMoteurPorsche } from './MoteurPorsche.js';

import { apiDisplayMoteurPorsche, apiUpdateMoteurPorsche } from './api/moteur.js';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Utilisez les fonctions comme d'habitude
app.get('/gammeporsche', displayGammeporsche);
app.post('/gammeporsche', updateGammePorsche)
app.get('/moteurporsche', displayMoteurPorsche);
app.post('/moteurporsche', updateMoteurPorsche);

app.get('/api/moteurporsche', apiDisplayMoteurPorsche);
app.post('/api/moteurporsche', apiUpdateMoteurPorsche);
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