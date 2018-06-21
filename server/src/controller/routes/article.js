const Router = require('koa-router');
const router = new Router();
const api = require('../api');

const formatDate = require('../middleware/formatDate'); //时间格式化函数
const {PAGECOUNT} = require('../config/'); //常量表
const checkToken = require('../middleware/checkToken'); //权限验证

router
// 创建一篇文章
.post('/create', async(ctx,next)=>{ 
  let article = ctx.request.body;
  article.createTime = formatDate();
  await checkToken(ctx,next);
  await api.createArticle(article)
      .then(()=>{
          ctx.body = {
            code:200,
            message:'发布成功'
          };
      }).catch(err=>{
          ctx.body = {
            code:-200,
            message:'发布失败'
          };
      });
})
// 获取文章列表(带分页获取,需要验证权限) checkToken,
.post('/lists', async(ctx,next)=>{ 
  await checkToken(ctx,next);
  await api.getArticlesList(ctx.request.body.page)
      .then((res)=>{
        let articleLists = res[0],
            total = res[1][0]['count(articleId)'];
        ctx.body = {
          code:200,
          articleLists,
          total
        };
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})
// 根据classify获取文章列表(前台使用没有权限)
.post('/noAuthArtilcelists', async(ctx)=>{ 
  await api.getArticlesByClassify(ctx.request.body.classify)
      .then((articleLists)=>{
        ctx.body = {
          code:200,
          articleLists
        };
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})
// 获取所有文章(每次返回10个)前台使用
.post('/articleLists', async(ctx)=>{ 
  let page = ctx.request.body.page;
  await api.getArticlesList(page)
      .then((res)=>{
        let articleLists = res[0],
            total = res[1][0]['count(articleId)'],
            totalPage = Math.ceil(total/PAGECOUNT),
            hasNext = totalPage>page?1:0,
            hasPrev = page>1;
        ctx.body = {
          code:200,
          articleLists,
          hasNext,
          hasPrev
        };
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})
// 根据articleId获取其中一篇文章（有权限）//checkToken,
.post('/onePage', async(ctx,next)=>{ 
  await checkToken(ctx,next);
  await api.getOneArticle(ctx.request.body.articleId)
      .then((res)=>{
        if(res){
          ctx.body = {
            code:200,
            oneArticle:res[0]
          };
        }else{
          throw new Error('没有找到该文章');
        }
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})
// 根据articleId查看其中一篇文章（没有权限）
.post('/noAuth', async(ctx)=>{ 
  await api.lookOneArticle(ctx.request.body.articleId)
      .then((res)=>{
        if(res){
          ctx.body = {
            code:200,
            oneArticle:res[0]
          };
        }else{
          throw new Error('没有找到该文章');
        }
      }).catch(err=>{
        ctx.body = {
          code:-200,
          message:err.toString()
        };
      });
})
// 删除一篇文章 checkToken,
.post('/remove', async(ctx,next)=>{ 
  await checkToken(ctx,next);
  await api.removeOneArticle(ctx.request.body.articleId)
      .then((res)=>{
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
// 编辑文章 checkToken,
.post('/edit', async(ctx,next)=>{ 
  await checkToken(ctx,next);
  await api.updateArticle(ctx.request.body)
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
});

module.exports = router
