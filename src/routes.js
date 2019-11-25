const express = require("express");
const devcontroller = require('./controllers/DevController');
const likecontroller = require('./controllers/LikesController');
const dislikecontroller = require('./controllers/DislikesController');
const routes = express.Router();


routes.get('/devs', devcontroller.index);
routes.post('/insdev', devcontroller.store);
routes.post('/dev/:devId/like', likecontroller.store);
routes.post('/dev/:devId/dislike', dislikecontroller.store);

module.exports = routes;