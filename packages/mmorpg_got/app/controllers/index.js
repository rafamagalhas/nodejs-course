module.exports.index = function(application, req, res){
	res.render('index', {validation: {}, dadosForm: {}});
}

module.exports.authentication = function(application, req, res){
	var formData = req.body;

	req.assert('user', 'Usuário deve ser preenchido!').notEmpty();
	req.assert('pass', 'Senha deve ser preenchida!').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		res.render("index", {validation: errors, dadosForm: formData});
		return;
	}

	/* DB connection settings */
	var connection = application.config.dbConnection;
	var UsersDAO = new application.app.models.UsersDAO(connection);
	UsersDAO.userAuthentication(formData, req, res);
}

module.exports.register = function(res){
	res.render('cadastro', {validation: {}, dadosForm: {}});
}