// TypeScript file
import Router = require('koa-router');
import checkToken = require('../../middleware/checkToken');
import login = require('./login/login');

const router = new Router();

// const classify = require('./classify');
// const article = require('./article');

class RouterController {
	constructor(app) {
		this.app = app;
	}
	public app = null;
	public init() {
		// 错误处理
		this.app.use((ctx,next) => {
			try {
				next();
			} catch (error) {
				// 用于捕捉所有路由请求的错误
				ctx.response.status = 200;
				ctx.body = error;
			}
		});
		

		// 验证登录接口
		router.all(/auth/,checkToken);

		//路由表 allowedMethods在异常时丰富响应头
		this.app.use(router.routes()).use(router.allowedMethods());

		router.use('/api/login',login.routes(),login.allowedMethods());
		// router.use('/api/classify',classify.routes(),classify.allowedMethods());
		// router.use('/api/article',article.routes(),article.allowedMethods());

	}
}


export = RouterController;