const express = require('express');
const router = express.Router();
const SinhVienController = require('../controllers/SinhVienController');
const TintucController = require('../controllers/TinTucController');

router.get('/danhsachsinhvien', SinhVienController.layDanhSachSinhVien);
router.get('/tintuc', TintucController.layThongBao);

module.exports = router;