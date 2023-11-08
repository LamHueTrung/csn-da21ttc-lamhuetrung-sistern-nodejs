// controllers/SinhVienController.js
const SinhVien = require('../models/SinhVien');

class SinhVienController {
    static layDanhSachSinhVien(req, res) {
        SinhVien.find()
            .then((sinhvien) => res.json(sinhvien))
            .catch((err) => res.json('Lỗi /student: ' + err));
    }
    static themThongTinSinhVien(req, res) {
        const newData = req.body;
        SinhVien.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}

module.exports = SinhVienController;
