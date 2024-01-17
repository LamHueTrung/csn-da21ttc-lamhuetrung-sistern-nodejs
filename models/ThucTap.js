const mongoose = require('mongoose');

const ThucTapSchema = new mongoose.Schema({
    trangthaidon: String,
    mathuctap: String,
    idsinhvien: String,
    masinhvien: String,
    loai: String,
    magiaovien: String,
    macongty: String,
    macanbohuongdan: String,
    ngaybatdau: String,
    ngayketthuc: String,
    sotuan: String,
    noidungthuctap: String,
    deleted: String
});

const ThucTap = mongoose.model('tblThucTap', ThucTapSchema);
module.exports = ThucTap;
