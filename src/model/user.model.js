const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 定义模型 （zd_user => zd_users 表名默认会加s）
const User = seq.define("zd_user", {
  // id 会被 sequelize 自动创建
  user_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    comment: "用户名",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否是管理员，1 - 管理员，0 - 普通",
  },
});

/**
 * 如果存在表，那么先删除在重新创建。
 * 我们可以在第一次使用时执行 node src/model/user.model.js 创建表
 */
// User.sync({ force: true });

module.exports = User;
