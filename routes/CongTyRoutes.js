const express = require('express');
const router = express.Router();
const SinhVienController = require('../controllers/CongTyController');
const TintucController = require('../controllers/TinTucController');

router.get('/tintuc', TintucController.layThongBao);
router.get('/danhsachcongty', SinhVienController.layDanhSachCongty);
router.get('/canbohuongdan', SinhVienController.layDanhSachCanboHD);


module.exports = router;