var ObjectID = require('mongodb').ObjectID;

function GameDAO(connection){
  this._connection = connection();
}

function actionEndsAt(actionId){
  var date = new Date();
  var time = null;

  switch (parseInt(actionId)){
    case 1: time = 1 * 60 * 60000;
    case 2: time = 2 * 60 * 60000;
    case 3: time = 5 * 60 * 60000;
    case 4: time = 5 * 60 * 60000;
  }
  return date.getTime() + time;
}

GameDAO.prototype.parametersGenerate = function(user){
  this._connection.open(function(err, mongoclient){
      mongoclient.collection("game", function(err, collection){
          collection.insert({
              user: user,
              coin: 15,
              villagers: 10,
              fear: Math.floor(Math.random() * 1000),
              knowlegde: Math.floor(Math.random() * 1000),
              trade: Math.floor(Math.random() * 1000),
              magic: Math.floor(Math.random() * 1000)
          });
          mongoclient.close();
      });
  });
}

GameDAO.prototype.gameStart = function(res, user, house, msg){
  this._connection.open( function(err, mongoclient){
		mongoclient.collection("game", function(err, collection){
			collection.find({user: user}).toArray( function(err, result){
        res.render("jogo", {houseImg: house, gameParameters: result[0], msg: msg});
        mongoclient.close;
      });
		});
	});	
}

GameDAO.prototype.addAction = function(action){
  this._connection.open(function(err, mongoclient){
    mongoclient.collection("actions", function(err, collection){
      action.action_ends_at = actionEndsAt(action.actionId);
      collection.insert(action);
    });

    mongoclient.collection("game", function(err, collection){
      var coins_left = null;      
      switch (parseInt(action.actionId)){
        case 1: coins_left = -2 * action.qtd; break;
        case 2: coins_left = -3 * action.qtd; break;
        case 3: coins_left = -1 * action.qtd; break;
        case 4: coins_left = -1 * action.qtd; break;
      }

      collection.update(
        { user: action.user},
        { $inc: {coin: coins_left}}
      );

      mongoclient.close;
    });    
  });
}

GameDAO.prototype.getActions = function(user, res){
  this._connection.open( function(err, mongoclient){
		mongoclient.collection("actions", function(err, collection){
      var date = new Date;
      var currenteTime = date.getTime();
			collection.find({user: user, action_ends_at: {$gt: currenteTime}}).toArray( function(err, result){
        res.render("pergaminhos", {action: result});
        mongoclient.close;
      });
		});
	});	
}

GameDAO.prototype.actionRevogate = function(_id, res){
  this._connection.open( function(err, mongoclient){
		mongoclient.collection("actions", function(err, collection){
			collection.remove(
        {_id: ObjectID(_id)},
        function(err, result){
          res.redirect('/game?msg=R');
          mongoclient.close;
        }
      );      
	  });
	});	  
}

module.exports = function(){
  return GameDAO;
}