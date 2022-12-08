const fs = require('fs');

fs.promises.readFile("Stream.txt","utf-8")
    .then((content) =>{
        for(let i = 0; i < content.length; i++){
            valuesToCheck = content.substring(i, i+14).split("");
            if (Array.from(new Set(valuesToCheck)).length == valuesToCheck.length){
                console.log(Array.from(new Set(valuesToCheck)) + " --- number of char processed: " + (i+14));
                break;
            }
        } 
    })  
    .catch((err) => {
        console.log(err);
    }); 