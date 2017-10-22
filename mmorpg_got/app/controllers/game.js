module.exports.jogo = function(application, req, res){
	if(req.session.authorized !== true){	
		res.send("É preciso efetuar login primeiro!");
		return;
	}

	var msg = '';

	if(req.query.msg != ''){
		msg = req.query.msg;
	}
	
	var user = req.session.user;
	var house = req.session.house;

	/* DB connection settings */
	var connection = application.config.dbConnection;
	var GameDAO = new application.app.models.GameDAO(connection);
	
	GameDAO.gameStart(res, user, house, msg);
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

	var connection = application.config.dbConnection;
	var GameDAO = new application.app.models.GameDAO(connection);

	var user = req.session.user;

	GameDAO.getActions(user, res);
}

module.exports.villager_action_order = function(application, req, res){
	if(req.session.authorized !== true){	
		res.send("É preciso efetuar login primeiro!");
		return;
	}

	var formData = req.body;

	req.assert('actionId', 'Ação deve ser informada').notEmpty();
	req.assert('qtd', 'Quantidade deve ser informada').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.redirect('game?msg=E');
		return;
	}

	var connection = application.config.dbConnection;
	var GameDAO = new application.app.models.GameDAO(connection);

	formData.user = req.session.user;
	GameDAO.addAction(formData);
	res.redirect('game?msg=A');
}
