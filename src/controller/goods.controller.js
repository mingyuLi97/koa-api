class GoodsController {
  async upload(ctx, next) {
    ctx.body = "upload";
  }
}

module.exports = new GoodsController();
