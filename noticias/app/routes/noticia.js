module.exports = function(application){
	application.get('/noticia', function(req, res){
		application.app.controllers.noticias.noticia(application, req, res);
	});
}