class UserController {
  async register(ctx, next) {
    ctx.body = ctx.request.body;
  }
  async login(ctx, next) {
    ctx.body = "登录";
  }
}

module.exports = new UserController();
