import { listPlayers, getPlayerById, listStats } from '../Entity/entity.js';

export async function getPlayers() {
    let players = await listPlayers();
    players = players.sort((player1, player2) => {
        // Checks for bad data
        if (isNaN(player1.data.rank)){
            console.warn(player1.id + ' has no rank.');
            return 1;
        }
        if (isNaN(player2.data.rank)){
            console.warn(player2.id + ' has no rank.');
            return 1;
        }

        // Compare operations
        if (player1.data.rank < player2.data.rank)
            return -1;
        if (player1.data.rank > player2.data.rank)
            return 1;
        return 0;
    });

    return players;
}

export async function findPlayer(id) {
    const player = await getPlayerById(id);
    return player;
}

function getMostWinner(stats) {
    let histo = Object();
    stats.forEach(stat => {
        if (!histo[stat.country]) {
            histo[stat.country] = Object({
                wins: 0,
                total: 0,
                ratio: 0,
            })
        }
        stat.wins.forEach(match => {
            if (match === 1)
                histo[stat.country].wins += 1;
            histo[stat.country].total += 1;
        })
        histo[stat.country].ratio = histo[stat.country].wins / histo[stat.country].total;
    });

    let winner = '';
    let maxRatio = 0;
    for (let country of Object.keys(histo)) {
        if (histo[country].ratio > maxRatio) {
            winner = country;
            maxRatio = histo[country].ratio;
        }
    }

    return winner;
}

// Formula is : BMI = weight (kg) / height² (m)
function getBMI(height, weight) {
    if (!height || height < 1) {
        console.warn("Found someone with no height.");
        return -1;
    }
    if (!weight || weight < 1) {
        console.warn("Found someone with no weight.");
        return -1;
    }
    return (weight/1000) / Math.pow((height/100), 2);
}

function getBMIMean(stats) {
    let nbOfPlayer = stats.length;

    // Simple folding for efficiency
    let totalBMI = stats.reduce((acc, actual) => {
        let tmp = getBMI(actual.height, actual.weight);
        if (tmp === -1) {
            console.warn("Found invalid data, ignoring");
            nbOfPlayer--;
            return acc;
        }
        return acc + tmp;
    }, 0);

    // Recheck for different warning
    if (nbOfPlayer === 0) {
        console.warn("Couldn't calculate BMI. No valid player in the database.");
        return 0;
    }
    return (totalBMI / nbOfPlayer).toFixed(2);
}

function getAverageHeight(stats) {
    let sortedStats = stats.sort((player1, player2) => {
        if (player1.height < player2.height)
            return -1;
        if (player1.height > player2.height)
            return 1;
        return 0;
    });
    let median = Math.round(stats.length / 2);
    return sortedStats[median].height;
}

export async function getStats() {
    const stats = await listStats();

    if (stats.length === 0) {
        console.warn("No player in the database.");
        return -1;
    }

    let result = Object();
    result.bestWinRatio = getMostWinner(stats);
    result.BMIMean = getBMIMean(stats);
    result.averageHeight = getAverageHeight(stats);

    return result;
}