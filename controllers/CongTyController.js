const Congty = require('../models/CongTy');
const CanboHD = require('../models/CanBoHuongDan');

class CongtyController {
  static layDanhSachCongty(req, res) {
      Congty.find()
      .then(Congtys => res.json(Congtys))
      .catch(err => res.json("Lỗi /company: " + err))
    }
    static layDanhSachCanboHD(req, res) {
      CanboHD.find()
      .then(CanboHDs => res.json(CanboHDs))
      .catch(err => res.json("Lỗi company/cambohuongdan: " + err))
    }
}


module.exports = CongtyController;