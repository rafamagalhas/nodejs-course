var mysql = require('mysql');

//Embrulhando a conexão com o DB
var connMySql = function(){
	console.log('conectou com o bd');
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'sysdba',
		database: 'portal_noticias'
	});
}

module.exports = function() {
	console.log('Criou o modulo para conexão com o BD');
	return connMySql;
}
