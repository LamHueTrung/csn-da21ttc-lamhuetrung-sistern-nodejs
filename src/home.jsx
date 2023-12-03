import { useNavigate } from 'react-router-dom';
import './css/login.css';

function Home() {
    const navigate = useNavigate();
    const sinhvien = (event) => {
        event.preventDefault();
        navigate('/student/?loaitaikhoan=sinhvien');
        alert('Bạn đăng nhập với vai trò sinh viên');
    };
    const admin = (event) => {
        event.preventDefault();
        alert('Bạn đăng nhập với vai trò quản trị');
        navigate('/admin/?loaitaikhoan=admin');
    };
    const giaovien = (event) => {
        event.preventDefault();
        alert('Bạn đăng nhập với vai trò giáo viên');
        navigate('/teacher/?loaitaikhoan=giaovien');
    };
    const congty = (event) => {
        event.preventDefault();
        alert('Bạn đăng nhập với vai trò công ty');
        navigate('/company/?loaitaikhoan=congty');
    };
    return (
        <div className="home_index">
            <span className="chonloaitaikhoan">SIS-Intern</span>
            <div className="loaitaikhoan">
                <button onClick={admin} id="admin">
                    quản trị
                </button>
                <button onClick={giaovien} id="sinhvien">
                    Giáo viên
                </button>
                <button onClick={sinhvien} id="sinhvien">
                    Sinh viên
                </button>
                <button onClick={congty} id="congty">
                    Công ty
                </button>
            </div>
        </div>
    );
}
export default Home;
