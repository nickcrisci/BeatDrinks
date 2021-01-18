const fs = require('fs');
const { userInfo } = require('os');

//var data = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));

const writefile = (callback) => {
    var data = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));
    return callback(null, data);
}

//Überprüfe, ob ein Cocktail eine spezifische Zutat beinhaltet
const checkproperty = (drinknr, property, callback) => {
    var data = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));
    const ingredients = data[drinknr].ingredients
    //console.log(data.cocktails[drinknr].ingredients[0][property]);
    //console.log(data.cocktails[drinknr].ingredients)
    /*for(var i = 0; i < ingredients.length; i++) {
        //console.log(typeof ing[i][property]);
        if(typeof ingredients[i][property] != "undefined") {
            return callback(null, true);
        }
        if (ingredients[i] == property) return callback(null, true)
    }
    return callback(null, false);*/

    for (const element of ingredients) {
        if (element["name"] === property) return callback(null, true)
    };

    return callback(null, false)
}

const preference = (want, hate, callback) => {
    var data = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));
    const ergebnis = [];
    
    if(want == null && hate == null) {
        ergebnis = data;
    } else {
        for(const cocktail of data) {
            var wantbool = false;
            var hatebool = false;
            for (const ingredient of cocktail["ingredients"]) {
                if (want.some(element => element == ingredient["name"])) {
                    wantbool = true;
                }
                if(hate.some(element => element == ingredient["name"])){
                    hatebool = true;
                    break
                }
            }
            if(wantbool && !hatebool) ergebnis.push(cocktail)  
        }
    }
    
    return callback(null, ergebnis);
}


function main() {
    //console.log(data.cocktails[1]);
    var pref = ["Wodka"];
    var hass = ["Eiswürfel"];

    /*
    writefile((err,result)=>{
        console.log(result);
    })
    */

    
    preference(pref, hass, (err, result) => {
        console.log(result);
    })
    

    
    //checkproperty(0, "Wodka", (err, result) => {
       // console.log(result);
    //})
    
    
    
  //// checkproperty(0,"Bitterlemon", (err, result) => {
       //console.log(result);
   //})
   
      
} 

main();