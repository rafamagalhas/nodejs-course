var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb');

var app = express();

/* middleware bodyParser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = 8080;

app.listen(port);


app.get('/', function(req, res){
  res.send({msg: 'Olá'});
});

console.log('O servidor está escutnado na porta ' + port);