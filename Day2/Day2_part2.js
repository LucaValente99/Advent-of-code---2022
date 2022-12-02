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
                   
                    switch(opponent){      

                        case "A":
                            if (me == "Y"){
                                count += 3 + choice["X"];
                            }else if (me == "Z"){
                                count += 6 + choice["Y"];
                            }else{
                                count += choice["Z"];
                            }
                            break;

                        case "B":

                            if (me == "Y"){
                                count += 3 + choice["Y"];
                            }else if (me == "Z"){
                                count += 6 + choice["Z"];
                            }else{
                                count += choice["X"];
                            }                           
                            break;

                        case "C":

                            if (me == "Y"){
                                count += 3 + choice["Z"];
                            }else if (me == "Z"){
                                count += 6 + choice["X"];
                            }else{
                                count += choice["Y"];
                            }
                            break;

                    }
                });

                console.log("Total score: ", count);
            })  
            .catch((err) => {
                console.log(err);
            }); 