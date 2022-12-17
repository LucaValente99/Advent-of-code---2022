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

    coordinates[[row, col]] = {"Left": value > Math.max(...before), "Right": value > Math.max(...after)};
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

    coordinates[[row, col]]["Up"] =  value > Math.max(...up);
    coordinates[[row, col]]["Down"] =  value > Math.max(...down); 
}

for (let i = 0; i < gridLength; i++){
    for (let j = 0; j < gridHeight; j++){
        const value = grid[i][j];
        checkForLeftAndRight(value, i, j);
        checkForUpAndDown(value, i, j);
    }
}

for (const property in coordinates){
    if (Object.values(coordinates[property]).includes(true)){
        count++;
    }
}

console.log(coordinates);
console.log("Visible trees: ", count);


