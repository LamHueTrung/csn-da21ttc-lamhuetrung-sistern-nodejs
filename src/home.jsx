import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css'

function Home() {
  const navigate = useNavigate();
  
  const sinhvien = (event) => {
    navigate('/student/?loaitaikhoan=sinhvien');
    alert("Bạn đăng nhập với vai trò sinh viên");
  };
  const giaovien = (event) => {
    alert("Bạn đăng nhập với vai trò giáo viên");
    navigate('/teacher/?loaitaikhoan=giaovien');
  };
  const congty = (event) => {
    alert("Bạn đăng nhập với vai trò công ty");
    navigate('/company/?loaitaikhoan=congty');
  };
  return (
    <div className="home_index">
        <span className='chonloaitaikhoan'>SIS-Intern</span>
        <div className='loaitaikhoan'> 
            <button onClick={sinhvien} id='sinhvien'>Sinh viên</button>
            <button onClick={giaovien} id='giaovien'>Giáo viên</button>
            <button onClick={congty} id='congty'>Công ty</button>
        </div>
    </div>
  );

}
export default Home;