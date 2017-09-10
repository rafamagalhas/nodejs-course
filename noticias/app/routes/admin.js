module.exports = function(application){
	application.get('/formulario_inclusao_noticias', function(req, res){
		application.app.controllers.admin.formulario_inclusao_noticias(application, req, res);
	});

	application.post('/noticias/salvar', function(req, res){
		application.app.controllers.admin.noticia_salvar(application, req, res);
	});
}
