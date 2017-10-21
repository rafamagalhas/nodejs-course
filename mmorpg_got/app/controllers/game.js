module.exports.jogo = function(application, req, res){
	if(req.session.authorized !== true){	
		res.send("É preciso efetuar login primeiro!");
	}

	var user = req.session.user;
	var house = req.session.house;

	/* DB connection settings */
	var connection = application.config.dbConnection;
	var GameDAO = new application.app.models.GameDAO(connection);
	
	GameDAO.gameStart(res, user, house);
}

module.exports.exit = function(application, req, res){
	req.session.destroy( function(err) {
		res.render("index", {validation: {}});
	});
}