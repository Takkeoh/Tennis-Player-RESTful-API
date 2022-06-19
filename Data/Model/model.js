import { Sequelize, Model, DataTypes } from 'sequelize';
import fs from 'fs';

console.log(process.cwd())
var database = JSON.parse(fs.readFileSync(process.cwd() + '/Data/headtohead.json'));

const sequelize = new Sequelize('sqlite::memory:');

export const Players = sequelize.define('Players', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    shortname: DataTypes.STRING,
    sex: DataTypes.STRING,
    picture: DataTypes.STRING,
    country: DataTypes.JSON,
    data: DataTypes.JSON,
});

await sequelize.sync({ force: true });

// FILL IN THE DATABASE WITH DATA
(async _ => {
    for (let player of database.players) {
        const play = await Players.create({
            id: player.id,
            firstname: player.firstname,
            lastname: player.lastname,
            shortname: player.shortname,
            sex: player.sex,
            country: {
                picture: player.country.picture,
                code: player.country.code,
            },
            picture: player.picture,
            data: {
                rank: player.data.rank,
                points: player.data.points,
                weight: player.data.weight,
                height: player.data.height,
                age: player.data.age,
                last: player.data.last,
            },
        });
    }
})();