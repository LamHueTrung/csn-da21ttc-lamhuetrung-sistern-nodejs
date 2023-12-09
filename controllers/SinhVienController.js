// controllers/SinhVienController.js
const SinhVien = require('../models/SinhVien');
const BaoCao = require('../models/BaoCao');

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
    static layBaoCao(req, res) {
        BaoCao.find()
            .then((baocao) => res.json(baocao))
            .catch((err) => res.json('Lỗi /student: ' + err));
    }
    static BaoCao(req, res) {
        const newData = req.body;
        BaoCao.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}

module.exports = SinhVienController;
