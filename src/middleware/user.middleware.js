const encrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  USER_FORMATE_ERROR,
  USER_ALREADY_EXISTED,
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
  encryptPassword,
};
