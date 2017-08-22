// var ws = require("nodejs-websocket")

var app = require('http').createServer()
var io = require('socket.io')(app);
// var fs = require('fs');
var PORT = 3000;

var clientCount = 0;
app.listen(PORT);
// Scream server example: "hi" -> "HI!!!"
io.on('connection', function (socket) {
	clientCount++;
	socket.nickname = 'user' + clientCount;
	io.emit('enter', socket.nickname + 'comes in!');
	socket.on('message', function (str) {
		io.emit('message', socket.nickname + "says:" + str);
	});
	socket.on('disconnect', function (str) {
		io.emit('leave', socket.nickname + "left");
	});
});
// var server = ws.createServer(function (conn) {
// 	console.log("New connection")
// 	clientCount++;
// 	conn.nickname = 'user' + clientCount;
// 	var mes = {};
// 	mes.type = "enter";
// 	mes.data = conn.nickname + 'comes in!'
// 	boradcast(JSON.stringify(mes));
// 	conn.on("text", function (str) {
// 		console.log("Received " + str)
// 		var mes = {};
// 		mes.type = "message";
// 		mes.data = conn.nickname + "says:" + str;
// 		boradcast(JSON.stringify(mes));
// 	})
// 	conn.on("close", function (code, reason) {
// 		console.log("Connection closed")
// 		var mes = {};
// 		mes.type = "left";
// 		mes.data = conn.nickname + 'left'
// 		boradcast(JSON.stringify(mes));
// 	})
// 	conn.on("err", function (err) {
// 		console.log("handle err");
// 		console.log(err);
// 	})
// }).listen(PORT)
console.log("webSocket on listen port: " + PORT);
// function boradcast(str) {
// 	server.connections.forEach(function (connection) {
// 		connection.sendText(str);
// 	})
// }