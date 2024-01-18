# csn-da21ttc-lamhuetrung-sistern-nodejs
# HỆ THỐNG QUẢN LÝ SINH VIÊN THỰC TẬP CỦA BỘ MÔN CÔNG NGHỆ THÔNG TIN <br>
### PHẦN FRONT-END
### SỬ DỤNG HOSTING NETLIFY.COM, LINK FRONT-END: https://sisterntvu.netlify.app/
  <pre>
    ## Mô tả: Cần cài đặt các thư viên sau: <br>
        "axios": "^1.6.0",<br>
        "date-fns": "^2.30.0",<br>
        "prettier": "^3.1.0",<br>
        "react": "^18.2.0",<br>
        "react-dom": "^18.2.0",<br>
        "react-dropzone": "^14.2.3",<br>
        "react-file-viewer": "^1.2.1",<br>
        "react-icons": "^4.11.0",<br>
        "react-router-dom": "^6.18.0",<br>
        "react-scripts": "5.0.1",<br>
        "web-vitals": "^2.1.4"<br>
    Trong thư mục CSS gồm có các file Base.css, Company.css, Login.css,  Responsive.css, Student.css, Teacher.css, Admin.css được sự dụng để định dạng và trang trí nội dung của giao diện ứng dụng.
Trong thu mục Pages chứa các file giao diện của ứng dụng.<br>
    Pages/admin chứa giao diện của admin như: Giao diện danh sách công ty (Congty.jsx), giao diện đợt thực tập (dotthuctap.jsx), giao diện giáo viên (giaovien.jsx), giao diện quản lý đợt thực tập (quanlydotthuctap.jsx), giao diện quản lý thực tập (quanlythuctap.jsx), giao diện danh sách sinh viên (sinhvien.jsx), giao diện thêm công ty (themcongty.jsx), giao diện thêm dữ liệu đợt thực tập (themdulieudotthuctap.jsx), giao diện chi tiết đơn đăng ký (thongtindangky.jsx), giao diện tin tức (tintuc.jsx).<br>
    Pages/Student chứa  các giao diện của sinh viên như: Giao diện đơn đăng ký (dondangky.jsx), giao diện thực tập (thuctap.jsx), giao diện tin tức (tintuc.jsx).<br>
    Pages/Teacher chứa các giao diện của giáo viên như: Cập nhật thông tin (dangkythongtin.jsx), theo dõi thực tập (quanlythuctap.jsx), giao diện danh sách sinh viên (sinhvien.jsx), giao diện chi tiết đơn đăng ký (thongtindangky.jsx), giao diện xem báo cáo (xembaocao.jsx), giao diện tin tức (tintuc.jsx).<br>
    Ngoài ra còn có, Pages/Home.jsx là giao diện trang chủ khi sử dụng ứng dụng, Pages/Login.jsx là giao diện đăng nhập/đăng ký của ứng dụng và Pages/xulylogin.jsx là giao diện xử lý quá trình đăng nhập. <br>
    Src/App.js chứa các đường dẫn để hiển thị các giao diện trong Pages.<br>
    Src/port.jsx đây là file để cấu hình host cho hệ thống để kết nối với back-end.<br>
    Các hoạt động thực hiện: <br>
    - Giao diện hệ thống <br>
    - Lấy dữ liệu danhsachgiaovien, danhsachcongty từ monggoDB bằng axios. <br>
    - Update code phần tin tức cho các trang. Phần danh sách cán bộ hướng dẫn, danh sách công ty cho sinh viên <br>
    - Đăng ký thực tập của sinh viên.<br>
    - Chuyển trang trong quyền sinh viên.<br>
    - Fix lỗi login, sign up.<br>
    - Thêm quyền quản trị và tính năng duyệt đơn đăng ký thực tập.<br>
    - Thêm quyền giáo viên và thêm tin tức theo từ quyền try cập. <br>
    - Thêm respon mobile cho các trang.<br>
    - Chỉnh sửa giao diện home, thêm thông tin cho trang công ty - thực tập - sinh viên, chỉnh sửa logic đăng ký thực tập với công ty, chức năng thêm file báo cáo của sinh viên.<br>
    - Hiển thị thông tin báo cáo tuần của sinh viên và chức năng tải file báo cáo về máy.<br>
    - Sửa lỗi css admin.<br>
    - Fix lỗi sinh viên và giáo viên.<br>
    - Cập nhật lần cuối trước khi báo cáo.<br>
