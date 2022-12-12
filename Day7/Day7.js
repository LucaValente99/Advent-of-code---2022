const fs = require("fs");

const pathList = {};
const path = [];
let currentDir;

fs.promises.readFile("DirectoriesTree.txt", "utf-8")
    .then((content) =>{
        const commands = content.split("\n").map(x => x.replace("/\r?\n|\r/", ""));  
        commands.forEach(command =>{          
            let cmd = command.split(" ")[0];
            if (cmd == "$"){
                cmd = command.split(" ")[1];
            }
            switch(cmd.trim()){
                case "cd":
                    const dir = command.split(" ")[2]; 
                    switch(dir.trim()){
                        case "..":                                                                                            
                                path.pop();
                                currentDir = path;
                            break;
                        case "/":   
                               path.push("/"); 
                               currentDir = path;  
                               if (!Object.keys(pathList).includes(currentDir)){
                                    pathList[currentDir] = 0;
                                }                             
                            break;                        
                        default:      
                                path.push(dir);
                                currentDir = path;
                                
                                if (!Object.keys(pathList).includes(currentDir)){
                                    pathList[currentDir] = 0;
                                } 
                                
                                break;                                 
                    }
                    break;

                case "ls":
                    break;    
                case "dir":
                    break;
                default:                   
                    for(let i = 1; i <= currentDir.length; i++){
                        pathList[currentDir.slice(0,i)] += parseInt(cmd);
                    }
                    break;                                       
            }          
        })  

        console.log(pathList);
        console.log("PART_1:", Object.values(pathList).filter(x => x <= 100000).reduce((acc,y) => acc+y, 0));  

        const spaceAvailable = 70000000 - pathList["/"];
        const spaceNeeded = 30000000;
        const possibleDir = [];
        for (const property in pathList){
            if (spaceAvailable + pathList[property] >= spaceNeeded){
                possibleDir.push(pathList[property]);
            }
        }
        
        console.log("PART_2:", "spaceAvailable: ", spaceAvailable, "---", "dirSize: ", possibleDir.sort((a, b) => a-b)[0]);
        console.log("Possible choices:", possibleDir);
    })  
    .catch((err) => {
        console.log(err);
    }); 
