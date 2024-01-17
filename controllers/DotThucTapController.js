const DotThucTap = require('../models/DotThucTap');
const ThongTinCongBo = require('../models/ThongTinCongBo');

class DotThucTapController {
    static danhsachdotthuctap(req, res) {
        DotThucTap.find()
            .then((DotThucTaps) => res.json(DotThucTaps))
            .catch((err) => res.json('Lỗi /company: ' + err));
    }
    static Dangkythongtin(req, res) {
        const newData = req.body;

        DotThucTap.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
    static danhsachcongbo(req, res) {
        ThongTinCongBo.find()
            .then((ThongTinCongBos) => res.json(ThongTinCongBos))
            .catch((err) => res.json('Lỗi /company: ' + err));
    }
    static themdanhsachcongbo(req, res) {
        const newData = req.body;

        ThongTinCongBo.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
    //xoá đợt thực tập
    static xoadotthuctap = async (req, res) => {
        try {
            const { DTTID } = req.params;
            const updatedData = req.body; // Dữ liệu cần cập nhật

            const dotthuctap = await DotThucTap.findByIdAndUpdate(
                DTTID,
                updatedData,
                {
                    new: true,
                },
            );
            res.json(dotthuctap);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi xoá đợt thực tập' });
        }
    };
}

module.exports = DotThucTapController;
