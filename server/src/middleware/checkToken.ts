// 验证token,返回token
import jwt = require('jsonwebtoken');
export = async function (ctx, next) {
	let tokenContain = ctx.request.body || ctx.headers;
	let access_token = tokenContain.access_token || tokenContain["authorization"];
	if (access_token) {
		await new Promise((resolve, reject) => {
			jwt.verify(access_token, process.env.JWT_SECRET, (error, decode) => {
				if (error) {
					ctx.body = {
						code: 401,
						message: "授权已经过期，请重新登陆"
					};
				} else if (decode) {
					resolve(decode);
				}
			});
		}).then(async (decode) => {
			ctx.state.user_id = JSON.parse(decode['name'])['user_id']
			await next();
		})

	}
	else {
		ctx.body = {
			code: 401,
			message: "授权已经过期，请重新登陆"
		};
	}
}
