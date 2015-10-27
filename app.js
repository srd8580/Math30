var express = require('express');
var app = express();

function normalizePort(val) {
		var port = parseInt(val, 10);

		if (isNaN(port)) {
			// named pipe
			return val;
		}

		if (port >= 0) {
			// port number
			return port;
		}

		return false;
}

app.use(express.static('.'));
app.set('port', normalizePort(process.env.PORT || '3000'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

