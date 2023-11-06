const express = require('express');
const cors = require('cors');
const db = require('./config/db/index');
const SinhVienRoutes = require('./routes/SinhVienRoutes');
const CongTyRoutes = require('./routes/CongTyRoutes');
const GiaoVienRoutes = require('./routes/GiaoVienRoutes');
const TaikhoanRoutes = require('./routes/DangKyRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// kết nối db
db.connect();

//[GET]
app.use('/taikhoan', TaikhoanRoutes);
app.use('/student',SinhVienRoutes); 
app.use('/company', CongTyRoutes);
app.use('/teacher', GiaoVienRoutes);


app.listen(port, () => {
  console.log('API server is running on port 3001');
});
