import express from 'express';
const app = express();
// Export for separation between the app and the server
export default app;
import { getPlayersDTO, findPlayerDTO, getStatsDTO } from './Presentation/DTO/endpoints.js';

// Base requests
app.get('/players', getPlayersDTO);
app.get('/players/:id', findPlayerDTO);
app.get('/stats', getStatsDTO);
