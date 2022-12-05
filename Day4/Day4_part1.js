const fs = require('fs');

fs.promises.readFile('Assignments.txt', "utf-8")
            .then((content) =>{
                let count = 0;
                let assignments = content.split("\n").map(x => x.replace("/\r?\n|\r/", "").replace(","," "));      
                assignments.forEach(couple => {
                    const elf1 = couple.split(" ")[0].split("-");
                    const elf2 = couple.split(" ")[1].split("-");

                    
                    if (// total overlap
                        parseInt(elf1[0]) <= parseInt(elf2[0]) && parseInt(elf1[1]) >= parseInt(elf2[1]) || 
                        parseInt(elf2[0]) <= parseInt(elf1[0]) && parseInt(elf2[1]) >= parseInt(elf1[1])){
                        count++;
                    }

                });
                console.log(count);
            })  
            .catch((err) => {
                console.log(err);
            }); 