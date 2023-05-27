const Koa = require("koa");
const { koaBody } = require("koa-body");

const errHandler = require("./errHandler");

const app = new Koa();

const router = require("../router");

app.use(koaBody());
app.use(router.routes());

app.on("error", errHandler);

module.exports = app;
