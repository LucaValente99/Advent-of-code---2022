const fs = require('fs');

fs.promises.readFile('Calories.txt', "utf-8")
            .then((content) =>{
                let calories = content.split("\n"); 
                calories = calories.map(x => parseInt(x.replace("/\r?\n|\r/", "")));                     
                
                const totalCaloriesXElf = [];
                let count = 0;
                calories.forEach(value => {           
                    if (value.toString() != "NaN"){
                        count += value;
                    }else{ 
                        totalCaloriesXElf.push(count);                       
                        count = 0;
                    }
                }); 
                
                totalCaloriesXElf.sort((a,b)=>b-a);      
                
                //Part 1
                const topOne = totalCaloriesXElf[0];

                //Part 2
                const totalTopThree = totalCaloriesXElf.slice(0,3).reduce((a, b) => a + b, 0);


                console.log("topOne: " + topOne + "\n" + "TotalTopThree: " + totalTopThree);
            })  
            .catch((err) => {
                console.log(err);
            }); 