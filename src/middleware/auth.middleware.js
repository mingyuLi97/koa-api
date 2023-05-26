const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { TOKEN_EXPIRED, INVALID_TOKEN } = require("../constant/err.type");

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

module.exports = {
  auth,
};
