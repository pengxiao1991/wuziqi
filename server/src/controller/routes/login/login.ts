

import Router = require('koa-router');
import user  =  require('../../../model/user');
const router = new Router();

import createToken = require('../../../util/createToken');
import sha1 = require('sha1'); //加密

router
.post('/login',async(ctx)=>{
    // let name = ctx.request.body.account;
    // let password = sha1(ctx.request.body.checkPass);
    // await api.getUserByName(name)
    //     .then(data => {
    //         let user = data[0];
    //         if (user && (password == user.password)) {
    //             // 用户名存在通过验证
    //             ctx.body = {
    //                 code: 200,
    //                 token: createToken(name)
    //             };
    //         } else {
    //             // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册()
    //             ctx.body = {
    //                 code: -200,
    //                 message: '用户名或密码错误'
    //             };
    //         }
    //     }).catch(err => {
    //         // 查找数据库发生错误，或者一些
    //         console.log(err);
    //         ctx.body = {
    //                 code: -200,
    //                 message: '数据库错误'
    //         };
    //     });
})
.post('/reg',(ctx)=>{
    
    user.register(ctx.request.body.account,sha1(ctx.request.body.password))
    .then((data) => {
        // ctx.body = {
        //     code: 200,
        //     token: createToken(user.username)
        // };
     
    })
    .catch(err => {
        console.log(err);
        // 服务器发生错误（用户名可能重复）
        ctx.body = {
            code: 900126,
            message: '数据库错误'
        };
    })
});

export = router
