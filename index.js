import express from 'express';
import bodyParser from 'body-parser';


// Importer les fonctions de vos fichiers
import { displayGammeporsche, updateGammePorsche } from './Gammeporsche.js';
import { displayMoteurPorsche, updateMoteurPorsche } from './MoteurPorsche.js';
//import { displayMoteurPorsche } from './MoteurPorsche.js';

// Connexion à la base de données, une fois pour toute



const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// Utilisez les fonctions comme d'habitude
app.get('/gammeporsche', displayGammeporsche);
app.post('/gammeporsche', updateGammePorsche)
app.get('/moteurporsche', displayMoteurPorsche);
app.post('/moteurporsche', updateMoteurPorsche);
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