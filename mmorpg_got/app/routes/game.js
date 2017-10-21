module.exports = function(application){
	application.get('/game', function(req, res){
		application.app.controllers.game.jogo(application, req, res);
	});

	application.get('/exit', function(req, res){
		application.app.controllers.game.exit(application, req, res);
	});

	application.get('/villagers', function(req, res){
		application.app.controllers.game.villagers(application, req, res);
	});

	application.get('/scrolls', function(req, res){
		application.app.controllers.game.scrolls(application, req, res);
	});

	application.post('/villager_action_order', function(req, res){
		application.app.controllers.game.villager_action_order(application, req, res);
	});
}