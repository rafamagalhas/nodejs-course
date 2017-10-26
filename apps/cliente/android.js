var http = require('http');

var options = {
  hostname: 'localhost',
  port: '80',
  path: '/',
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-type' : 'application/json'

  }
};

var buffer_body_content = [];
/*var html = 'nome=José';
var json = {
  nome: 'José'
}
*/

var req = http.request(options, function(res){
  res.on('data', function(piece){
    buffer_body_content.push(piece);
  });

  res.on('end', function(){
    var content_resp = Buffer.concat(buffer_body_content).toString();
    console.log(content_resp);
  });
});

//req.write(JSON.stringify(json));
req.end();