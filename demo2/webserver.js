var ws = require("nodejs-websocket")

var PORT = 3000;

var clientCount = 0;
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++;
	conn.nickname = 'user' + clientCount;
	var mes = {};
	mes.type = "enter";
	mes.data = conn.nickname + 'comes in!'
	boradcast(JSON.stringify(mes));
	conn.on("text", function (str) {
		console.log("Received " + str)
		var mes = {};
		mes.type = "message";
		mes.data = conn.nickname + "says:"+str;
		boradcast(JSON.stringify(mes));
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		var mes = {};
		mes.type = "left";
		mes.data = conn.nickname + 'left'
		boradcast(JSON.stringify(mes));
	})
	conn.on("err", function (err) {
		console.log("handle err");
		console.log(err);
	})
}).listen(PORT)
console.log("webSocket comes in " + PORT);
function boradcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str);
	})
}