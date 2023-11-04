const Thuctap = require('../models/ThucTap');

class ThuctapController {
  static layDanhSachThuctap(req, res) {
      Thuctap.find()
      .then(Thuctaps => res.json(Thuctaps))
      .catch(err => res.json("Lỗi /Thuctap: " + err))
    }
    static DangKyThucTap (req, res) {
      const newData = req.body;
    
      Thuctap.create(newData)
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    };
}


module.exports = ThuctapController;