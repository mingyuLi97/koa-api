const Koa = require("koa");
const { koaBody } = require("koa-body");

const app = new Koa();

const indexRouter = require("../router/index.route");
const userRouter = require("../router/user.route");

app.use(koaBody());
app.use(indexRouter.routes());
app.use(userRouter.routes());

module.exports = app;
