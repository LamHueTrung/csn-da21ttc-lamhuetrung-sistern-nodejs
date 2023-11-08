const mongoose = require('mongoose');

const CanboHDSchema = new mongoose.Schema({
    macanbo: String,
    macongty: String,
    tencanbo: String,
    chucvu: String,
    vitri: String,
    email: String,
    sodienthoai: String,
});

const CanboHD = mongoose.model('tblCanbohuongdan', CanboHDSchema);
module.exports = CanboHD;
