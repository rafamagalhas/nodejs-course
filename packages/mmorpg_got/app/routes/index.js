module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.index(application, req, res);
	});

	application.post('/authentication', function(req, res){
		application.app.controllers.index.authentication(application, req, res);
	});

	application.get('/register', function(req, res){
		application.app.controllers.index.register(res);
	});
}