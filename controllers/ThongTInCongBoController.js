const CongViec = require('../models/ThongTinCongBo');
class CongViecController {
    static danhsachcongviec(req, res) {
        CongViec.find()
            .then((CongViecs) => res.json(CongViecs))
            .catch((err) => res.json('Lỗi /company: ' + err));
    }
}

module.exports = CongViecController;
