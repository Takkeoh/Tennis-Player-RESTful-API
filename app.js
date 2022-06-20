import express from 'express';
import bodyParser from 'body-parser';

const app = express();
// Export for separation between the app and the server
export default app;

import { getPlayersDTO, findPlayerDTO, getStatsDTO, 
        postPlayerDTO, patchPlayerDTO, deletePlayerDTO } from './Presentation/DTO/endpoints.js';
import { initdb } from './Data/Model/model.js';

var jsonParser = bodyParser.json()

// Init db with 'headtohead.json' content
await initdb();

// Base requests
app.get('/players', getPlayersDTO);
app.get('/players/:id', findPlayerDTO);
app.get('/stats', getStatsDTO);

// Other requests
app.post('/players', jsonParser, postPlayerDTO);
app.patch('/players/:id', jsonParser, patchPlayerDTO);
app.delete('/players/:id', deletePlayerDTO);