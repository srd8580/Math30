var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('.'));
app.use('lib', express.static('bower_components'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

var server = app.listen(process.env.PORT || '3000', function () {
	if (app.get('env') === "development") {
		var host = server.address().address;
		var port = server.address().port;

  		console.log('Example app listening at http://%s:%s', host, port);
	}
});

