const jwt = require("jsonwebtoken");

const { createUser, getUserInfo } = require("../service/user.service");
const { USER_REGISTER_ERROR } = require("../constant/err.type");
const { JWT_SECRET } = require("../config/config.default");
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
    const { user_name } = ctx.request.body;
    // 获取用户信息(在token的 payload 中，记录id，user_name，is admin
    ctx.body = `Hello "${user_name}"`;

    try {
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: "1d" }),
        },
      };
    } catch (err) {
      console.error("用户登录错误", err);
      ctx.app.emit("error", USER_LOGIN_ERROR, ctx);
      return;
    }
  }
}

module.exports = new UserController();
