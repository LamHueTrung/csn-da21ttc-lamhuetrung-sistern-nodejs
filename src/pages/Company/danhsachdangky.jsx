import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';
import '../../css/company.css';

function sinhvien() {
    return (
        <div className='container'>
           <div className='Navbar'>
            <ul id='navbar' className='company'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to="/company/tintuc"><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to="/company/dangkythuctap"><a href=""><li id='thuctap'><FiUsers className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to="/company/danhsachdangky"><a href=""><li id='thongtin' className='click'><PiStudentDuotone className='icon'/>Danh sách đăng ký</li></a></Link>
              <Link to="/company/canbohuongdan"><a href=""><li id='thongtin'><PiStudentDuotone className='icon'/>Cán bộ hướng dẫn</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatcongty'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Danh sách đăng ký thực tập</span></div>
              <div className="content">
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Danh sách đăng ký thực tập</h1>
                      <div className="danhsachdondangky">
                      <input type="text" placeholder='từ khóa' /> 
                      <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                      <table>
                        <tr className='tieude_table'>
                          <th id='stt'>STT</th>
                          <th id='masinhvien'>Mã sinh viên</th>
                          <th id='tensinhvien'>Tên sinh viên</th>
                          <th id='emailsinhvien'>Email</th>
                          <th id='sdt'>Số điện thoại</th>
                          <th id='vitri'>Vị trí</th>
                        </tr>
                        <tr className='info'>
                            <th id='stt'>1</th>
                            <th id='masinhvien'>110121255</th>
                            <th id='tensinhvien'>Lâm Huệ Trung</th>
                            <th id='emailsinhvien'>110121255@st.tvu.edu.vn</th>
                            <th id='sdt'>0763849007</th>
                            <th id='vitri'>font-end</th>
                        </tr>
                        
                      </table>
                </div>
            </div>

                    
              </div>
              
          </div>
        </div>
    )
}

export default sinhvien;
