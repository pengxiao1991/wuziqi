import Koa = require('koa');
import cors = require('koa2-cors'); // 用来解决跨域问题
import bodyParser = require('koa-bodyparser');
import routes = require('./controller/routes/index');


/**
 * 服务器类
 */

/**
 * WuziqiServer
 */
class WuziqiServer {
    constructor() {
        this.app = new Koa();
    }
    public app = null;
    public init () {
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

        // routes(this.app);

        //端口监听
        this.app.listen(3009);
    }
}
const wuziqiServer = new WuziqiServer();
wuziqiServer.init();