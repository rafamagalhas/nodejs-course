module.exports = function(application){
	application.get('/', function(req, res){

		res.format({
			html: function(){
				res.send('Bem vindi a sua app NodeJS!');
			},
			json: function(){
				var resp = {
					body: 'Bem vindo a sua app NodeJS!'
				}
				res.json(resp);
			}
		});
	});
}