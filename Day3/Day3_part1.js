const fs = require('fs');

const alpha = Array.from(Array(26)).map((_, i) => i + 65);
const alphabetLowerAndUpper = [...alpha.map((x) => String.fromCharCode(x).toLowerCase()), ...alpha.map((x) => String.fromCharCode(x))];

const priorities = {};
let priority = 1;

alphabetLowerAndUpper.forEach(char => {
    priorities[char] = priority;
    priority++;
});

fs.promises.readFile('Rucksacks.txt', "utf-8")
            .then((content) =>{
                let count = 0;
                const rucksacks = content.split("\n").map(x => x.replace("/\r?\n|\r/", ""));      
                rucksacks.forEach(rucksack => {
                    let compartments1 = rucksack.slice(0, rucksack.length/2);
                    let compartments2 = rucksack.slice(rucksack.length/2, rucksack.length);

                    let doublePresence = compartments1.split("").filter(char => compartments2.split("").includes(char));
                    doublePresence = Array.from(new Set(doublePresence));
                    doublePresence.forEach(char => count += priorities[char]);
                });
            
                console.log(count);

            })  
            .catch((err) => {
                console.log(err);
            }); 