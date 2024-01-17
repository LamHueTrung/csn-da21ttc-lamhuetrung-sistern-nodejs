// models/SinhVien.js
const mongoose = require('mongoose');

const ThongTinCongBoSchema = new mongoose.Schema({
    macongty: String,
    madotthuctap: String,
    congviecthuctap: String,
    ghichu: String,
});

const ThongTinCongBo = mongoose.model(
    'tblThongTinCongBo',
    ThongTinCongBoSchema,
);
module.exports = ThongTinCongBo;
