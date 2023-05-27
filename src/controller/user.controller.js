const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserInfo,
  updateById,
  changePermission,
} = require("../service/user.service");
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

  async changePassword(ctx, next) {
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    if (await updateById(id, { password })) {
      ctx.body = {
        code: "0",
        message: "修改成功",
      };
    }
  }

  /**
   * 修改用户的权限
   */
  async changePermission(ctx, next) {
    const { user_name, is_admin } = ctx.request.body;
    if (await changePermission(user_name, is_admin)) {
      ctx.body = {
        code: "0",
        message: "修改成功",
      };
    } else {
      ctx.body = {
        code: "111111",
        message: "修改失败",
      };
    }
  }
}

module.exports = new UserController();
