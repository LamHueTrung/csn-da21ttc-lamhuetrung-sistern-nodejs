const express = require('express');
const router = express.Router();
const TaikhoanRoutes = require('../controllers/TaiKhoanController');

router.post('/dangkytaikhoan', TaikhoanRoutes.Dangky);
router.get('/dangnhaptaikhoan', TaikhoanRoutes.layDanhSachTaikhoan);
module.exports = router;
