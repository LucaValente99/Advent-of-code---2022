const fs = require('fs');

let choice = {X: 1, Y: 2, Z: 3}; 

fs.promises.readFile('Matches.txt', "utf-8")
            .then((content) =>{
                let matches = content.split("\n"); 
                matches = matches.map(x => x.replace("/\r?\n|\r/", ""));                     
                
                let count = 0;
                matches.forEach(choices => {
                    let opponent = choices[0];
                    let me = choices[2];
                   
                    count += choice[me];

                    switch(opponent){                            
                        case "A":
                            if (me == "Y"){
                                count += 6;
                            }else if (me == "X"){
                                count += 3;
                            }
                            break;

                        case "B":

                            if (me == "Z"){
                                count += 6;
                            }else if (me == "Y"){
                                count += 3;
                            }
                            break;

                        case "C":

                            if (me == "X"){
                                count += 6;
                            }else if (me == "Z"){
                                count += 3;
                            }
                            break;

                    }

                    console.log(opponent, me, count);
                });

                console.log("Total score: ", count);
            })  
            .catch((err) => {
                console.log(err);
            }); 