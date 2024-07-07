const express = require("express");
const session = require('express-session');
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.SECRET;

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

global.loggedInUserId = null;
app.use(express.json());

const routes = require("./api/routes/routes.js");
app.use("", routes);

module.exports = app;