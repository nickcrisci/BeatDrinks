const path = require('path');
const fs = require('fs');

const userPath = path.join(__dirname, '..', 'data', 'users.json');

const createErrorObject = require('../modules/createErrorObject');

/*
* This Function has a side effect. It alters the provided user object instead of returning it.
* This has to be changed in the future, since it is not a good style.
* For now this is sufficient
*/
const updateUserData = (user, data) => {
  user.name = data.name != null ? data.name : user.name;
  user.musicPreferences = data.musicPreferences != null ? data.musicPreferences : user.musicPreferences;
  user.cocktailPreferences = data.cocktailPreferences != null ? data.cocktailPreferences : user.cocktailPreferences;
}

/**
 * 
 * Should be changed to Async call.
 * Since this has to be reworked when adding a real database
 * this is sufficient for now
 */
const updateUserFile = (data) => {
  fs.writeFileSync(userPath, JSON.stringify(data, null, 4), 'utf8');
}

const patchUser = (req, res) => {
  const { body } = req;

  const users = JSON.parse(fs.readFileSync(userPath, 'utf8'));
  let userToUpdate = users.find(user => user.id === parseInt(req.params.id, 10));

  if (!userToUpdate) {
    const error = createErrorObject({ status: 404, title: 'User not found', source: { parameter: 'id' } });
    return res.status(404).send(error);
  }

  updateUserData(userToUpdate, body);
  updateUserFile(users);

  const location = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  return res.status(200)
    .set('Location', `${location}`) // The "location headers" value is the absolute URI of the created User Object
    .json({ data: userToUpdate });
};

module.exports = patchUser;
