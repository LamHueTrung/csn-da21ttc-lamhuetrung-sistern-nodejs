const mongoose = require('mongoose');

const CanboHDSchema = new mongoose.Schema({
    macanbo: String,
    macongty: String,
    tencanbo: String,
    sotaikhoan: String,
    sodienthoai: String,
});

const CanboHD = mongoose.model('tblCanbohuongdan', CanboHDSchema);
module.exports = CanboHD;
