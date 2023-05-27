const path = require("path");

const Koa = require("koa");
const { koaBody } = require("koa-body");
const KoaStatic = require("koa-static");

const errHandler = require("./errHandler");
const router = require("../router");

const app = new Koa();

app.use(
  koaBody({
    // 支持文件上传
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../upload"),
      keepExtensions: true,
    },
  })
);
app.use(KoaStatic(path.join(__dirname, "../upload")));
app.use(router.routes()).use(router.allowedMethods());

app.on("error", errHandler);

module.exports = app;
