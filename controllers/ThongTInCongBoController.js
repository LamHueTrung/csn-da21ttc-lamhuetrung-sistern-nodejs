const CongViec = require('../models/ThongTinCongBo');
const { ObjectId } = require('mongoose').Types;
class CongViecController {
    static danhsachcongviec(req, res) {
        CongViec.find()
            .then((CongViecs) => res.json(CongViecs))
            .catch((err) => res.json('Lỗi /company: ' + err));
    }
    static xoaCongViec = async (req, res) => {
        try {
            const { DTTID } = req.params;
            // Kiểm tra xem DTTID có đúng định dạng ObjectId không
            if (!ObjectId.isValid(DTTID)) {
                return res.status(400).json({ error: 'ID không hợp lệ' });
            }

            const result = await CongViec.deleteOne({ _id: DTTID });

            if (result.deletedCount > 0) {
                return res.json({ message: 'Xóa công việc thành công' });
            } else {
                return res
                    .status(404)
                    .json({ error: 'Không tìm thấy công việc với ID đã cho' });
            }
        } catch (error) {
            console.error('Lỗi xóa công việc:', error);
            res.status(500).json({
                error: 'Lỗi xóa công việc: ' + error.message,
            });
        }
    };
}

module.exports = CongViecController;
