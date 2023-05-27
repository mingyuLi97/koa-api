const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const {
  TOKEN_EXPIRED,
  INVALID_TOKEN,
  HAS_NOT_ADMIN_PERMISSION,
} = require("../constant/err.type");

/**
 * 校验用户是否登录
 */
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    /**
     * user 包含了 id username is_admin
     */
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user.dataValues;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("token 已经过期");
      ctx.app.emit("error", TOKEN_EXPIRED, ctx);
      return;
    }
    if (error.name === "JsonWebTokenError") {
      console.error("token 无效");
      ctx.app.emit("error", INVALID_TOKEN, ctx);
      return;
    }
    console.log("auth error", error);
  }
  await next();
};

/**
 * 是否有管理员权限
 * @param {*} ctx
 * @param {*} next
 */
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user;

  if (!is_admin) {
    console.error("该用户没有管理员权限");
    return ctx.app.emit("error", HAS_NOT_ADMIN_PERMISSION, ctx);
  }
  await next();
};

module.exports = {
  auth,
  hadAdminPermission,
};
