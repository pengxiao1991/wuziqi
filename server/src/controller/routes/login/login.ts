

import Router = require('koa-router');
import user  =  require('../../../model/user');
const router = new Router();

import createToken = require('../../../util/createToken');
import sha1 = require('sha1'); //加密

router
.post('/login',async(ctx)=>{
    let name = ctx.request.body.account;
    let password = sha1(ctx.request.body.password);
    await user.login(name,password)
        .then(data => {
            
            if (data['length']) {
                 // 用户名存在通过验证
                ctx.body = {
                    code: 200,
                    data:data,
                    token: createToken(name + data[0]['user_id'] + Date.now())

                };
                
            } else {
                // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册()
                ctx.body = {
                    code: 9001268,
                    message: '用户名或密码错误'
                };
            }
        }).catch(err => {
            // 查找数据库发生错误，或者一些
            console.log(err);
            ctx.body = {
                code: 9001265,
                message: '数据库错误',
                info:err

            };
        });
})
.post('/reg',async (ctx)=>{
   
   await user.register(ctx.request.body.account,sha1(ctx.request.body.password))
    .then((data) => {
        ctx.body = {
            code: 200,
            token: createToken(ctx.request.body.account + data['insertId'] + Date.now())
        };
     
    })
    .catch(err => {
        console.log(err,88);
        // 服务器发生错误（用户名可能重复）
        ctx.response.body = {
            code: 9001265,
            message: '数据库错误',
            info:err
        };
      

    });
   
});

export = router
