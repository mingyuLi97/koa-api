const { createUser, getUserInfo } = require("../service/user.service");
const { USER_REGISTER_ERROR } = require("../constant/err.type");
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);

      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.log("用户注册错误", error);
      ctx.app.emit("error", USER_REGISTER_ERROR, ctx);
    }
  }
  async login(ctx, next) {
    const { user_name, password } = ctx.request.body;

    ctx.body = `Hello "${user_name}"`;
  }
}

module.exports = new UserController();
