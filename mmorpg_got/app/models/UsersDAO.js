function UsersDAO(connection){
	this._connection = connection();
}

UsersDAO.prototype.userInsert = function(user){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){
			collection.insert(user);
			mongoclient.close;
		});
	});	
}

UsersDAO.prototype.userAuthentication = function(user, req, res){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){
			collection.find(user).toArray( function(err, result){
				if(result[0] != undefined){
					req.session.autorizado = true;
					req.session.user = result[0].user;
					req.session.pass = result[0].pass;
				}
				
				if(req.session.autorizado){
					res.redirect("game");
				} else {
					res.render('index', {validation: {}});
				}
			});
			mongoclient.close;
		});
	});	
}

module.exports = function(){
	return UsersDAO;
}
