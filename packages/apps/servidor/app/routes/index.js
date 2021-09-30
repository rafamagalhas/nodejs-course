module.exports = function(application){
	application.get('/', function(req, res){

		res.format({
			html: function(){
				res.send('Bem vindo a sua app NodeJS!');
			},
			json: function(){
				var resp = {
					body: 'Bem vindo a sua app NodeJS!'
				}
				res.json(resp);
			}
		});
	});

	application.post('/', function(req, res){
		var data = req.body;
		res.send(data);
	});
}