

import Router = require('koa-router');
import userModel = require('../../../model/userModel');

const router = new Router();
const searchArr = [];

router
    .post('/auth/get_user_info', async (ctx) => {
      
        await userModel.getUserInfo(ctx.state.user_id)
            .then(data => {

                if (data['length']) {

                    // 用户名存在通过验证
                    ctx.body = {
                        code: 200,
                        data: data,

                    };

                } else {
                    // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册()
                    ctx.body = {
                        code: 9001268,
                        message: '用户不存在'
                    };
                }
            })
            .catch(err => {
                // 查找数据库发生错误，或者一些
                console.log(err);
                ctx.body = {
                    code: 9001265,
                    message: '数据库错误',
                    info: err

                };
            });

    })
    .post('/auth/search_opponent', async (ctx) => {
      
       if (searchArr.length) {
           for (let item of searchArr) {
               // 匹配实力相当的对手
               if (Math.abs(item.user_integral - ctx.request.body.user_integral) <= 20) {
                   

                    // return;
               }
           }
           // 没有找到
           searchArr.push({
                user_id:ctx.state.user_id,
                user_integral:ctx.request.body.user_integral
            });
           
       } else {
           searchArr.push({
               user_id:ctx.state.user_id,
               user_integral:ctx.request.body.user_integral
           });
       }
       ctx.body = {
           code:200
       }

    })
    

export = router
