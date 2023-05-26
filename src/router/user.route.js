const Router = require("@koa/router");

const {
  userValidator,
  verifyUser,
  verifyLogin,
  encryptPassword,
} = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware");

const {
  register,
  login,
  changePassword,
} = require("../controller/user.controller");
const router = new Router({ prefix: "/users" });

// 注册接口
router.post("/register", userValidator, verifyUser, encryptPassword, register);

router.post("/login", userValidator, verifyLogin, login);

/**
 * 修改密码
 */
router.patch("/", auth, encryptPassword, changePassword);

module.exports = router;
