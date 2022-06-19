import { Players } from '../../Data/Model/model.js';

export async function listPlayers() {
    const players = await Players.findAll();
    return players;
}

export async function getPlayerById(playerId) {
    const player = await Players.findOne({
        where: {
        id: playerId
    }});
    return player;
}

export async function listStats() {
    const players = await Players.findAll();
    let map = [];
    for (let player of players) {
        let tmp = Object();
        tmp.wins = player.data.last;
        tmp.country = player.country.code;
        tmp.height = player.data.height;
        tmp.weight = player.data.weight;
        map.push(tmp);
    }
    return map;
}