const Koa = require("koa");

const app = new Koa();

const indexRouter = require("../router/index.route");
const userRouter = require("../router/user.route");

app.use(indexRouter.routes());
app.use(userRouter.routes());

module.exports = app;
