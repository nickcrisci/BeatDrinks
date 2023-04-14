const path = require('path');
const fs = require('fs');

const userPath = path.join(__dirname, '..', 'data', 'users.json');

const createErrorObject = require('../modules/createErrorObject');

const patchUser = (req, res) => {
  const { body } = req;

  const users = JSON.parse(fs.readFileSync(userPath, 'utf8'));

  // eslint-disable-next-line no-restricted-syntax
  for (const user of users) {
    if (user.id === req.params.id) {
      if (body.name) {
        user.name = body.name;
      }
      if (body.musicPreferences) {
        user.musicPreferences = body.musicPreferences;
      }
      if (body.cocktailPreferences) {
        user.cocktailPreferences = body.cocktailPreferences;
      }

      fs.writeFile(userPath, JSON.stringify(users, null, 4), 'utf8', (err) => {
        if (err) {
          console.log(err.message);
        }
      });

      const location = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

      return res.status(200)
        .set('Location', `${location}`) // The "location headers" value is the absolute URI of the created User Object
        .json({ data: user });
    }
  }

  const error = createErrorObject({ status: 404, title: 'User not found', source: { parameter: 'id' } });
  return res.status(404).send(error);
};

module.exports = patchUser;
