const express = require('express');
const router = express.Router();
const SinhvienController = require('../controllers/SinhVienController');
const TintucController = require('../controllers/TinTucController');
const ThuctapController = require('../controllers/ThucTapController');

router.get('/danhsachsinhvien', SinhvienController.layDanhSachSinhVien);
router.get('/thongtinbaocao', SinhvienController.layBaoCao);
router.get('/donthuctap', ThuctapController.layDanhSachThuctap);
router.get('/tintuc', TintucController.layThongBao);

router.post('/dangkythuctap', ThuctapController.DangKyThucTap);
router.post('/themthongtin', SinhvienController.themThongTinSinhVien);
router.post('/baocao', SinhvienController.BaoCao);
router.post('/themthongbao', TintucController.themThongBao);

router.put(
    '/capnhattrangthai/:SinhVienID',
    SinhvienController.TrangThaiSinhVien,
);
router.put('/xoadonthuctap/:DTTID', SinhvienController.xoadonthuctap);

module.exports = router;
