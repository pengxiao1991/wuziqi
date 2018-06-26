"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const cors = require("koa2-cors"); // 用来解决跨域问题
const bodyParser = require("koa-bodyparser"); //解决post请求体解析问题
const staticServer = require("koa-static"); //静态文件服务器
const path = require("path");
const etag = require("koa-etag");
const RouterController = require("./controller/routes/index");
/**
 * 服务器类
 */
/**
 * WuziqiServer
 */
class WuziqiServer {
    constructor() {
        this.app = null;
        this.app = new Koa();
    }
    init() {
        this.app.use(bodyParser());
        //跨域
        this.app.use(cors({
            origin: function (ctx) {
                return "*"; // 允许来自所有域名请求
            },
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
            maxAge: 5,
            credentials: true,
            allowMethods: ['GET', 'POST', 'DELETE'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        }));
        this.app.use(async (ctx, next) => {
            await next();
            if (ctx.fresh) {
                ctx.status = 304;
            }
        });
        this.app.use(etag());
        // 静态资源不用服务端处理
        this.app.use(staticServer(path.join(__dirname, '..', 'static'), { maxage: 3600 * 1000 }));
        // app 挂载路由模块
        new RouterController(this.app).init();
        //端口监听
        this.app.listen(3009);
    }
}
const wuziqiServer = new WuziqiServer();
wuziqiServer.init();
//# sourceMappingURL=main.js.map