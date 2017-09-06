var express = require('express');
var consign = require('consign'); //autoloader
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser({extentend: true}));
app.use(expressValidator());

consign()
	.include('./app/routes')
	.then('./config/dbConnection.js')
	.then('./app/models/NoticiasDAO.js')
	.into(app);

module.exports = app;