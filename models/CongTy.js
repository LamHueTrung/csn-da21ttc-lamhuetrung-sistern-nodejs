const mongoose = require('mongoose');

const sinhVienSchema = new mongoose.Schema({
    macongty: String,
    tencongty: String,
    diachi: String,
    mota: String,
    email: String,
    ngaybatdau: String,
    ngayketthuc: String,
    vitrithuctap: String,
    luong: String,
    capbac: String,
    hethannop: String,
    motacongviec: String,
    yeucaucongviec: String
});

const SinhVien = mongoose.model('tblCongty', sinhVienSchema);
module.exports = SinhVien;
