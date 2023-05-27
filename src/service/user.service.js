const User = require("../model/user.model");

class UserService {
  async createUser(name, password) {
    const res = await User.create({ user_name: name, password });
    return res;
  }

  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const res = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereOpt,
    });
    return res ? res : null;
  }

  async updateById(id, { user_name, password, is_admin }) {
    const newUser = {};
    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });

    const res = await User.update(newUser, { where: { id } });
    return res;
  }

  /**
   * 修改用户的权限
   * @param {string} user_name
   * @param {0 | 1} is_admin
   * @returns {Promise<boolean>}
   */
  async changePermission(user_name, is_admin) {
    const res = await User.update({ is_admin }, { where: { user_name } });
    return res[0] !== 0;
  }
}

module.exports = new UserService();
