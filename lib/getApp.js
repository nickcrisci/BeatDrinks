const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');

// Middleware for User Paths
const userParamCheck = require('./middleware/userParamCheck');
const getUserMidd = require('./middleware/getUserMidd');
const limitUser = require('./middleware/limitUser');
const paginateUser = require('./middleware/paginateUser');

const getCombination = require('./middleware/getCombination');
const cocktailFilter = require('./middleware/cocktailFilter');

const app = express();

app.use(bodyParser.json());

// User Routes
app.get('/users/:id?', getUserMidd, paginateUser, limitUser, routes.getUser);
app.delete('/users/:id', routes.deleteUser);
app.patch('/users/:id', routes.patchUser);
app.post('/users', userParamCheck, routes.postUser);

// Combination Routes
app.get('/combination/track/:userId?', getCombination, cocktailFilter, routes.getTrackCombination);
app.get('/combination/playlist/:userId?', getCombination, cocktailFilter, routes.getTrackCombination);

module.exports = app;
