module.exports.noticia = function(application, req, res){
	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection);
	noticiasModel.getNoticia( function(err, result){
		res.render("noticias/noticia", {noticia : result});
	});
}

module.exports.noticias = function(application, req, res){
	var connection = application.config.dbConnection();
	var noticiasModel = new application.app.models.NoticiasDAO(connection);
	noticiasModel.getNoticias( function(err, result){
		res.render("noticias/noticias", {noticias : result});
	});
}