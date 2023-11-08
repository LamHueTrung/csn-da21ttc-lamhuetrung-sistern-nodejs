const Thuctap = require('../models/ThucTap');

class ThuctapController {
    static layDanhSachThuctap(req, res) {
        Thuctap.find()
            .then((Thuctaps) => res.json(Thuctaps))
            .catch((err) => res.json('Lỗi /Thuctap: ' + err));
    }
    static DangKyThucTap(req, res) {
        const newData = req.body;

        Thuctap.create(newData)
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
    static DuyetDonThucTap = async (req, res) => {
        try {
            const { ThucTapID } = req.params;
            const updatedData = req.body; // Dữ liệu cần cập nhật

            const thuctap = await Thuctap.findByIdAndUpdate(
                ThucTapID,
                updatedData,
                {
                    new: true,
                },
            );

            res.json(thuctap);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi cập nhật thông tin sinh viên' });
        }
    };
}

module.exports = ThuctapController;
