const fs = require('fs');

const stacks = { 
    1:["B", "S", "V", "Z", "G", "P", "W"] , 
    2:["J", "V", "B", "C", "Z", "F"] ,
    3:["V", "L", "M", "H", "N", "Z", "D", "C"] ,
    4:["L", "D", "M", "Z", "P", "F", "J", "B"] ,
    5:["V", "F", "C", "G", "J", "B", "Q", "H"] ,
    6:["G", "F", "Q", "T", "S", "L", "B"] ,
    7:["L", "G", "C", "Z", "V"] ,
    8:["N", "L", "G"] ,
    9:["J", "F", "H", "C"] 
};

fs.promises.readFile('Movements.txt', "utf-8")
            .then((content) =>{
                let movement = content.split("\n").map(x => x.replace("/\r?\n|\r/", ""));  
                movement = movement.map(x => x.split(" ").filter(element => !isNaN(parseInt(element))));
 
                movement.forEach(x => {
                    const numberOfCrane = parseInt(x[0].trim());
                    const stackNumberFrom = x[1].trim();
                    const stackNumberTo = x[2].trim();

                    const CraneToMove = [];
                    for (let i = 0; i < numberOfCrane; i++){
                        CraneToMove.unshift(stacks[stackNumberFrom].pop());
                    }
                    stacks[stackNumberTo].push(...CraneToMove);
                })

                let result = "";
                for (value of Object.values(stacks)) {
                    result += value[value.length-1];
                }

                console.log(result);
            })  
            .catch((err) => {
                console.log(err);
            }); 