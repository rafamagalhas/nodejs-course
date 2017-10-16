module.exports.cadastro = function(application, req, res){
	res.render('cadastro', {validation: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){
	var formData = req.body;

	req.assert('name', 'Nome deve ser preenchido').notEmpty();
	req.assert('user', 'Usuário deve ser preenchido').notEmpty();
	req.assert('pass', 'Senha deve ser preenchido').notEmpty();
	req.assert('casa', 'Casa deve ser preenchido').notEmpty();

	var errors = req.validationErrors();
	if ( errors.length > 0 ){
		res.render('cadastro', {validation: errors, dadosForm: formData});
		return;
	}

	/* DB connection settings */
	var connection = application.config.dbConnection;
	var UsersDAO = new application.app.models.UsersDAO(connection);
	UsersDAO.userInsert(formData);

	res.send('podemos cadastrar');
} 