const express = require('express');
const router = express.Router();

const DotThucTapController = require('../controllers/DotThucTapController');
const ThongTinCongBoController = require('../controllers/ThongTInCongBoController');

router.get('/danhsachdotthuctap', DotThucTapController.danhsachdotthuctap);
router.get('/danhsachcongbo', DotThucTapController.danhsachcongbo);
router.put('/xoadotthuctap/:DTTID', DotThucTapController.xoadotthuctap);
router.get('/thongtincongbo', ThongTinCongBoController.danhsachcongviec);

router.post('/themdotthuctap', DotThucTapController.Dangkythongtin);
router.post('/themdanhsachcongbo', DotThucTapController.themdanhsachcongbo);

router.delete('/xoadulieucongbo/:DTTID', ThongTinCongBoController.xoaCongViec);
module.exports = router;
