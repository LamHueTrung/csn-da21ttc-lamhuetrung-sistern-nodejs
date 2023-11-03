import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineCheck } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { TbHomeEco } from 'react-icons/tb';
import { PiStudentDuotone } from 'react-icons/pi';
import { FiUsers } from 'react-icons/fi';
import '../../css/teacher.css';
import '../../css/base.css';
function thongtindangky() {

    return (
        <div className='container'>
           <div className='Navbar'>
            <ul id='navbar'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to="/teacher/tintuc"><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to="/teacher/quanlythuctap"><a href=""><li id='thuctap' className='click'><FiUsers className='icon'/>Thực tập</li></a></Link>
              <Link to="/teacher/congty"><a href=""><li id='thongtin'  ><TbHomeEco className='icon'/>Công ty</li></a></Link>
              <Link to="/teacher/sinhvien"><a href=""><li id='thongtin'><PiStudentDuotone className='icon'/>Sinh viên</li></a></Link>
              <Link to="/teacher/giaovien"><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Giáo viên</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuat'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Đơn đăng ký thực tập</span></div>
              <div className="content">
                    <div className="thongtincanhan">
                        <ul className='thongtintaikhoan'>
                            <li>
                                <span className='lable'>Trạng thái đơn</span>
                                <span className='info'>Chờ duyệt</span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Thực tập</h1>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Họ tên</span>
                              <span className='info'>Lâm Huệ Trung</span>
                          </li>
                          <li>
                              <span className='lable'>Mã sinh viên</span>
                              <span className='info'>110121255</span>
                          </li>
                          <li>
                              <span className='lable'>Ngày sinh</span>
                              <span className='info'>08/01/2003</span>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Số điện thoại</span>
                              <span className='info'>0763849007</span>
                          </li>
                          <li>
                              <span className='lable'>Email</span>
                              <span className='info'>lamhuetrung@gmail.com</span>
                          </li>
                          <li>
                              <span className='lable'>Lớp</span>
                              <span className='info'>DA21TTC</span>
                          </li>
                      </ul>
                    </div>
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">1. Lựa chọn công ty</h1>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Công ty</span>
                              <span className='info'>VTA</span>
                          </li>
                          <li>
                              <span className='lable'>Email công ty</span>
                              <span className='info'>example@gmail.com</span>
                          </li>
                          <li>
                              <span className='lable'>Số điên thoại</span>
                              <span className='info'>0123456789</span>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Địa chỉ</span>
                              <span className='info'>TP.HCM</span>
                          </li>
                          <li>
                              <span className='lable'>Người phụ trách</span>
                              <span className='info'>Nguyễn Văn A</span>
                          </li>
                          <li>
                              <span className='lable'>Email người phụ trách</span>
                              <span className='info'>example@gmail.com</span>
                          </li>
                      </ul>
                    </div>
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">2. Thông tin đăng ký</h1>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Học phần thực tập</span>
                              <span className='info'>Đồ án cơ sở ngành</span>
                          </li>
                          <li>
                              <span className='lable'>Ngày bắt đầu</span>
                              <span className='info'>23/10/2023</span>
                          </li>
                          <li>
                              <span className='lable'>Ngày kết thúc</span>
                              <span className='info'>23/12/2023</span>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Giáo viên</span>
                              <span className='info'>Nguyễn Bảo Ân</span>
                          </li>
                          <li>
                              <span className='lable'>Số buổi/tuần</span>
                              <span className='info'>8</span>
                          </li>
                          <li>
                              <span className='lable'>Số giờ/buổi</span>
                              <span className='info'>8</span>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Nội dung thực tập</span>
                              <span className='info'>Javascript</span>
                          </li>
                      </ul>
                    </div>
                    {/* <div className="dinhkem">
                      <h1 className="lable_chitiet">3.Đính kèm</h1>
                      <ul className='thongtintaikhoan' ><li>
                          <input className='fullsize_input' type="file" placeholder='Nội dung thực tập' />
                      </li></ul>
                    </div> */}
                    <div className="nutbam">
                        <Link to="/teacher/quanlythuctap">
                            <button className='button_huy'> <ImCancelCircle className='icon_button'/>Đóng</button>
                            <button className='button_huy'> <ImCancelCircle className='icon_button'/>Từ chối</button>
                            <button className='button_luu'> <AiOutlineCheck className='icon_button'/>Đồng ý</button>
                        </Link>
                        
                    </div>

                    
              </div>
              
          </div>
        </div>
    )
}

export default thongtindangky;
