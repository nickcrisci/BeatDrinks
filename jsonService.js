const fs = require('fs');
const { userInfo } = require('os');

var cocktails = JSON.parse(fs.readFileSync('Cocktails.json','utf8'));

//Überprüfe, ob ein Cocktail eine spezifische Zutat beinhaltet
const checkProperty = (drinknr, property, callback) => {
    const ingredients = cocktails[drinknr].ingredients

    for (const element of ingredients) {
        if (element["name"] === property) return callback(null, true)
    };

    return callback(null, false)
}

//Gebe nur Cocktails mit angegeben Präferenzen zurück
const preference = (want, hate, callback) => {
    const ergebnis = [];
    
    if (want == null && hate == null) {
        return callback(null, cocktails)
    }
    
    for(const cocktail of cocktails) {
        var wantBool = false;
        var hateBool = false;
        for (const ingredient of cocktail["ingredients"]) {
            if (want.some(element => element == ingredient["name"])) {
                wantBool = true;
            }
            if(hate.some(element => element == ingredient["name"])){
                hateBool = true;
                break
            }
        }
        if(wantBool && !hateBool) ergebnis.push(cocktail)  
    }
    
    return callback(null, ergebnis);
}

//Gibt einen Cocktail nach Namen zurück, falls vorhanden
const search = (name, callback) => {
    for (const cocktail of cocktails) {
        if(cocktail["name"] == name) return callback(null, cocktail)
    }
    return callback (null, false)     
}

//Liefert Cocktails mit bestimmten Schlagwörtern im Teaser (vielleicht brauchen wirs um Cocktails für Stimmungen zu liefern?)
const mood = (mood, callback) => {
    const ergebnis = [];
    for (const cocktail of cocktails) {
        if(cocktail["teaser"].includes(mood)) ergebnis.push(cocktail)
    }
    return callback (null, ergebnis);
}


function main() {
    var pref = ["Ramazzotti", "Vanillesirup"];
    var hass = ["Eiswürfel"];

    mood("Party", (err, result) => {
        console.log(result);
    })

    /*
    preference(pref, hass, (err, result) => {
        console.log(result);
    })
    */
    
    
    /*
    checkProperty(0, "Wodka", (err, result) => {
        console.log(result);
    })
    */
    
    /*
    search("Wodka-Gin-Limette", (err, result) => {
        console.log(result);
    })
    */
          
} 

main();