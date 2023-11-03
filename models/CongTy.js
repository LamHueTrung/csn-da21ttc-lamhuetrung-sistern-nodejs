const mongoose = require('mongoose');

const sinhVienSchema = new mongoose.Schema({
    macongty: String,
    tencongty: String,
    diachi: String,
    vitri: String,
    email: String,
});

const SinhVien = mongoose.model('tblCongty', sinhVienSchema);
module.exports = SinhVien;
