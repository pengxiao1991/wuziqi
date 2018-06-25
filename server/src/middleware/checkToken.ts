// 验证token,返回token
import jwt = require('jsonwebtoken');
export = async function (ctx, next) {
	let tokenContain = ctx.request.body || ctx.headers;
	let token = tokenContain.access_token || tokenContain["authorization"];
	if (token) {
		await new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
				if (error) {
					ctx.body = {
						code: 401,
						message: "授权已经过期，请重新登陆"
					};
				} else if (decode) {
					resolve(decode);
					next();
				}
			});
		})

	}
	else {
		ctx.body = {
			code: 401,
			message: "授权已经过期，请重新登陆"
		};
	}
}
