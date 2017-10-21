function GameDAO(connection){
  this._connection = connection();
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

GameDAO.prototype.gameStart = function(res, user, house, invalid_command){
  this._connection.open( function(err, mongoclient){
		mongoclient.collection("game", function(err, collection){
			collection.find({user: user}).toArray( function(err, result){
        console.log(result);
        res.render("jogo", {houseImg: house, gameParameters: result[0], invalid_command: invalid_command});
        mongoclient.close;
      });
		});
	});	
}

module.exports = function(){
  return GameDAO;
}