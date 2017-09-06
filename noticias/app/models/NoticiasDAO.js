function NoticiasDAO(connection){
	this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){
	this._connection.query('select * from noticias', callback);
}

NoticiasDAO.prototype.getNoticia = function(callback){
	this._connection.query('select * from noticias where id_noticia = 1', callback);
} 

NoticiasDAO.prototype.setNoticia = function(noticia, callback){
	this._connection.query('insert into noticias set ?', noticia, callback);
}

module.exports = function(){
	return NoticiasDAO;
}