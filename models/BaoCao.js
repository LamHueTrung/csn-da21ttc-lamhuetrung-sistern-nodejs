// models/SinhVien.js
const mongoose = require('mongoose');

const BaoCaoSchema = new mongoose.Schema({
    mathuctap: String,
    tuan: String,
    hannop: String,
    ngaynop: String,
    filename: String,
    trangthai: String,
});

const BaoCao = mongoose.model('tblBaoCao', BaoCaoSchema);
module.exports = BaoCao;
