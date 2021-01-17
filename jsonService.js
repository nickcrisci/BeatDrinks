const fs = require('fs');
const { userInfo } = require('os');

//var data = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));

const writefile = (callback) =>{
    var data = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));
    return callback(null, data);
}

//Überprüfe, ob ein Cocktail eine spezifische Zutat beinhaltet
const checkproperty = (drinknr, property, callback) => {
    var data = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));
    const ingredients = data.cocktails[drinknr].ingredients
    //console.log(data.cocktails[drinknr].ingredients[0][property]);
    //console.log(data.cocktails[drinknr].ingredients)
    for(var i = 0; i < ingredients.length; i++) {
        //console.log(typeof data.cocktails[drinknr].ingredients[i][property]);
        if(typeof ingredients[i][property] != "undefined") {
            return callback(null, true);
        }
        //if (ingredients[i] == property) return callback(null, true)
    }
    return callback(null, false);
}

const preference = (want, hate, callback) => {
    var data = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));
    var ergebnis = [];
    
    if(want == null) {
        ergebnis = data.cocktails;
    } else {
        for(var i = 0; i < data.cocktails.length; i++) {
            var ingredientExists = false;
            for(var t = 0; t < data.cocktails[i].ingredients.length; t++) {
                //console.log(data.cocktails[0].ingredients[0].Wodka);
                //return callback(null,data.cocktails[i].ingredients[t]);
                for(var a = 0; a < want.length; a++) {
                    checkproperty(i, want[a], (err, result) => {
                        if(result == true) ingredientExists = true;
                    }) 
                }
            }
           if(ingredientExists) ergebnis.push(data.cocktails[i]);
        }
    }
    
    
    if(hate == null) {
        return callback(null, ergebnis);
    } else {
        var i = 0;
        var deleted = false;
        while(typeof ergebnis[i] !== "undefined") {
            deleted = false;
                for(var a = 0; a < hate.length; a++) {
                    if(!deleted) {
                        
                        checkproperty(i, hate[a], (err, result) => {                       
                            
                            if(result = true) {
                                //console.log(ergebnis[i]);
                                ergebnis.splice(i, 1);
                                deleted = true;
                            }
                        })
                    }
                }
            i++;
        }
    }
    return callback(null, ergebnis);
}


function main(){
    //console.log(data.cocktails[1]);
    var pref = ["Wodka"];
    var hass = ["Gin"];

    /*
    writefile((err,result)=>{
        console.log(result);
    })
    */

    
    //preference(pref, hass, (err, result) => {
     //   console.log(result);
    //})
    

    
    checkproperty(0, "Gin", (err, result) => {
        console.log(result);
    })
    
    
    /*
   checkproperty(0,"Bitterlemon",(err,result)=>{
       console.log(result);
   })
   */
      
} 

main();