var ws = require("nodejs-websocket")

var PORT = 3000;

var clientCount = 0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++;
	conn.nickname = 'user' + clientCount;
	boradcast(conn.nickname + 'comes in');
	conn.on("text", function (str) {
		console.log("Received "+str)
		// conn.sendText(str.toUpperCase()+"!!!")
		// conn.sendText(str);
		boradcast(str);
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		boradcast(conn.nickname + 'left');
	})
	conn.on("err",function(err){
		console.log("handle err");
		console.log(err);
	})
}).listen(PORT)

function boradcast(str){
	server.connections.forEach(function(connection){
		connection.sendText(str);
	})
}