const { createUser } = require("../service/user.service");

class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    
    const res = await createUser(user_name, password);

    ctx.body = res;
  }
  async login(ctx, next) {
    ctx.body = "登录";
  }
}

module.exports = new UserController();
