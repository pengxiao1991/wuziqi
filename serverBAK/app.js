const Koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');

const app = new Koa();
app.use((ctx, next) => {
    // console.log(1);
    let obj = {};
    ((obj) => {
        setTimeout(() => {
    
            obj.a = 3;
            console.log(obj,999);

        }, 1000);
    })(obj);
   obj = null;
   console.log(obj,666);
      
    // async function  createGenerator(next) { 
    //     return await next();
        
    //  }
    // console.log(next,666);
    next();

  });
  
//   app.use(async(ctx, next) => {
//     console.log(2)
//     await next();
//     console.log(4)
//   });
  
//   app.use(async(ctx, next) => {
//     console.log(3)
//     ctx.body = 'Hello World';
//   });

// console.dir(Haha);
// app.use(bodyParser());
// //跨域
// app.use(cors({
//     origin: function (ctx) {
//         return "*"; // 允许来自所有域名请求
//     },
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     maxAge: 5,
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'DELETE'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));

// routes(app);

//端口监听
app.listen(3009);