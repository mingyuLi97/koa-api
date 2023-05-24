const Router = require("@koa/router");

const router = new Router();

// GET /
router.get("/", (ctx, next) => {
  ctx.body = "hello index";
});

module.exports = router;
