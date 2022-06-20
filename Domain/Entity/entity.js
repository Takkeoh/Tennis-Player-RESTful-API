import e from 'express';
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

/* Function to check for data validity before adding it to the db
    Warning: Does not support error recovery, it will only tell the first error found.
    Inputs:
        player: json object containing the player informations
    Outputs:
        'id': player has an id (it shouldn't)
        '<field>': player is missing <field>
        '': everything is okay
*/
async function checkPlayer(player) {
    if (player.id) {
        return 'id';
    }
    if (!player.firstname) {
        return 'firstname';
    }
    if (!player.lastname) {
        return 'lastname';
    }
    if (!player.shortname) {
        return 'shortname';
    }
    if (!player.sex) {
        return 'sex';
    }
    if (!player.country) {
        return 'country';
    }
    if (!player.country.picture) {
        return 'country.picture';
    }
    if (!player.country.code) {
        return 'country.code';
    }
    if (!player.picture) {
        return 'picture';
    }
    if (!player.data) {
        return 'data';
    }
    if (!player.data.rank) {
        return 'data.rank';
    }
    if (!player.data.points) {
        return 'data.points';
    }
    if (!player.data.weight) {
        return 'data.weight';
    }
    if (!player.data.height) {
        return 'data.height';
    }
    if (!player.data.age) {
        return 'data.age';
    }
    if (!player.data.last) {
        return 'data.last';
    }
    return '';
}

export async function addPlayerToDb(player) {
    let err = await checkPlayer(player);
    if (err !== '') {
        return err;
    }
    let playerdb = await Players.create(player);
    return playerdb;
}

export async function updatePlayerToDb(id, playerJSON) {
    let player = await getPlayerById(id);
    console.log(player);
    if (!player)
        return null;
    for (let field of Object.keys(player.dataValues)) {
        if (playerJSON[field])
            player[field] = playerJSON[field];
    }
    await player.save();
    return player.dataValues;
}

export async function deletePlayerFromDb(playerId) {
    return await Players.destroy({
        where: {
            id: playerId
        }
    });
}