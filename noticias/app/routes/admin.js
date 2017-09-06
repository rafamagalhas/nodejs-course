module.exports = function(application){
	application.get('/formulario_inclusao_noticias', function(req, res){
		res.render("admin/form_add_noticia");
	});

	application.post('/noticias/salvar', function(req, res){
		var noticia = req.body;
		var connection = application.config.dbConnection();
		var noticiasModel = new application.app.models.NoticiasDAO(connection);

		noticiasModel.setNoticia(noticia, function(err, result){
			res.redirect("/noticias");
		});
	});
}
