# csn-da21ttc-lamhuetrung-sistern-nodejs
File Config/db/index.js đây là file cấu hình kết nối đến mongoDB. Đầu tiên cần require thư viện mongoose vào để tương tác với MongoDb một cách thuận tiện. Tạo ra hàm connect để kết nối, sử dụng mongoose.connect() để cấu hình kết nối và sử dụng module.exports = { connect } xuất hàm connect ra để có thể sử dụng nó ở bất kỳ đâu trong ứng dụng.
Trong thư mục Models chứa các file BaoCao.js,	CanBoHuongDan.js, CongTy.js, DotThucTap.js, GiaoVien.js,	SinhVien.js, 	Taikhoan.js, ThongTinCongBo.js, ThucTap.js, 	TinTuc.js để tạo ra models cho các đối tượng trong cần xử lý trong cơ sở dữ liệu. Thực hiện require mongoose sử dụng để tương tác với cơ sở dữ liệu MongoDB từ ứng dụng Node.js của mình. Định nghĩa Schema để mô tả cấu trúc dữ liệu cho đối tượng trong cơ sở dữ liệu MongoDB. Tạo models từ schema Model này sẽ làm việc như một interface giữa ứng dụng Node.js của bạn và cơ sở dữ liệu MongoDB, cho phép bạn thực hiện các thao tác như tìm kiếm, thêm mới, cập nhật, xoá dữ liệu và nhiều thao tác khác. Xuất model để có thể sử dụng nó ở bất kỳ đâu trong ứng dụng của mình. 
Trong mục controllers chứa các file CongTyController.js, DotThucTapController.js, GiaoVienController.js, SinhVienController.js, TaiKhoanController.js, ThongTinCongBoController.js, ThucTapController.js, TinTucController.js để xử lý các yêu cầu CRUD từ giao diện người dùng. 
Trong thư mục routes chứa file AdminRoutes.js, CongTyRoutes.js, DangKyRoutes.js, GiaoVienRoutes.js, SinhVienRoutes.js qui định các đường dẫn đến các xử lý được viết trong Controllers. Để sử dụng các hàm xử lý được viết trong controllers cần require các file đó ra gán vào biến và gọi đến các hàm được viết trong file đó bằng cách sử dụng toán tử “.”. 
Thư mục uploads chứa các file báo cáo của sinh viên nộp lên trong quá trình thực tập.
File index,js khi chạy dự án file index sẽ được tự động thực hiện. Chính vì thế, để sử dụng các thư viện đã cài đặt và các đường dẫn xử lý cần require và định nghĩa ở đây.
