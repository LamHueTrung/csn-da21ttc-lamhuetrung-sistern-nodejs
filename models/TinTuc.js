const mongoose = require('mongoose');
const format = require('date-fns/format');

const TinTucSchema = new mongoose.Schema({
    thoigian: String,
    thongbaosinhvien: String,
    thongbaogiaovien: String,
    thongbaocongty: String,
});

const TinTuc = mongoose.model('tblTintuc', TinTucSchema);
module.exports = TinTuc;
