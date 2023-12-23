const express = require('express');
const router = express.Router();

const DotThucTapController = require('../controllers/DotThucTapController');
const ThongTinCongBoController = require('../controllers/ThongTInCongBoController');

router.get('/danhsachdotthuctap', DotThucTapController.danhsachdotthuctap);
router.get('/danhsachcongbo', DotThucTapController.danhsachcongbo);
router.get('/thongtincongbo', ThongTinCongBoController.danhsachcongviec);

router.post('/themdotthuctap', DotThucTapController.Dangkythongtin);
router.post('/themdanhsachcongbo', DotThucTapController.themdanhsachcongbo);

module.exports = router;
