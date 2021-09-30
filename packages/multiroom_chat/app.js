var app = require('./config/server');

// Encapsulando o app.listen (protocolo HTTP)
var server = app.listen(80, function(){
	console.log('Servidor online');
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){
		/* dialogos */
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, 
			 mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		/* participantes */
		if( parseInt(data.apelido_atualizado) == 0 ){
			socket.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);

			socket.broadcast.emit(
				'participantesParaCliente',
				{apelido: data.apelido}
			);

		}
	});
});