const express = require('express');
const cors = require('cors');
const db = require('./config/db/index');
const mongoose = require("mongoose");
const multer = require("multer");

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

//them file bao cao
app.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname);
  },
});
const upload = multer({ storage: storage });
const FileSchema = new mongoose.Schema({
    name: String,
    path: String,
    size: Number,
  });
const FileModel = mongoose.model("File", FileSchema); 
app.post("/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    const newFile = new FileModel({
      name: file.originalname,
      path: file.path,
      size: file.size,
    });
    try {
      await newFile.save();
      res.json({ message: "Upload thành công!"});
      console.log("Upload thành công file: " +newFile.name);
    } catch (error) {
      res.status(500).json({ message: "Upload thất bại!" });
    }
  });
  app.get("/api/files/",  (req, res) => {
    FileModel.find()
      .then((file) => res.json(file))
      .catch((err) => res.json('Lỗi /student: ' + err));
  });




//routes
app.use('/taikhoan', TaikhoanRoutes);
app.use('/student', SinhVienRoutes);
app.use('/company', CongTyRoutes);
app.use('/teacher', GiaoVienRoutes);

app.listen(port, () => {
    console.log('API server is running on port 3001');
});
