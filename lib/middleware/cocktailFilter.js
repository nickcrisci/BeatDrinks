const filterCocktail = function(req, res, next) {

    const cocktails = req.cocktails || [];
    const want = req.want || [];
    const hate = req.hate || [];
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
    
    req.cocktails = ergebnis;

    return next();
}

module.exports = cocktailFilter;