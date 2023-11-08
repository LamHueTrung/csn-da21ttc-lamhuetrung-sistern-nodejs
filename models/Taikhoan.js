const mongoose = require('mongoose');

const TaiKhoanSchema = new mongoose.Schema({
    taikhoan: String,
    matkhau: String,
    loaitaikhoan: String,
});

const TaiKhoan = mongoose.model('tblTaikhoan', TaiKhoanSchema);
module.exports = TaiKhoan;
