const { createUser, getUserInfo } = require("../service/user.service");

class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;

    // 错误判断

    // 合法性
    if (!user_name || !password) {
      console.error("用户名或密码为空", ctx.request.body);
      ctx.status = 400;
      ctx.body = {
        code: "10001",
        message: "用户名或密码为空",
        result: "",
      };
      return;
    }

    // 合理性
    if (getUserInfo({ user_name })) {
      console.error("用户已经存在", ctx.request.body);
      ctx.status = 409;
      ctx.body = {
        code: "10002",
        message: "用户已经存在",
        result: "",
      };
      return;
    }

    const res = await createUser(user_name, password);

    ctx.body = {
      code: 0,
      message: "用户注册成功",
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    };
  }
  async login(ctx, next) {
    ctx.body = "登录";
  }
}

module.exports = new UserController();
