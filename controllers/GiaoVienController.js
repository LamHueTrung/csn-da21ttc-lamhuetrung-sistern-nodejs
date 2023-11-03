const Giaovien = require('../models/GiaoVien');

class GiaovienController {
  static layDanhSachGiaovien(req, res) {
      Giaovien.find()
      .then(Giaoviens => res.json(Giaoviens))
      .catch(err => res.json("Lỗi /teacher: " + err))
    }
}


module.exports = GiaovienController;