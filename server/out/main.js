"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var child_process = require("child_process");
console.log(child_process, 666);
console.log('632');
var port = process.env.port || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
console.log("Server Started! Please visit http://127.0.0.1:" + port);
//# sourceMappingURL=main.js.map