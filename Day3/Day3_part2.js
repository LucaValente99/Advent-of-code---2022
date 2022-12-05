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

                const chunkSize = 3;
                const rucksacks = content.split("\n").map(x => x.replace("/\r?\n|\r/", ""));   
                const groups = {};   
                    
                // Grouping elves' rucksacks by 3
                for (let i = 0; i < rucksacks.length; i += chunkSize) {
                    const chunk = rucksacks.slice(i, i + chunkSize);
                    groups["group_" + i.toString()] = chunk;
                }   
                
                // collecting badges of different groups (common char into rucksacks)
                const badges = [];
                Object.values(groups).forEach(group => {
                    badge = new Set(group[0].split("").filter(char => group[1].split("").includes(char) && group[2].split("").includes(char)));
                    badges.push(Array.from(badge)[0]);
                });

                // counting priorities
                let count = 0;
                badges.forEach(char => count += priorities[char]);
                console.log(count);
            })  
            .catch((err) => {
                console.log(err);
            }); 