// models/SinhVien.js
const mongoose = require('mongoose');

const GiaovienSchema = new mongoose.Schema({
    magiaovien: String,
    tengiaovien: String,
    email: String,
    sodienthoai: String,
    chucvu: String,
});

const Giaovien = mongoose.model('tblGiaovien', GiaovienSchema);
module.exports = Giaovien;
