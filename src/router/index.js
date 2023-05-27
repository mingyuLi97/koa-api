const fs = require("fs");
const Router = require("@koa/router");

const router = new Router();

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    router.use(require("./" + file).routes());
  }
});

module.exports = router;
