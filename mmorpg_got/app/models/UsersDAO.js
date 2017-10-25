var crypto = require("crypto");

function UsersDAO(connection){
	this._connection = connection();
}

UsersDAO.prototype.userInsert = function(user){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){

			var criptpass = crypto.createHash("md5").update(user.pass).digest("hex");
			user.pass = criptpass;

			collection.insert(user);
			mongoclient.close;
		});
	});	
}

UsersDAO.prototype.userAuthentication = function(user, req, res){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){
			var criptpass = crypto.createHash("md5").update(user.pass).digest("hex");
			user.pass = criptpass;
			collection.find(user).toArray( function(err, result){
				if(result[0] != undefined){
					req.session.authorized = true;
					
					req.session.user = result[0].user;
					req.session.house = result[0].casa;
				}
				
				if(req.session.authorized){
					res.redirect('game');
				} else {
					var errors = [ { param: 'pass', msg: 'Usuário ou senha incorretos, por favor verifique!', value: '' } ];					
					res.render('index', {validation: errors, dadosForm: user});
				}
			});
			mongoclient.close;
		});
	});	
}

module.exports = function(){
	return UsersDAO;
}
