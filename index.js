// Base imports
import express from 'express';
const app = express();
import { getPlayersDTO, findPlayerDTO, getStatsDTO } from './Presentation/DTO/endpoints.js';

// Base requests
app.get('/players', getPlayersDTO);
app.get('/players/:id', findPlayerDTO);
app.get('/stats', getStatsDTO);

// Launch the server
app.listen(8080, () => {
    console.log('Server started.')
})
