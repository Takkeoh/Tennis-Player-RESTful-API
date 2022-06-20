import { getPlayers, findPlayer, getStats, 
        addPlayer, patchPlayer, removePlayer } from '../../Domain/Services/services.js';

export async function getPlayersDTO(req, res) {
    const players = await getPlayers();
    res.status(200);
    res.json(players);
    res.end();
    console.log("Got players");
}

export async function findPlayerDTO(req, res) {
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400);
        res.json({
            error: "The id must be number",
        });
        res.end();
        return;
    }

    const player = await findPlayer(id);

    if (player == null) {
        res.status(404);
        res.json({
            error: "Could not find a player with " + id,
        });
        res.end();
        return;
    }

    res.status(200);
    res.json(player);
    res.end();
    console.log("Got player " + req.params.id);
}

export async function getStatsDTO(req, res) {
    let stats = await getStats();
    res.status(200);
    res.json(stats);
    res.end();
    console.log("Got stats");
}

export async function postPlayerDTO(req, res) {
    let player = await addPlayer(req.body);
    
    if (typeof(player) === 'string') {
        res.status(400);
        if (player === "id") {
            res.json({
                error: "Player should not have an id",
            });
        }
        else {
            res.json({
                error: "Missing field " + player,
            });
        }
        res.end();
        return;
    }

    res.status(200);
    res.json(player);
    res.end();
}

export async function patchPlayerDTO(req, res) {

}

export async function deletePlayerDTO(req, res) {
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400);
        res.json({
            error: "The id must be number",
        });
        res.end();
        return;
    }

    let destroyed = await removePlayer(id);
    if (destroyed === 0) {
        res.status(404);
        res.json({
            error: "Could not find player with id " + id,
        });
        res.end();
        return;
    }

    res.status(200);
    res.json({
        success: 'Player with id ' + id  + ' successfully deleted.' 
    });
    res.end();
}