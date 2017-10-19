module.exports.jogo = function(application, req, res){
	if(req.session.authorized){
		res.render('jogo');
	} else {
		res.send("É preciso efetuar login primeiro!");
	}
}

module.exports.exit = function(application, req, res){
	req.session.destroy( function(err) {
		res.render("index", {validation: {}});
	});
}