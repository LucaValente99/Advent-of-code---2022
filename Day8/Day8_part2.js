const fs = require("fs");
const content = fs.readFileSync("Grid.txt", "utf-8");

const grid = content.split("\n").map(x => x.trim()); 
const gridLength = grid[0].length;
const gridHeight = grid.length;
const coordinates = {};
let count = 0;

function checkForLeftAndRight(value, row, col) {
    const before = [];
    const after = [];

    for (let i = 0; i < gridLength; i++){
        if (i < col){
            before.push(grid[row][i]);
        }
        if (i > col){
            after.push(grid[row][i]);
        }
    }

    const countLeft = before.reverse().slice(0, before.findIndex(x => x >= value)).length + 1;

    const countRight = after.slice(0, after.findIndex(x => x >= value)).length + 1;


    coordinates[[row, col]] = {"Left": countLeft, "Right": countRight};
}

function checkForUpAndDown(value, row, col) {
    const up = [];
    const down = [];

    for (let i = 0; i < gridLength; i++){
        for (let j = 0; j < gridHeight; j++){
            if (j == col && i < row){
                up.push(grid[i][j]);
            }
            if (j == col && i > row){
                down.push(grid[i][j]);
            }
        }
    }

    const countUp = up.reverse().slice(0, up.findIndex(x => x >= value)).length + 1;

    const countDown = down.slice(0, down.findIndex(x => x >= value)).length + 1;

    coordinates[[row, col]]["Up"] =  countUp;
    coordinates[[row, col]]["Down"] =  countDown; 
}

for (let i = 0; i < gridLength; i++){
    for (let j = 0; j < gridHeight; j++){
        const value = grid[i][j];
        checkForLeftAndRight(value, i, j);
        checkForUpAndDown(value, i, j);
    }
}

const scores = [];
for (const property in coordinates){
    scores.push(Object.values(coordinates[property]).reduce((acc, cur) => acc*cur, 1));
}

console.log(coordinates);
console.log("Highest scenic score: ", Math.max(...scores));


