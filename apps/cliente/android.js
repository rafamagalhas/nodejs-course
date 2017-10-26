var http = require('http');

var options = {
  hostname: 'localhost',
  port: '80',
  path: '/',
  headers: {
    'Accept': 'application/json'
  }
};

var buffer_body_content = [];
http.get(options, function(res){

  res.on('data', function(piece){
    buffer_body_content.push(piece);
  });

  res.on('end', function(){
    var content_resp = Buffer.concat(buffer_body_content).toString();
    console.log(content_resp);
  });

});