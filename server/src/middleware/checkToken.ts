// 验证token,返回token
import jwt = require('jsonwebtoken');
export = function (ctx,next) {
  let tokenContain = ctx.body || ctx.query || ctx.headers;
  let token = tokenContain.token || tokenContain["authorization"];
  // let token = ctx.request.headers['authorization'].split(' ')[1];

  if (token) {
    jwt.decode(token, process.env.JWT_SECRET,(error,decode) => {
      if (error) {
        ctx.body = {
            code: 401,
            message: "授权已经过期，请重新登陆"
        };
      } else if (decode) {
        next();
      }
    });
   
   
  }
  else {
    ctx.body = {
        code: 401,
        message: "授权已经过期，请重新登陆"
    };
  }
}
