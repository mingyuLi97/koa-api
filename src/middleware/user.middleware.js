const encrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  USER_FORMATE_ERROR,
  USER_ALREADY_EXISTED,
  USER_DOES_NOT_EXISTED,
  USER_LOGIN_ERROR,
  USER_INVALID_PASSWORD,
} = require("../constant/err.type");

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", USER_FORMATE_ERROR, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;

  if (await getUserInfo({ user_name })) {
    console.error("用户已经存在", ctx.request.body);
    ctx.app.emit("error", USER_ALREADY_EXISTED, ctx);
    return;
  }
  await next();
};

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error("用户不存在", ctx.request.body);
      ctx.app.emit("error", USER_DOES_NOT_EXISTED, ctx);
      return;
    }
    if (!encrypt.compareSync(password, res.password)) {
      console.error("密码错误", ctx.request.body);
      ctx.app.emit("error", USER_INVALID_PASSWORD, ctx);
      return;
    }
  } catch (err) {
    console.error("用户登录错误", err);
    ctx.app.emit("error", USER_LOGIN_ERROR, ctx);
    return;
  }
  await next();
};

const encryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  const salt = encrypt.genSaltSync(10);
  const hash = encrypt.hashSync(password, salt);
  ctx.request.body.password = hash;

  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  verifyLogin,
  encryptPassword,
};
