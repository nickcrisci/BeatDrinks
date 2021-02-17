/*
    Alle Rückgaben des jsonService liefern Objekte mit folgenden Eigenschaften:


    name: String                    Name des Cocktails 
    teaser: String                  Kurze Beschreibung zum Cocktail 
    ingredients: Array["String"]    Eine Liste von Zutaten die im Cocktail enthalten sind

*/

//Pfad der Cocktails.Json wird dynamisch geholt
const path = require('path'),
    fs = require('fs')
    
cocktailsPath = path.join(__dirname,"..","data","Cocktails.json");
var cocktails = JSON.parse(fs.readFileSync(cocktailsPath,'utf8'));
    
//Überprüfe, ob ein Cocktail eine spezifische Zutat beinhaltet
const checkProperty = (drinknr, property, callback) => {
    const ingredients = cocktails[drinknr].ingredients

    for (const element of ingredients) {
        if (element["name"].toUpperCase().includes(property.toUpperCase())) return callback(null, true)
    };

    return callback(null, false)
}

//Gebe nur Cocktails mit angegeben Präferenzen zurück
const preference = (want, hate, callback) => {
    const ergebnis = [];

    //Fehler werfen wenn want/hate null ist
    if (want == null && hate == null) {
        return callback(new Error("Want- and Hate-Arrays cannot both be null"))
    }

    if ((want != null && want.length == undefined )||(hate != null && hate.length == undefined)){
        return callback(new Error("Want- or Hate-Arrays cannot be empty arrays"))
    }
    
    for(const cocktail of cocktails) {
        var wantBool = false;
        var hateBool = false;
        for (const ingredient of cocktail["ingredients"]) {
            if(want == null) wantBool = true    
            else if (want.some(element => element == ingredient["name"])) {
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



//Liefert Cocktails ohne Alkohol
const alcoholfree = (callback) => {
    const ergebnis = [];
    for (const cocktail of cocktails) {
        if(cocktail["name"].toUpperCase().includes("VIRGIN")) ergebnis.push(cocktail)
    }
    mood("ALKOHOLFREI",(err,result) => {
        ergebnis.push(result);
    })

    return callback (null, ergebnis);
}

//Achtung Monsterfunktion. Nur zum zuordnen von Moods auf Cocktails. Nur zum Entwicklungsprozess
//Achtung, nach Ausführung ist Cocktails.json nicht mehr wirklich Human-readable.
const assignmood = (callback) => {
    for (var i = 0; i< cocktails.length; i++){
        checkProperty(i, "Gin",(err,result) => {
            if(result){
                cocktails[i].mood = "Melancholisch";
            }
        })

        checkProperty(i, "Sherry",(err,result) => {
            if(result){
                cocktails[i].mood = "Melancholisch";
            }
        })

        checkProperty(i, "Campari",(err,result) => {
            if(result){
                cocktails[i].mood = "Melancholisch";
            }
        })

        checkProperty(i, "Orange",(err,result) => {
            if(result){
                cocktails[i].mood = "Melancholisch";
            }
        })

        checkProperty(i, "Brandy",(err,result) => {
            if(result){
                cocktails[i].mood = "Traurig";
            }
        })

        checkProperty(i, "Curacao",(err,result) => {
            if(result){
                cocktails[i].mood = "Traurig";
            }
        })

        checkProperty(i, "Whisky",(err,result) => {
            if(result){
                cocktails[i].mood = "Traurig";
            }
        })

        checkProperty(i, "Whiskey",(err,result) => {
            if(result){
                cocktails[i].mood = "Traurig";
            }
        })

        checkProperty(i, "Tomate",(err,result) => {
            if(result){
                cocktails[i].mood = "Traurig";
            }
        })

        checkProperty(i, "Tequila",(err,result) => {
            if(result){
                cocktails[i].mood = "Aggressiv";
            }
        })

        checkProperty(i, "Zitrone",(err,result) => {
            if(result){
                cocktails[i].mood = "Aggressiv";
            }
        })

        checkProperty(i, "Cognac",(err,result) => {
            if(result){
                cocktails[i].mood = "Aggressiv";
            }
        })

        checkProperty(i, "Red Bull",(err,result) => {
            if(result){
                cocktails[i].mood = "Aggressiv";
            }
        })

        checkProperty(i, "Wodka",(err,result) => {
            if(result){
                cocktails[i].mood = "Energetisch";
            }
        })

        checkProperty(i, "Rum",(err,result) => {
            if(result){
                cocktails[i].mood = "Energetisch";
            }
        })

        checkProperty(i, "Prosecco",(err,result) => {
            if(result){
                cocktails[i].mood = "Energetisch";
            }
        })

        checkProperty(i, "Himbeergeist",(err,result) => {
            if(result){
                cocktails[i].mood = "Energetisch";
            }
        })

        checkProperty(i, "Bier",(err,result) => {
            if(result){
                cocktails[i].mood = "Energetisch";
            }
        })

        checkProperty(i, "Johannisbeersaft",(err,result) => {
            if(result){
                cocktails[i].mood = "Energetisch";
            }
        })

        checkProperty(i, "Pitu",(err,result) => {
            if(result){
                cocktails[i].mood = "Energetisch";
            }
        })

        checkProperty(i, "Ananas",(err,result) => {
            if(result){
                cocktails[i].mood = "Energetisch";
            }
        })

        checkProperty(i, "Rotwein",(err,result) => {
            if(result){
                cocktails[i].mood = "Entspannt";
            }
        })

        checkProperty(i, "Kaffeelikör",(err,result) => {
            if(result){
                cocktails[i].mood = "Entspannt";
            }
        })

        checkProperty(i, "Baileys",(err,result) => {
            if(result){
                cocktails[i].mood = "Entspannt";
            }
        })

        checkProperty(i, "Grenadine",(err,result) => {
            if(result){
                cocktails[i].mood = "Entspannt";
            }
        })

        checkProperty(i, "Schoko",(err,result) => {
            if(result){
                cocktails[i].mood = "Entspannt";
            }
        })

        checkProperty(i, "Weißwein",(err,result) => {
            if(result){
                cocktails[i].mood = "Entspannt";
            }
        })

        checkProperty(i, "Jägermeister",(err,result) => {
            if(result){
                cocktails[i].mood = "Froh";
            }
        })

        checkProperty(i, "Erdbeer",(err,result) => {
            if(result){
                cocktails[i].mood = "Froh";
            }
        })

        checkProperty(i, "Himbeer",(err,result) => {
            if(result){
                cocktails[i].mood = "Froh";
            }
        })

        checkProperty(i, "Limette",(err,result) => {
            if(result){
                cocktails[i].mood = "Froh";
            }
        })

        checkProperty(i, "Sekt",(err,result) => {
            if(result){
                cocktails[i].mood = "Froh";
            }
        })

        checkProperty(i, "Champagner",(err,result) => {
            if(result){
                cocktails[i].mood = "Froh";
            }
        })

        checkProperty(i, "Kirsch",(err,result) => {
            if(result){
                cocktails[i].mood = "Froh";
            }
        })

        checkProperty(i, "Chardonnay",(err,result) => {
            if(result){
                cocktails[i].mood = "Froh";
            }
        })

        
    }

    //Hier wird das Ergebnis in die JSON geschrieben
    result = JSON.stringify(cocktails);
    fs.writeFileSync(cocktailsPath,result);
    
    return callback (null, cocktails);
}


//Liefert alle Cocktails einer Stimmung.
//Stimmungen: Froh, Entspannt, Energetisch, Melancholisch, Traurig, Aggressiv
const mood = (mood, callback) => {
    const result = [];
    for(const cocktail of cocktails) {
        if(cocktail["mood"].toUpperCase() == mood.toUpperCase()){
            result.push(cocktail);
        }
    }

    return callback(null, result);
}




//Debuggen 
function main() {
    var pref = ["Ramazzotti", "Vanillesirup"];
    var hass = ["Eiswürfel"];

    /*
    assignmood((err,result) => {
    })
    */

    /*
    mood("aggressiv",(err,result) => {
        console.log(result);
    })
    */
          
} 

main();


//Verworfene oder Entwicklungs-Funktionen
//---------------------------------------


/*
//Cocktails ohne Alkohol ausgeben
const alcoholfree = (callback) => {
    var ergebnis = [];
    var alcohol = ["Wodka","Rum","Rotwein","Jägermeister","Rum (weiß)","Rum (braun)","Himbeergeist","Cognac","Sekt","Pitu","Pitu (Zuckerrohrschnaps)","Tequila","Pimm s Cup No. 1","Weinbrand","Prosecco","Baileys","Belvedere Pomerancza","Cachaca","Rum (Havanna Club)","Campari","Batida de Coco","Vodka","Rum Havanna Club 3 anos","Rum weiß","weißer Rum (z.b. Bacardi od. Havana Club)","Rum (weiß, z.b. Bacardi od. Havana Club)","Rum (weiß z.b. Bacardi oder Havana Club)","Bacardi (weißer Rum)","Kaffeelikör","Gin","Brandy","Cointreau","Blue Curacao","Passoa","weißen Rum","Champagner","brauner Rum","Pink Gin","Rum, weißer","Rum, brauner","Rum, braun"];
    preference(null, alcohol, (err, result) =>{
        ergebnis = result;
    })
    return callback(null, ergebnis);
}

//Funktion zum checken, welche Cocktails noch keine Mood assigned haben. Nur zum Entwicklungsprozess
const checkmood = (callback) => {
    const ergebnis = [];
    for(const cocktail of cocktails) {
        if(cocktail["mood"] == undefined){
            ergebnis.push(cocktail);
        }
    }

    return callback (null, ergebnis);
}

//Liefert Cocktails mit bestimmten Schlagwörtern im Teaser (vielleicht brauchen wirs um Cocktails für Stimmungen zu liefern?)
const teaser = (mood, callback) => {
    const ergebnis = [];
    for (const cocktail of cocktails) {
        if(cocktail["teaser"].toUpperCase().includes(mood.toUpperCase())) ergebnis.push(cocktail)
    }
    return callback (null, ergebnis);
}

*/