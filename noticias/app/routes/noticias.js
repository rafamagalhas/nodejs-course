module.exports = function(application){

	application.get('/noticias', function(req, res){
		application.app.controllers.noticias.noticias	(application, req, res);
	});
}