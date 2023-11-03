const Tintuc = require('../models/TinTuc');

class TintucController {
  static layThongBao(req, res) {
      Tintuc.find()
      .then(Tintucs => res.json(Tintucs))
      .catch(err => res.json("Lỗi slug/tintuc: " + err))
    }
}


module.exports = TintucController;