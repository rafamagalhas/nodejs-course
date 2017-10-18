module.exports = function(application){
	application.get('/game', function(req, res){
		application.app.controllers.game.jogo(application, req, res);
	});
}