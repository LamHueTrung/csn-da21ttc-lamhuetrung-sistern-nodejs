const mongoose = require('mongoose');

const ThucTapSchema = new mongoose.Schema({
    trangthaidon: String,
    mathuctap: String,
    masinhvien: String,
    loai: String,
    magiaovien: String,
    macongty: String,
    macanbohuongdan: String,
    ngaybatdau: String,
    ngayketthuc: String,
    sobuoi: String,
    sotuan: String,
    noidungthuctap: String,
    
});

const ThucTap = mongoose.model('tblThucTap', ThucTapSchema);
module.exports = ThucTap;
