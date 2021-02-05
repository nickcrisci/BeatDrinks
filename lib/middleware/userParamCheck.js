"use strict"

/* User Template:
*   {
*       "name": "Max Mustermann",
        "preferences": [
            { "name" : "acousticness", value: 1.0 },
            /.../
        ],
        id: 1
*   }
*/

const userParamCheck = function (req, res, next) {

    const body = req.body;

    if (!body.name) {
        return res.status(400).send("Name missing.");
    }
/*     if (!body.preferences) {
        return res.status(400).send("Preferences missing.");
    } */
/*     if (!body.cocktailPrefernces) {
        return res.status(400).send("Name missing.");
    } */

    next();
}

module.exports = userParamCheck;