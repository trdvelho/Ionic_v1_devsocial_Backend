const express = require("express");
const routes = require('./routes');
const cors = require('cors');
const server = express();
const mongo = require('mongoose');

mongo.connect('mongodb+srv://trdvelho:devsocial@cluster0-yxtnh.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);