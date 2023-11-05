import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/login.css';

function Login() {
  const [password, setPassword] = useState('');
  const [emails, setEmail] = useState('');
  const navigate = useNavigate();
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);

  const handleLogin = (event) => {
    const tendangnhap = document.getElementById('tendangnhap');
    const matkhau = document.getElementById('matkhau');
    if(tendangnhap.value == "")
    {
        alert("Không bỏ trống tên đăng nhập");
        tendangnhap.focus();
    } else if (matkhau.value == "") {
        alert("Không bỏ trống mật khẩu");
        matkhau.focus();
    } else {
        if (urlParams.get("loaitaikhoan") == 'sinhvien') {
           navigate(`/student/xuly/?xuly=dangnhap&taikhoan=${tendangnhap.value}&matkhau=${matkhau.value}&loaitaikhoan=sinhvien`);
        }
         if (urlParams.get("loaitaikhoan") == 'giaovien') {
           navigate(`/teacher/xuly/?xuly=dangnhap&taikhoan=${tendangnhap.value}&matkhau=${matkhau.value}&loaitaikhoan=giaovien`);
        }
         if (urlParams.get("loaitaikhoan") == 'congty') {
           navigate(`/company/xuly/?xuly=dangnhap&taikhoan=${tendangnhap.value}&matkhau=${matkhau.value}&loaitaikhoan=congty`);
        }
    }

  };
  const handleSignup = (event) => {
    const matkhau = document.getElementById('matkhauDK');
    const email = document.getElementById('emailDk');
    if(email.value == "") {
        alert("Không bỏ trống email");
        email.focus();
    }else if (matkhau.value == "") {
        alert("Không bỏ trống mật khẩu");
        matkhau.focus();
    } else {
        if (urlParams.get("loaitaikhoan") == 'sinhvien') {
            navigate(`/student/xuly/?xuly=dangky&loaitaikhoan=sinhvien&taikhoan=${emails}&matkhau=${password}`);
        } 
        else if (urlParams.get("loaitaikhoan") == 'giaovien') {
            navigate(`/teacher/xuly/?xuly=dangky&loaitaikhoan=giaovien&taikhoan=${emails}&matkhau=${password}`);
         } else if (urlParams.get("loaitaikhoan") == 'congty') {
            navigate(`/company/xuly/?xuly=dangky&loaitaikhoan=congty&taikhoan=${emails}&matkhau=${password}`);
 
         }
    }        
  };
  function Dangky() {
    const Login = document.querySelector('.login');
    const signUp = document.querySelector('.signUp');
    Login.classList.add('close');
    signUp.classList.remove('close');
        
  }
  return (
    <div className="home">
        <div className='login '>
            <h2>Đăng Nhập</h2>
        <form>
            <div>
            <input
                id='tendangnhap'
                placeholder='Email đăng ký'
                type="text"
                value={emails}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <input
                id='matkhau'
                placeholder='Mật khẩu'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <a onClick={Dangky}>Đăng ký tài khoản?</a>
            <a href='/'>Lựa chọn tài khoản?</a>
            <button onClick={handleLogin}>Đăng Nhập</button>
        </form>
        </div>

        <div className='signUp close'> 
            <h2>Đăng Ký</h2>
            <form>
                <div>
                <input
                    id='emailDk'
                    placeholder='Email'
                    type="text"
                    value={emails}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <input
                    id='matkhauDK'
                    placeholder='Mật khẩu'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                </div>
                <div>
                <input
                    id='nhaplaimatkhauDK'
                    placeholder='Nhập lại mật khẩu'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button onClick={handleSignup}>Đăng Ký</button>
            </form>
        </div>
    </div>
  );
}
export default Login;