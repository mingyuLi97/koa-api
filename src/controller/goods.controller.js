const path = require("path");
const { FILE_UPLOAD_ERROR } = require("../constant/err.type");

class GoodsController {
  async upload(ctx, next) {
    const { file } = ctx.request.files ?? {};
    if (file) {
      ctx.body = {
        code: 0,
        message: "上传成功",
        result: {
          goods_img: path.basename(file.filepath),
        },
      };
    } else {
      return ctx.app.emit("error", FILE_UPLOAD_ERROR, ctx);
    }
  }
}

module.exports = new GoodsController();
