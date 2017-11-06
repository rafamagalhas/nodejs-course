var express = require('express'),
    bodyParser = require('body-parser'),
    multiparty = require('connect-multiparty'),
    mongodb = require('mongodb'),
    objectId = require('mongodb').ObjectId,
    fs = require('fs'),
    mv = require('mv');

var app = express();

/* middleware bodyParser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multiparty());

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
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  var date = new Date();
  time_stamp = date.getTime();
  var url_image = time_stamp + '_' + req.files.file.originalFilename;
  var fromPath = req.files.file.path;
  var toPath = './uploads/' + url_image;
  
  mv(fromPath, toPath, function(err){
    if(err){
      res.status(500).json({error: err});
      return;
    }

    var data = {
      title: req.body.title,
      img_post: url_image,
    }

    db.open( function(err, mongoclient){
      mongoclient.collection('posts', function(err, collection){
        collection.insert(data, function(err, result){
          if(err){
            res.json(err);
          } else{
            res.json({result});
          }
          mongoclient.close();
        });
      });
    });
  });
});

// GET find data
app.get('/api', function(req, res){
  res.setHeader("Access-Control-Allow-Origin", "*");
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

// PUT - data updated
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

app.get('/images/:img', function(req, res){
  var image = req.params.img;

  fs.readFile('./uploads/'+image, function(err, content){
    if(err){
      res.status(400).json(err);
      return;
    }

    res.writeHead(200, {
      'content-type': 'image/jpg'
    });
    res.end(content);
  })
});

// DELETE - data removeded
app.delete('/api/:id', function(req, res){
  db.open( function(err, mongoclient){
    mongoclient.collection('posts', function(err, collection){
      collection.remove( { _id:  objectId(req.params.id)}, function(err, result){
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

