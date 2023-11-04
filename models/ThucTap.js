const mongoose = require('mongoose');

const ThucTapSchema = new mongoose.Schema({
    trangthaidon: String,
    mathuctap: String,
    loai: String,
    mabaocao: String,
    magiaovien: String,
    masinhvien: String,
    macongty: String,
    macanbohuongdan: String,
    noidungthuctap: String,
    ngaybatdau: String,
    ngayketthuc: String,
    sobuoi: String,
    sotuan: String
});

const ThucTap = mongoose.model('tblThucTap', ThucTapSchema);
module.exports = ThucTap;
