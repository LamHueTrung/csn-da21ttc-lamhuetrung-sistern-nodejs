const Congty = require('../models/CongTy');
const CanboHD = require('../models/CanBoHuongDan');

class CongtyController {
  static layDanhSachCongty(req, res) {
      Congty.find()
      .then(Congtys => res.json(Congtys))
      .catch(err => res.json("Lỗi /company: " + err))
    };
    static Dangkythongtin (req, res) {
      const newData = req.body;
    
      Congty.create(newData)
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    };
    static layDanhSachCanboHD(req, res) {
      CanboHD.find()
      .then(CanboHDs => res.json(CanboHDs))
      .catch(err => res.json("Lỗi company/cambohuongdan: " + err))
    };
    static themCanBo (req, res) {
      const newData = req.body;
    
      CanboHD.create(newData)
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    };
    
}


module.exports = CongtyController;