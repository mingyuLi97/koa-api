const Koa = require("koa");

const { APP_PORT } = require("./config/config.default");

const app = new Koa();

const indexRouter = require("./router/index.route");
const userRouter = require("./router/user.route");

app.use(indexRouter.routes());
app.use(userRouter.routes());

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});
