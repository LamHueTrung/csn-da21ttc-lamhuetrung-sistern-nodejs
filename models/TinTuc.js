const mongoose = require('mongoose');

const TinTucSchema = new mongoose.Schema({
    thoigian: String,
    thongbaosinhvien: String,
    thongbaogiaovien: String,
    thongbaoadmin: String,
});

const TinTuc = mongoose.model('tblTintuc', TinTucSchema);
module.exports = TinTuc;
