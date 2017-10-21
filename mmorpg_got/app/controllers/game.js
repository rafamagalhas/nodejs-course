module.exports.jogo = function(application, req, res){
	if(req.session.authorized !== true){	
		res.send("É preciso efetuar login primeiro!");
		return;
	}

	var invalid_command = 'N';

	if(req.query.invalid_command == 'S'){
		invalid_command = 'S';
	}

	console.log(invalid_command);

	var user = req.session.user;
	var house = req.session.house;

	/* DB connection settings */
	var connection = application.config.dbConnection;
	var GameDAO = new application.app.models.GameDAO(connection);
	
	GameDAO.gameStart(res, user, house, invalid_command);
}

module.exports.exit = function(application, req, res){
	req.session.destroy( function(err) {
		res.render("index", {validation: {}});
	});
}

module.exports.villagers = function(application, req, res){
	if(req.session.authorized !== true){	
		res.send("É preciso efetuar login primeiro!");
		return;
	}

	res.render("aldeoes", {validation: {}});
}

module.exports.scrolls = function(application, req, res){
	if(req.session.authorized !== true){	
		res.send("É preciso efetuar login primeiro!");
		return;
	}

	res.render("pergaminhos", {validation: {}});
}

module.exports.villager_action_order = function(application, req, res){
	if(req.session.authorized !== true){	
		res.send("É preciso efetuar login primeiro!");
		return;
	}

	var formData = req.body;

	req.assert('action', 'Ação deve ser informada').notEmpty();
	req.assert('qtd', 'Quantidade deve ser informada').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.redirect('game?invalid_command=S');
		return;
	}
	res.send("opa está funcionando");
}
