module.exports = function(application){
	
	application.get('/noticia', function(req, res){

		var connection = application.config.dbConnection();
		var noticiasModel = new application.app.models.NoticiasDAO(connection);
		console.log(noticiasModel);
		noticiasModel.getNoticia( function(err, result){
			res.render("noticias/noticia", {noticia : result});
		});
	});
}