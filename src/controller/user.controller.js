class UserController {
  async register(ctx, next) {
    ctx.body = "register";
  }
  async login(ctx, next) {
    ctx.body = "登录";
  }
}

module.exports = new UserController();
