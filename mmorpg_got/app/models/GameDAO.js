function GameDAO(connection){
  this._connection = connection();
}

function actionEndsAt(actionId){
  var date = new Date();
  var time = null;

  switch (actionId){
    case "1": time = 1 * 60 * 60000;
    case "2": time = 2 * 60 * 60000;
    case "3": time = 5 * 60 * 60000;
    case "4": time = 5 * 60 * 60000;
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

GameDAO.prototype.action = function(action){
  this._connection.open(function(err, mongoclient){
    mongoclient.collection("actions", function(err, collection){
      action.action_ends_at = actionEndsAt(action.actionId);
      collection.insert({action});
      mongoclient.close();
    });
  });
}

module.exports = function(){
  return GameDAO;
}