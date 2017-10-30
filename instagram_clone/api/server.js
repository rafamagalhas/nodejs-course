var express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    objectId = require('mongodb').ObjectId;

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

// POST - insert data
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
        mongoclient.close();
      });
    });
  });
});

// GET find data
app.get('/api', function(req, res){
  db.open( function(err, mongoclient){
    mongoclient.collection('posts', function(err, collection){
      collection.find().toArray(function(err, results){
        if(err){
          res.json(err);
        } else{
          res.json(results);
        }
        mongoclient.close();
      });        
    });
  });
});

// GET by ID to find a specific Id
app.get('/api/:id', function(req, res){
  db.open( function(err, mongoclient){
    mongoclient.collection('posts', function(err, collection){
      collection.find(objectId(req.params.id)).toArray(function(err, results){
        if(err){
          res.json(err);
        } else{
          res.json(results);
        }
        mongoclient.close();
      });        
    });
  });
});

// POUT - data updated
app.put('/api/:id', function(req, res){
  db.open( function(err, mongoclient){
    mongoclient.collection('posts', function(err, collection){
      collection.update(
        { _id:  objectId(req.params.id)},
        {$set: {titulo: req.body.titulo}},
        {},
        function(err, result){
          if(err){
            res.json(err);
          } else{
            res.json(result);
          }
          mongoclient.close();
        }
      );        
    });
  });
});
