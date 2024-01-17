// controllers/SinhVienController.js
const SinhVien = require('../models/SinhVien');
const BaoCao = require('../models/BaoCao');
const Thuctap = require('../models/ThucTap');

class SinhVienController {
    static layDanhSachSinhVien(req, res) {
        SinhVien.find()
            .then((sinhvien) => {
                // Tạo một đối tượng Map để lưu trữ các bản ghi dựa trên thông tin duy nhất
                const uniqueRecordsMap = new Map();

                // Lặp qua tất cả các bản ghi
                sinhvien.forEach((record) => {
                    // Chọn thông tin duy nhất để xác định tính duy nhất của bản ghi
                    const uniqueKey = record.hoten; // Thay "fieldName" bằng tên trường bạn muốn sử dụng

                    // Nếu chưa có trong Map, thêm vào Map
                    if (!uniqueRecordsMap.has(uniqueKey)) {
                        uniqueRecordsMap.set(uniqueKey, record);
                    }
                });

                // Chuyển Map thành mảng để trả về
                const uniqueRecords = Array.from(uniqueRecordsMap.values());

                res.json(uniqueRecords);
            })
            .catch((err) => res.json('Lỗi /student: ' + err));
    }
    static themThongTinSinhVien(req, res) {
        const newData = req.body;

        // Tìm kiếm xem có bản ghi nào có thông tin giống newData không
        SinhVien.findOne(newData)
            .then((existingRecord) => {
                if (existingRecord) {
                    // Nếu đã tồn tại, trả về thông tin của bản ghi đã tồn tại
                    res.status(200).json(existingRecord);
                } else {
                    // Nếu chưa tồn tại, tạo mới bản ghi
                    SinhVien.create(newData)
                        .then((result) => {
                            res.status(201).json(result);
                        })
                        .catch((err) => {
                            res.status(500).json({ error: err });
                        });
                }
            })
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
    static TrangThaiSinhVien = async (req, res) => {
        try {
            const { SinhVienID } = req.params;
            const updatedData = req.body; // Dữ liệu cần cập nhật

            const sinhvien = await SinhVien.findByIdAndUpdate(
                SinhVienID,
                updatedData,
                {
                    new: true,
                },
            );
            res.json(sinhvien);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi cập nhật thông tin sinh viên' });
        }
    };
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
    static xoadonthuctap = async (req, res) => {
        try {
            const { DTTID } = req.params;
            const updatedData = req.body; // Dữ liệu cần cập nhật

            const dotthuctap = await Thuctap.findByIdAndUpdate(
                DTTID,
                updatedData,
                {
                    new: true,
                },
            );
            res.json(dotthuctap);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi xoá đơn thực tập' });
        }
    };
}

module.exports = SinhVienController;
