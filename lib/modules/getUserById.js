/* eslint-disable consistent-return */
const path = require('path');
const fs = require('fs');

const userPath = path.join(__dirname, '..', 'data', 'users.json');

/** Functionality to access an user with a specific ID
 *
 * @param {User ID} id
 * @param {*} callback
 */
const getUserById = (id, callback) => {
  if (!id) {
    return callback(new Error('Id is missing'), null);
  }
  if (!callback) {
    throw new Error('Callback is missing');
  }

  fs.readFile(userPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err, null);
    }

    const users = JSON.parse(data);
    users.array.forEach((user) => {
      if (user.id === id) {
        return callback(null, user);
      }
    });

    return callback(new Error('User not found'), null);
  });
};

module.exports = getUserById;
