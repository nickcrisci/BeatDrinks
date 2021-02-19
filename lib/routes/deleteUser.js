"use strict";

const path = require('path'),
      fs = require('fs');

const createErrorObject = require(path.join(__dirname, "..", "modules", "createErrorObject"));

const userPath = path.join(__dirname, "..", "data", "users.json");
   
const deleteUser = function(req, res) {

    const id = req.params.id;

    fs.readFile(userPath, "utf8", (err, data) => {

        if(err) {
            const error = createErrorObject({ status: 500, title: err.message });
            return res.status(500).send(error);
        }

        const users = JSON.parse(data);

        // Iterating backwards because splice changes the index
        for (let i = users.length - 1; i >= 0; i--) {
            if (users[i].id == id) {
                users.splice(i, 1);
                return fs.writeFile(userPath, JSON.stringify(users, null, 4), "utf8", () => {
                    res.status(204).end();
                });
            } 
        }

        const error = createErrorObject({ status: 404, title: "Not found"});
        return res.status(404).send(error);
        
    });

}

module.exports = deleteUser;