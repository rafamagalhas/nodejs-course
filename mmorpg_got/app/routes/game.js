module.exports = function(application){
	application.get('/jogo', function(req, res){
		application.app.controllers.game.jogo(application, req, res);
	});
}