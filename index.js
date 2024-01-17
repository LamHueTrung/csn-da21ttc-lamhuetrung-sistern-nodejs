const express = require('express');
const cors = require('cors');
const db = require('./config/db/index');
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const fastcsv = require('fast-csv');

const SinhVienRoutes = require('./routes/SinhVienRoutes');
const CongTyRoutes = require('./routes/CongTyRoutes');
const GiaoVienRoutes = require('./routes/GiaoVienRoutes');
const TaikhoanRoutes = require('./routes/DangKyRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const Data = require('./models/ThongTinCongBo');

const app = express();
const port = 3001;
const path = require('path');

app.use(cors());
app.use(express.json());

// kết nối db
db.connect();

//them file bao cao
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
const FileSchema = new mongoose.Schema({
    name: String,
    path: String,
    size: Number,
});
const FileModel = mongoose.model('File', FileSchema);
app.post('/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const newFile = new FileModel({
        name: file.originalname,
        path: file.path,
        size: file.size,
    });
    try {
        await newFile.save();
        res.json({ message: 'Upload thành công!' });
        console.log('Upload thành công file: ' + newFile.name);
    } catch (error) {
        res.status(500).json({ message: 'Upload thất bại!' });
    }
});
// app.get("/api/files/",  (req, res) => {
//   FileModel.find()
//     .then((file) => res.json(file))
//     .catch((err) => res.json('Lỗi /student: ' + err));
// });

app.get('/api/files/:filename', async (req, res) => {
    const filename = req.params.filename;
    try {
        // Kiểm tra file tồn tại
        const filePath = path.join(__dirname, 'uploads', filename);
        const fileExists = await fs.promises
            .access(filePath, fs.constants.F_OK)
            .then(
                () => true,
                () => false,
            );

        if (!fileExists) {
            return res.status(404).json({ message: 'File không tồn tại!' });
        }

        // Đọc file PDF
        const buffer = await fs.promises.readFile(filePath);

        // Trả về
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi lấy file!' + error });
    }
});

// Định nghĩa tuyến đường để xử lý tệp tin Excel
app.post(
    '/api/themcongviec/:iddotthuctap',
    upload.single('file'),
    async (req, res) => {
        const file = req.file;
        const iddotthuctap = req.params.iddotthuctap;
        try {
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded.' });
            }

            const stream = fs.createReadStream(file.path);
            const data = [];

            const csvStream = fastcsv
                .parse({ headers: true })
                .on('data', (row) => {
                    try {
                        // Kiểm tra số lượng cột trong mỗi dòng
                        const columnCount = Object.keys(row).length;
                        const headerString = Object.keys(row)[0];
                        const headers = headerString.split(';');
                        const dataString = Object.values(row)[0];
                        const values = dataString.split(';');
                        // Tạo đối tượng chứa dữ liệu
                        const rowData = {
                            macongty: values[0],
                            madotthuctap: iddotthuctap,
                            congviecthuctap: values[1],
                            ghichu: values[2],
                        };
                        console.log(rowData);
                        // headers.forEach((header, index) => {
                        //   rowData[header] = values[index];
                        // });
                        data.push(rowData);
                    } catch (err) {
                        console.error('Error processing row:', err);
                    }
                })
                .on('end', async () => {
                    // // Xóa tệp CSV sau khi đọc xong
                    // fs.unlinkSync(file.path);

                    // Lưu dữ liệu vào MongoDB
                    Data.create(data)
                        .then((result) => {
                            console.log(data);
                            res.status(201).json(result);
                        })
                        .catch((err) => {
                            res.status(500).json({ error: err });
                        });
                })
                .on('error', (err) => {
                    console.error('Stream error:', err);
                    res.status(500).json({ message: 'Lỗi khi đọc tệp CSV!' });
                });

            stream.pipe(csvStream);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Upload và lưu vào MongoDB thất bại!',
            });
        }
    },
);

//routes
app.use('/taikhoan', TaikhoanRoutes);
app.use('/student', SinhVienRoutes);
app.use('/company', CongTyRoutes);
app.use('/teacher', GiaoVienRoutes);
app.use('/admin', AdminRoutes);

app.listen(port, () => {
    console.log('API server is running on port 3001');
});
