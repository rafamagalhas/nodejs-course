module.exports = function(application){
	application.get('/cadastro', function(req, res){
		application.app.controllers.register.cadastro(application, req, res);
	});

	application.get('/return', function(req, res){
		application.app.controllers.register.return(application, req, res);
	});

	application.post('/cadastrar', function(req, res){
		application.app.controllers.register.cadastrar(application, req, res);
	});
}