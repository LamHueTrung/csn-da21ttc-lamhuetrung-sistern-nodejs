const express = require('express');
const router = express.Router();
const SinhvienController = require('../controllers/SinhVienController');
const TintucController = require('../controllers/TinTucController');
const ThuctapController = require('../controllers/ThucTapController');

router.get('/danhsachsinhvien', SinhvienController.layDanhSachSinhVien);
router.get('/donthuctap', ThuctapController.layDanhSachThuctap);
router.get('/tintuc', TintucController.layThongBao);

router.post('/dangkythuctap', ThuctapController.DangKyThucTap);
router.post('/themthongtin', SinhvienController.themThongTinSinhVien);

module.exports = router;