const Taikhoan = require('../models/Taikhoan');

class TaikhoanController {
    static layDanhSachTaikhoan(req, res) {
        Taikhoan.find()
            .then((Taikhoans) => res.json(Taikhoans))
            .catch((err) => res.json('Lỗi /taikhoan: ' + err));
    }
    static Dangky(req, res) {
        const newData = req.body;

        // Tìm kiếm xem có tài khoản nào có thông tin giống newData không
        Taikhoan.findOne(newData)
            .then((existingAccount) => {
                if (existingAccount) {
                    // Nếu đã tồn tại, trả về thông tin của tài khoản đã tồn tại
                    res.status(200).json(existingAccount);
                } else {
                    // Nếu chưa tồn tại, tạo mới tài khoản
                    Taikhoan.create(newData)
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
}

module.exports = TaikhoanController;
