const Giaovien = require('../models/GiaoVien');

class GiaovienController {
    static layDanhSachGiaovien(req, res) {
        Giaovien.find()
            .then((Giaoviens) => res.json(Giaoviens))
            .catch((err) => res.json('Lỗi /teacher: ' + err));
    }
    static themThongTinGiaoVien(req, res) {
        const newData = req.body;
        Giaovien.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}

module.exports = GiaovienController;
