module.exports = function(application){
	application.get('/formulario_inclusao_noticias', function(req, res){
		res.render("admin/form_add_noticia");
	});

	application.post('/noticias/salvar', function(req, res){
		var noticia = req.body;
		
		req.assert('titulo', 'Título é obrigatório').notEmpty();
		req.assert('resumo', 'Resumo é obrigatório e deve conter de 10 à 100 caracteres').notEmpty().len(10, 100); 
		req.assert('autor', 'Autor é obrigatória').notEmpty();
		req.assert('data_noticia', 'Data é obrigatória').notEmpty();//.isDate({format: 'YYYY-MM-DD'});
		req.assert('noticia', 'Conteúdo da notícia é obrigatória').notEmpty();

		var error = req.validationErrors();
		console.log(error);
		if (error){
			res.render("admin/form_add_noticia");
			return;
		}

		var connection = application.config.dbConnection();
		var noticiasModel = new application.app.models.NoticiasDAO(connection);

		noticiasModel.setNoticia(noticia, function(err, result){
			res.redirect("/noticias");
		});
	});
}
