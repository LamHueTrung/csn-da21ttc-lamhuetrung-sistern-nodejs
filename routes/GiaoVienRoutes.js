const express = require('express');
const router = express.Router();
const GiaovienController = require('../controllers/GiaoVienController');
const TintucController = require('../controllers/TinTucController');
const ThuctapController = require('../controllers/ThucTapController');

router.get('/tintuc', TintucController.layThongBao);
router.get('/danhsachgiaovien', GiaovienController.layDanhSachGiaovien);

router.post('/themthongbao', TintucController.themThongBao);
router.post('/themthongtingiaovien', GiaovienController.themThongTinGiaoVien);
router.put('/duyetdonthuctap/:ThucTapID', ThuctapController.DuyetDonThucTap);

module.exports = router;
