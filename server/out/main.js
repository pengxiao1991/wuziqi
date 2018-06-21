"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const BaseModel = require("./model/BaseModel");
console.log(BaseModel, 6669);
/**
 * name
 */
// class Haha extends BaseModel {
//     constructor(parameters) {
//         super();
//     }
// }
var port = process.env.port || 1337;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
//# sourceMappingURL=main.js.map