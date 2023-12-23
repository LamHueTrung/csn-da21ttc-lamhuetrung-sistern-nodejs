// models/SinhVien.js
const mongoose = require('mongoose');

const sinhVienSchema = new mongoose.Schema({
    email: String,
    ngaysinh: String,
    sodienthoai: String,
    masinhvien: String,
    lop: String,
    hoten: String,
    trangthaisinhvien: String,
});

const SinhVien = mongoose.model('tblSinhvien', sinhVienSchema);
module.exports = SinhVien;
