const express = require('express');
const router = express.Router();

const DotThucTapController = require('../controllers/DotThucTapController');
const CongViecController = require('../controllers/CongViecController');
const ThongTinCongBoController = require('../controllers/ThongTInCongBoController');

router.get('/danhsachdotthuctap', DotThucTapController.danhsachdotthuctap);
router.get('/danhsachcongbo', DotThucTapController.danhsachcongbo);
router.get('/danhsachcongviec', CongViecController.danhsachcongviec);
router.get('/thongtincongbo', ThongTinCongBoController.danhsachcongviec);

router.post('/themdotthuctap', DotThucTapController.Dangkythongtin);
router.post('/themdanhsachcongbo', DotThucTapController.themdanhsachcongbo);
router.post('/themcongviec', CongViecController.Dangkythongtin);

module.exports = router;
