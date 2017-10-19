module.exports = function(application){
	application.get('/game', function(req, res){
		application.app.controllers.game.jogo(application, req, res);
	});

	application.get('/exit', function(req, res){
		application.app.controllers.game.exit(application, req, res);
	});
}