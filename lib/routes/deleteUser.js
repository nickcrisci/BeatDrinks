const path = require('path');
const fs = require('fs');

const createErrorObject = require('../modules/createErrorObject');

const userPath = path.join(__dirname, '..', 'data', 'users.json');

const findUserIndex = (users, userId) => {
  const filter = (user) => user.id === userId;
  const userIndex = users.findIndex(filter);
  return userIndex;
};

const loadUsers = () => {
  const users = fs.readFileSync(userPath, 'utf8');
  return JSON.parse(users);
};

const updateUsers = (users, userIndex) => {
  users.splice(userIndex, 1);
  fs.writeFileSync(userPath, JSON.stringify(users, null, 4), 'utf8');
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const users = loadUsers();
  const userIndex = findUserIndex(users, id);

  if (userIndex === -1) {
    const error = createErrorObject({ status: 404, title: 'Not found' });
    return res.status(404).send(error);
  }

  updateUsers(users, userIndex);
  return res.status(204).end();
};

module.exports = deleteUser;
