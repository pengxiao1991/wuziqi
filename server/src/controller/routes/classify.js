const Router = require('koa-router');
const router = new Router();
const api = require('../api');

const formatDate = require('../middleware/formatDate');
const checkToken = require('../middleware/checkToken');

router
// 创建分类 checkToken,
.post('/create', async(ctx,next)=>{
  let classify = {
    classType:ctx.request.body.classType,
    createTime:formatDate()
  };
  await checkToken(ctx,next);
  await api.createClass(classify)
      .then(()=>{
          ctx.body = {
            code:200,
            message:'创建成功'
          };
      }).catch(err=>{
          ctx.body = {
            code:-200,
            message:'创建失败'
          };
      });
})
// 删除分类 checkToken,
.post('/remove', async(ctx)=>{
    await checkToken(ctx,next);
    await api.removeClass(ctx.request.body.classId)
      .then(()=>{
          ctx.body = {
            code:200,
            message:'删除成功'
          };
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:'删除失败'
        };
    });
})
// 编辑分类 checkToken,
.post('/edit', async(ctx,next)=>{
  await checkToken(ctx,next);
  await api.updateClass(ctx.request.body)
  .then(()=>{
    ctx.body = {
      code:200,
      message:'编辑成功'
    };
  }).catch(err=>{
    ctx.body = {
      code:-200,
      message:'编辑失败'
    };
  });
})
// 获取所有分类 checkToken,
.get('/lists', async(ctx,next)=>{
  await checkToken(ctx,next);
  await api.findAllClass()
  .then((lists)=>{
    ctx.body = {
      code:200,
      lists
    };
  }).catch(err=>{
    res.body = {
      code:-200,
      message:err.toString()
    };
  });
})
// 无权限获取分类给前台使用
.get('/noAuth', async(ctx)=>{
  await checkToken(ctx,next);
  await api.findAllClass()
  .then((lists)=>{
    ctx.body = {
      code:200,
      lists
    };
  }).catch(err=>{
    ctx.body = {
      code:-200,
      message:err.toString()
    };
  });
})

module.exports = router;
