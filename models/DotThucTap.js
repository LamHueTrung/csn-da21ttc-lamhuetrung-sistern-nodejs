const mongoose = require('mongoose');

const DotThucTapSchema = new mongoose.Schema({
    tendotthuctap: String,
    ngaybatdau: String,
    ngayketthuc: String,
    danhsachlop: String,
    ghichu: String,
    deleted: String,
});

const DotThucTap = mongoose.model('tbldotthuctap', DotThucTapSchema);
module.exports = DotThucTap;
