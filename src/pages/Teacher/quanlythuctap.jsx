import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { PiStudentDuotone } from 'react-icons/pi';
import { TbHomeEco } from 'react-icons/tb';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';

function QuanLyThucTap() {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan"); 
    return (
        <div className='container'>
           <div className='Navbar'>
            <ul id='navbar'>
            <Link href=""><li className='thongbao '><GrNotification className='icon'/></li></Link>
              <Link to={`/teacher/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/teacher/quanlythuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap' className='click'><FiUsers className='icon'/>Thực tập</li></a></Link>
              <Link to={`/teacher/congty/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin'  ><TbHomeEco className='icon'/>Công ty</li></a></Link>
              <Link to={`/teacher/sinhvien/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Sinh viên</li></a></Link>
              <Link to={`/teacher/giaovien/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Giáo viên</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuat'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Quản lý thực tập</span></div>
              <div className="content">
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Đơn đăng ký thực tập</h1>
                      <div className="danhsachdondangky">
                      <input type="text" placeholder='Công ty' /> 
                      <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                      <table>
                        <tr className='tieude_table'>
                          <th id='stt'>STT</th>
                          <th id='masinhvien'>Mã sinh viên</th>
                          <th id='tensinhvien'>Tên sinh viên</th>
                          <th id='tencongty'>Tên công ty đăng ký</th>
                          <th id='ngaytaodon'>Ngày tạo đơn</th>
                          <th id='trangthai'>Trạng thái</th>
                        </tr>
                        <Link to="/teacher/quanlythuctap/thongtindangky/">
                            <tr className='info'>
                            <th id='stt'>1</th>
                            <th id='masinhvien'>110121255</th>
                            <th id='tensinhvien'>Lâm Huệ Trung</th>
                            <th id='tencongty'>VTA</th>
                            <th id='ngaytaodon'>23/10/2023</th>
                            <th id='trangthai'>Chưa duyệt</th>
                            </tr>
                        </Link>

                      </table>
                </div>
            </div>

                    
              </div>
              
          </div>
        </div>
    )
}

export default QuanLyThucTap;
