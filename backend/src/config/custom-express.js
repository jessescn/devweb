const express = require('express');
require('dotenv').config()
const app = express();
const routes = require("../routes")
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(routes)

module.exports = app;