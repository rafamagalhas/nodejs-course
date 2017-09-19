module.exports.iniciaChat = function(application, req, res){
	var formData = req.body;

	req.assert('apelido', 'Nome ou apelido são obrigatórios').notEmpty();
	req.assert('apelido', 'Nome ou apelido devem conter entre 3 e 15 caracteres').len(3,15);

	var errors = req.validationErrors();

	if (errors){
		res.render('index', {validacao: errors});
		return;
	}

	application.get('io').emit(
		'msgParaCliente', 
		{apelido: formData.apelido, mensagem: ' acabou de entrar no chat' }
	);

	res.render('chat', {formData: formData});
}