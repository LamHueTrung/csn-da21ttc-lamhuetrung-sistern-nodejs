import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import port from '../port';
import axios from 'axios';
import '../css/login.css';

function Login() {
    const [password, setPassword] = useState('');
    const [emails, setEmail] = useState('');
    const [tensinhviens, settensinhvien] = useState('');
    const [masinhviens, setmasinhvien] = useState('');
    const [sodienthoais, setsodienthoai] = useState('');
    const [ngaysinhs, setngaysinh] = useState('');
    const [lops, setlop] = useState('');
    const [TaiKhoans, setTaiKhoans] = useState([]);

    const navigate = useNavigate();
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const loaiTK = urlParams.get('loaitaikhoan');

    useEffect(() => {
        axios
            .get(`${port}/taikhoan/dangnhaptaikhoan`)
            .then((response) => setTaiKhoans(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);

    const handleLogin = (event) => {
        const tendangnhap = document.getElementById('tendangnhap');
        const matkhau = document.getElementById('matkhau');
        if (tendangnhap.value == '') {
            alert('Không bỏ trống tên đăng nhập');
            tendangnhap.focus();
        } else if (matkhau.value == '') {
            alert('Không bỏ trống mật khẩu');
            matkhau.focus();
        }
    };
    const handleSignupGV = (event) => {
        const matkhau = document.getElementById('matkhauDK');
        const email = document.getElementById('emailDk');
        var erorr_dangky = 0;
        if (email.value == '') {
            alert('Không bỏ trống email');
            erorr_dangky = 1;
            email.focus();
        } else if (matkhau.value == '') {
            alert('Không bỏ trống mật khẩu');
            erorr_dangky = 1;
            matkhau.focus();
        } else {
            if (email.value != '') {
                var temp = 0;
                TaiKhoans.map((taikhoan) => {
                    if (taikhoan.taikhoan == email.value) {
                        temp = 1;
                    }
                });
                if (temp == 1) {
                    alert('Email đã sử dụng');
                    erorr_dangky = 1;
                    email.focus();
                }
            }
            if (erorr_dangky == 0) {
                navigate(
                    `/xuly/?xuly=dangky&loaitaikhoan=${loaiTK}&taikhoan=${emails}&matkhau=${password}`,
                );
            }
        }
    };
    const handleSignup = (event) => {
        const matkhau = document.getElementById('matkhauDK');
        const email = document.getElementById('emailDk');
        const tensinhvien = document.getElementById('tensinhvienlDk');
        const masinhvien = document.getElementById('masinhvienlDk');
        const ngaysinh = document.getElementById('ngaysinhDk');
        const sodienthoail = document.getElementById('sodienthoailDk');
        const lop = document.getElementById('lopDk');
        var erorr_dangky = 0;
        if (tensinhvien.value == '') {
            erorr_dangky = 1;
            alert('không bỏ trống họ tên');
            tensinhvien.focus();
        } else if (masinhvien.value.length != 9) {
            alert('Mã sinh viên phải 9 chữ số');
            erorr_dangky = 1;
            masinhvien.focus();
        } else if (email.value == '') {
            alert('Không bỏ trống email');
            erorr_dangky = 1;
            email.focus();
        } else if (ngaysinh.value.length == '') {
            alert('Không bỏ trống ngày sinh');
            erorr_dangky = 1;
            ngaysinh.focus();
        } else if (sodienthoail.value.length != 10) {
            alert('Số điện thoại không hợp lệ');
            erorr_dangky = 1;
            sodienthoail.focus();
        } else if (lop.value.length == '') {
            alert('Không bỏ trống lớp');
            erorr_dangky = 1;
            lop.focus();
        } else if (matkhau.value == '') {
            alert('Không bỏ trống mật khẩu');
            erorr_dangky = 1;
            matkhau.focus();
        } else {
            if (ngaysinh.value.length != '') {
                const myDate = new Date(ngaysinh.value);
                const currentDate = new Date();
                const age = currentDate.getFullYear() - myDate.getFullYear();
                if (age < 18) {
                    alert(`Bạn ${age} tuổi không phải sinh viên đại học`);
                    erorr_dangky = 1;
                    ngaysinh.focus();
                }
            }
            if (email.value != '') {
                var temp = 0;
                TaiKhoans.map((taikhoan) => {
                    if (taikhoan.taikhoan == email.value) {
                        temp = 1;
                    }
                });
                if (temp == 1) {
                    alert('Email đã sử dụng');
                    erorr_dangky = 1;
                    email.focus();
                }
            }
            if (erorr_dangky == 0) {
                navigate(
                    `/xuly/?xuly=dangky&loaitaikhoan=${loaiTK}&taikhoan=${emails}&matkhau=${password}&tensinhvien=${tensinhviens}&masinhvien=${masinhviens}&ngaysinh=${ngaysinhs}&sodienthoai=${sodienthoais}&lop=${lops}`,
                );
            }
        }
    };
    function Dangky() {
        const Login = document.querySelector('.login');
        const signUp = document.querySelector('.signUp');
        const signUpSV = document.querySelector('.signUpSV');
        if (urlParams.get('loaitaikhoan') == 'admin') {
            alert('Không thể đăng ký tài khoản quản trị');
        } else if (urlParams.get('loaitaikhoan') == 'sinhvien') {
            Login.classList.add('close');
            signUpSV.classList.remove('close');
        } else {
            Login.classList.add('close');
            signUp.classList.remove('close');
        }
    }
    return (
        <div className="home">
            <div className="login ">
                <h2>Đăng Nhập</h2>
                <form>
                    <div>
                        <input
                            id="tendangnhap"
                            placeholder="Email đăng ký"
                            type="text"
                            value={emails}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="matkhau"
                            placeholder="Mật khẩu"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <a className="text-login" onClick={Dangky}>
                        Đăng ký tài khoản?
                    </a>
                    <a className="text-login" href="/">
                        Lựa chọn tài khoản?
                    </a>
                    <Link
                        to={`/xuly/?xuly=dangnhap&taikhoan=${emails}&matkhau=${password}&loaitaikhoan=${loaiTK}`}
                    >
                        <button onClick={handleLogin}>Đăng Nhập</button>
                    </Link>
                </form>
            </div>

            <div className="signUp close">
                <h2>Đăng Ký</h2>
                <form>
                    <div>
                        <input
                            id="emailDk"
                            placeholder="Email"
                            type="text"
                            value={emails}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="matkhauDK"
                            placeholder="Mật khẩu"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="nhaplaimatkhauDK"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link
                    // to={`/xuly/?xuly=dangky&loaitaikhoan=${loaiTK}&taikhoan=${emails}&matkhau=${password}`}
                    >
                        <button onClick={handleSignupGV}>Đăng Ký</button>
                    </Link>
                </form>
            </div>
            <div className="signUpSV close">
                <h2>Đăng Ký</h2>
                <form>
                    <div>
                        <input
                            id="emailDk"
                            placeholder="Email"
                            type="text"
                            value={emails}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="tensinhvienlDk"
                            placeholder="Tên sinh viên"
                            type="text"
                            value={tensinhviens}
                            onChange={(e) => settensinhvien(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="masinhvienlDk"
                            placeholder="Mã số sinh viên"
                            type="number"
                            value={masinhviens}
                            onChange={(e) => setmasinhvien(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="ngaysinhDk"
                            placeholder="Ngày sinh"
                            type="date"
                            value={ngaysinhs}
                            onChange={(e) => setngaysinh(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="sodienthoailDk"
                            placeholder="Số điện thoại"
                            type="number"
                            value={sodienthoais}
                            onChange={(e) => setsodienthoai(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="lopDk"
                            placeholder="Lớp"
                            type="text"
                            value={lops}
                            onChange={(e) => setlop(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="matkhauDK"
                            placeholder="Mật khẩu"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            id="nhaplaimatkhauDK"
                            placeholder="Nhập lại mật khẩu"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link
                    // to={`/xuly/?xuly=dangky&loaitaikhoan=${loaiTK}&taikhoan=${emails}&matkhau=${password}&tensinhvien=${tensinhviens}&masinhvien=${masinhviens}&ngaysinh=${ngaysinhs}&sodienthoai=${sodienthoais}&lop=${lops}`}
                    >
                        <button onClick={handleSignup}>Đăng Ký</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}
export default Login;
