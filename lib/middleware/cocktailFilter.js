const filterCocktail = function(req, res, next) {

    const cocktails = req.cocktails || [],
          user = req.user || {},
          cocktailPreferences = user.cocktailPreferences || null; 
        
    let results = [];

    const cocktailListSize = 4;

    let include, exclude;

    if(cocktailPreferences) {
        include = cocktailPreferences.include || null;
        exclude = cocktailPreferences.exclude || null;
    } else {
        include, exclude = null, null;
    }

    if(include && include.length < 1) include = null;
    if(exclude && exclude.length < 1) exclude = null;

    //Fehler werfen wenn include/exclude null ist
    if (!include && !exclude) {
        if (cocktails.length > cocktailListSize) {
            req.cocktails = req.cocktails.slice(0, cocktailListSize);
            console.log(req.cocktails.length)
        }  
        return next();
    }

    for(const cocktail of cocktails) {
        var includeBool = false;
        var excludeBool = false;
        for (const ingredient of cocktail["ingredients"]) {
            if(include == null) includeBool = true    
            else if (include.some(element => element == ingredient["name"])) {
                includeBool = true;
            }
            if(exclude.some(element => element == ingredient["name"])){
                excludeBool = true;
                break;
            }
        }
        if(includeBool && !excludeBool) results.push(cocktail)  
    }
    
    if (results.length > cocktailListSize) {
        results = results.slice(0, cocktailListSize);
    }  

    req.cocktails = results;

    return next();
}

module.exports = filterCocktail;