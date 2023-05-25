const Koa = require("koa");
const { koaBody } = require("koa-body");

const errHandler = require("./errHandler");

const app = new Koa();

const indexRouter = require("../router/index.route");
const userRouter = require("../router/user.route");

app.use(koaBody());
app.use(indexRouter.routes());
app.use(userRouter.routes());

app.on("error", errHandler);

module.exports = app;
