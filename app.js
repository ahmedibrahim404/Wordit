const express = require('express');
const app = express();
const dotenv = require('dotenv').config({path:__dirname+'/.env'});
const PORT = require('./config').PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running over port " + PORT);
});