module.exports = function(application){
	
	application.get('/noticia', function(req, res){

		var connection = application.config.dbConnection();
		var noticiasModel = application.app.models.noticiasModel;

		noticiasModel.getNoticia(connection, function(err, result){
			res.render("noticias/noticia", {noticia : result});
		});
	});
}