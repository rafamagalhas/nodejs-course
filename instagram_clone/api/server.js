var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb');

var app = express();

/* middleware bodyParser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db = new mongodb.Db(
  'instagram',
  new mongodb.Server('localhost', 27017, {}),
  {}
);

var port = 8080;
app.listen(port);
console.log('O servidor está escutnado na porta ' + port);

app.get('/', function(req, res){
  res.send({msg: 'Olá'});
});

app.post('/api', function(req, res){
  var data = req.body;

  db.open( function(err, mongoclient){
    mongoclient.collection('posts', function(err, collection){
      collection.insert(data, function(err, result){
        if(err){
          res.json(err);
        } else{
          res.json(result);
        }
        mongoclient.close;
      });
    });
  });
});

