var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();

//setar variavéis do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

//middlewares
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//autoloader
consign()
	.include('./app/routes')
	.then('./app/models')
	.then('./app/controllers')
	.into(app);

module.exports = app;