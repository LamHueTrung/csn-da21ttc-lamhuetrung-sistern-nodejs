const Congty = require('../models/CongTy');
const CanboHD = require('../models/CanBoHuongDan');
class CongtyController {
    static layDanhSachCongty(req, res) {
        Congty.find()
            .then((Congtys) => res.json(Congtys))
            .catch((err) => res.json('Lỗi /company: ' + err));
    }
    static Dangkythongtin(req, res) {
        const newData = req.body;

        Congty.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
    static layDanhSachCanboHD(req, res) {
        CanboHD.find()
            .then((CanboHDs) => res.json(CanboHDs))
            .catch((err) => res.json('Lỗi company/cambohuongdan: ' + err));
    }
    static themCanBo(req, res) {
        const newData = req.body;

        CanboHD.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
    static xoacongty = async (req, res) => {
        try {
            const { CTID } = req.params;
            const updatedData = req.body; // Dữ liệu cần cập nhật

            const congty = await Congty.findByIdAndUpdate(CTID, updatedData, {
                new: true,
            });
            res.json(congty);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi xoá công ty' });
        }
    };
}

module.exports = CongtyController;
