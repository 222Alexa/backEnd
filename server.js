const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require("koa-router");
const app = new Koa();
const PORT = process.env.PORT || 8000;
let router = new Router();

router.get('/', (ctx,next) => {
    //ctx.router available
    ctx.response.body = 'Hello world'
});


app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.response.body = "Hello, world!";
  console.log(ctx.request.query);
});
app.listen(PORT, () =>
  console.log(`Koa server has been started on port ${PORT} ...`)
);
