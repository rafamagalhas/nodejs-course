var app = require('./config/server.js');

var homeRoute = require('./app/routes/home')(app);
var noticiasRoute = require('./app/routes/noticia')(app);
var addNoticiaRoute = require('./app/routes/formulario_inclusao_noticia')(app);

app.listen(3000, function(){
	console.log("Servidor ON");
});