module.exports.formulario_inclusao_noticias = function(application, req, res){
	res.render("admin/form_add_noticia", {validacao : {}, noticia : {}});
}

module.exports.noticia_salver = function(application, req, res){
	var noticia = req.body;
		
	req.assert('titulo', 'Título é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo é obrigatório').notEmpty();
	req.assert('resumo', 'Resumo deve conter de 10 à 100 caracteres').len(10, 100); 
	req.assert('autor', 'Autor é obrigatória').notEmpty();
	req.assert('data_noticia', 'Data é obrigatória').notEmpty().isDate;
	req.assert('noticia', 'Conteúdo da notícia é obrigatória').notEmpty();

	var errors = req.validationErrors();
	if (errors){
		res.render("admin/form_add_noticia", {validacao : errors, noticia : noticia});
		return;
	}

	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection);

	noticiasModel.setNoticia(noticia, function(err, result){
		res.redirect("/noticias");
	});
}