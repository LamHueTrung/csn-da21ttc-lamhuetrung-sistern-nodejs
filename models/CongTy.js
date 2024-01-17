const mongoose = require('mongoose');

const sinhVienSchema = new mongoose.Schema({
    macongty: String,
    tencongty: String,
    diachi: String,
    macanbo: String,
    sodienthoai: String,
    motacongviec: String,
    deleted: String,
});

const SinhVien = mongoose.model('tblCongty', sinhVienSchema);
module.exports = SinhVien;
