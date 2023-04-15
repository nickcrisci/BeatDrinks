const filterCocktail = (req, res, next) => {
  const cocktails = req.cocktails || [];
  const user = req.user || {};
  const cocktailPreferences = user.cocktailPreferences || null;

  let results = [];

  const cocktailListSize = 4;

  let include;
  let exclude;

  if (cocktailPreferences) {
    include = cocktailPreferences.include || null;
    exclude = cocktailPreferences.exclude || null;
  } else {
    include = null;
    exclude = null;
  }

  if (include && include.length < 1) include = null;
  if (exclude && exclude.length < 1) exclude = null;

  // Throws an error if both include and exclude are null
  if (!include && !exclude) {
    if (cocktails.length > cocktailListSize) {
      req.cocktails = req.cocktails.slice(0, cocktailListSize);
    }
    return next();
  }

  cocktails.array.forEach((cocktail) => {
    let includeBool = false;
    let excludeBool = false;
    cocktail.ingredients.forEach((ingredient) => {
      if (include == null) {
        includeBool = true;
      } else if (include.some((element) => element === ingredient.name)) {
        includeBool = true;
      }

      if (exclude.some((element) => element === ingredient.name)) {
        excludeBool = true;
      }
    });

    /* for (const ingredient of cocktail.ingredients) {
      if (include == null) {
        includeBool = true;
      } else if (include.some((element) => element == ingredient.name)) {
        includeBool = true;
      }

      if (exclude.some((element) => element == ingredient.name)) {
        excludeBool = true;
        break;
      }
    } */
    if (includeBool && !excludeBool) {
      results.push(cocktail);
    }
  });

  /* for (const cocktail of cocktails) {
    let includeBool = false;
    let excludeBool = false;
    for (const ingredient of cocktail.ingredients) {
      if (include == null) {
        includeBool = true;
      } else if (include.some((element) => element == ingredient.name)) {
        includeBool = true;
      }

      if (exclude.some((element) => element == ingredient.name)) {
        excludeBool = true;
        break;
      }
    }
    if (includeBool && !excludeBool) {
      results.push(cocktail);
    }
  } */

  if (results.length > cocktailListSize) {
    results = results.slice(0, cocktailListSize);
  }

  req.cocktails = results;

  return next();
};

module.exports = filterCocktail;
