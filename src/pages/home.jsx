import { useNavigate } from 'react-router-dom';
import '../css/login.css';

function Home() {
    const navigate = useNavigate();
    const sinhvien = (event) => {
        event.preventDefault();
        navigate('/student/?loaitaikhoan=sinhvien');
    };
    const admin = (event) => {
        event.preventDefault();
        navigate('/admin/?loaitaikhoan=admin');
    };
    const giaovien = (event) => {
        event.preventDefault();
        navigate('/teacher/?loaitaikhoan=giaovien');
    };
    return (
        <div className="box">
            <div className="gioithieu">
                <img
                    src="https://ktcn.tvu.edu.vn/ht96_image/slider/banner%20PR%20khoa%20KTCN.jpg"
                    alt=""
                />
                <h1>GIỚI THIỆU KHOA</h1>
                <span className="noidunggioithieu">
                    Với sự phát triển của kỹ thuật hiện đại, Kỹ thụât và Công
                    nghệ đóng một vai trò rất quan trọng trong phát triển công
                    nghiệp, Khoa Kỹ thuật và Công nghệ (KT&CN) được thành lập
                    theo quyết định số: 179/QĐ-ĐHTV ngày 20/10/2006 của Hiệu
                    trưởng trường Đại học Trà Vinh với 5 đơn vị: Bộ môn Công
                    nghệ Thông tin, bộ môn Điện - Điện tử, bộ môn Cơ khí - Động
                    lực, bộ môn Xây dựng và Văn phòng Khoa. Hiện tại, đội ngũ
                    của Khoa có 80 viên chức, tất cả họ đều trẻ, năng động và
                    ham học hỏi. Vì thế, Khoa tạo nhiều cơ hội để họ được bồi
                    dưỡng và nâng cao nghề nghiệp. Hằng năm, Khoa tuyển mới trên
                    500 sinh viên. Đặc biệt, số lượng sinh viên tìm được việc
                    làm sau 1 năm tốt nghiệp là trên 90%.
                </span>
            </div>
            <div className="home_index">
                <span className="chonloaitaikhoan">SIS-Intern</span>
                <div className="loaitaikhoan">
                    <button onClick={admin} id="admin">
                        Quản trị nội dung
                    </button>
                    <button onClick={giaovien} id="sinhvien">
                        Giáo viên
                    </button>
                    <button onClick={sinhvien} id="sinhvien">
                        Sinh viên
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Home;
