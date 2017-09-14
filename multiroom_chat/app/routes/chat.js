module.exports = function(application){
	application.get('/chat', function(req, res){
		res.render('chat');
	});

	application.post('/chat', function(req, res){
		res.render('chat');
	});
}