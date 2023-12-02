const fs = require('fs');
const assert = require('assert');

const filename = "input.txt";

const maxGameCube = {
    maxRed: 12,
    maxGreen: 13,
    maxBlue: 14
};

let sumMaxId = 0;
let sumMultiplierMin = 0;
fs.readFile(filename, 'utf-8', (err, data) => {
    if(err) return;
    const fileLine = data.split(/[\n\r]+/);
    for(line of fileLine) {
        try {
            const gameData = getGameData(line);
            if(verifMaxCube(gameData)) sumMaxId += gameData.gameId;
            sumMultiplierMin += getMutlplierMinCube(gameData);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(sumMaxId);
    console.log(sumMultiplierMin);
});

function getColorCube(line) {
    const colorArray = line.filter((index) => !isNaN(parseInt(index)));
    for(index in colorArray) {
        colorArray[index] = parseInt(colorArray[index]);
    }
    return colorArray;
}

function verifMaxCube(game) {
    return game.maxRed <= maxGameCube.maxRed && game.maxGreen <= maxGameCube.maxGreen && game.maxBlue <= maxGameCube.maxBlue
}

function getMutlplierMinCube(game) {
    return game.maxRed * game.maxGreen * game.maxBlue;
}

function getGameData(line) {
    if(line) {
        const gameId = parseInt(line.split(/Game (\d+):/)[1]);
        const redCube = line.split(/(\d+) red/);
        const formatedRedCube = getColorCube(redCube);
        const greenCube = line.split(/(\d+) green/);
        const formatedGreenCube = getColorCube(greenCube);
        const blueCube = line.split(/(\d+) blue/);
        const formatedBlueCube = getColorCube(blueCube);
        return {
            gameId,
            maxRed: Math.max(...formatedRedCube),
            maxGreen: Math.max(...formatedGreenCube),
            maxBlue: Math.max(...formatedBlueCube),
        };
    }
    throw new Error("La ligne n'a pas pu être lue : " + line);
}


