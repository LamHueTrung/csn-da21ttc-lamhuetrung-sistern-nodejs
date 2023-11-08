const Taikhoan = require('../models/Taikhoan');

class TaikhoanController {
    static layDanhSachTaikhoan(req, res) {
        Taikhoan.find()
            .then((Taikhoans) => res.json(Taikhoans))
            .catch((err) => res.json('Lỗi /taikhoan: ' + err));
    }
    static Dangky(req, res) {
        const newData = req.body;

        Taikhoan.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}

module.exports = TaikhoanController;
