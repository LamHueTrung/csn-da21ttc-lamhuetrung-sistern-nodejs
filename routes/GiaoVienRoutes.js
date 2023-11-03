const express = require('express');
const router = express.Router();
const GiaovienController = require('../controllers/GiaoVienController');
const TintucController = require('../controllers/TinTucController');

router.get('/tintuc', TintucController.layThongBao);
router.get('/danhsachgiaovien', GiaovienController.layDanhSachGiaovien);

module.exports = router;