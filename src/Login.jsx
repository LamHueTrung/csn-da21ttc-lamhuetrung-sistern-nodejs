import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/login.css';

function Login() {
    const [password, setPassword] = useState('');
    const [emails, setEmail] = useState('');
    const navigate = useNavigate();
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const loaiTK = urlParams.get('loaitaikhoan');

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
    const handleSignup = (event) => {
        const matkhau = document.getElementById('matkhauDK');
        const email = document.getElementById('emailDk');
        if (email.value == '') {
            alert('Không bỏ trống email');
            email.focus();
        } else if (matkhau.value == '') {
            alert('Không bỏ trống mật khẩu');
            matkhau.focus();
        }
    };
    function Dangky() {
        const Login = document.querySelector('.login');
        const signUp = document.querySelector('.signUp');
        if (urlParams.get('loaitaikhoan') == 'admin') {
            alert('Không thể đăng ký tài khoản quản trị');
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
                        to={`/xuly/?xuly=dangky&loaitaikhoan=${loaiTK}&taikhoan=${emails}&matkhau=${password}`}
                    >
                        <button onClick={handleSignup}>Đăng Ký</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}
export default Login;
