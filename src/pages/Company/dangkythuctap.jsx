import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineCheck } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/student.css';
import '../../css/base.css';

function thuctap() {
    return (
        <div className='container'>
          <div className='Navbar'>
            <ul id='navbar' className='company'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to="/company/tintuc"><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to="/company/dangkythuctap"><a href=""><li id='thuctap' className='click'><FiUsers className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to="/company/danhsachdangky"><a href=""><li id='thongtin'><PiStudentDuotone className='icon'/>Danh sách đăng ký</li></a></Link>
              <Link to="/company/canbohuongdan"><a href=""><li id='thongtin'><PiStudentDuotone className='icon'/>Cán bộ hướng dẫn</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatcongty'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Đăng ký chương trình thực tập</span></div>
              <div id='dondangky' className="content">
                
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Thông tin công ty</h1>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Tên công ty</span>
                              <span className='info'>VTA</span>
                          </li>
                          <li>
                              <span className='lable'>Địa chỉ</span>
                              <span className='info'>Quận Bình Thạnh, TP.HCM</span>
                          </li>
                          <li>
                              <span className='lable'>Số điện thoại</span>
                              <span className='info'>0123456789</span>
                          </li>
                          <li>
                              <span className='lable'>Email liên hệ</span>
                              <span className='info'>example@gmail.com</span>
                          </li>
                      </ul>
                    </div>
                    <div className="thongtincongty company">
                      <h1 className="lable_chitiet">Thông tin đăng ký</h1>
                      <ul className='thongtintaikhoan'>
                          <li>
                            <select name="" id="1">
                              <option value="">--Chọn trường--</option>
                              <option value="">Đại học Trà Vinh</option>
                            </select>
                          </li>
                          <li>
                            <input  placeholder='Vị trí thực tập' type="text"/>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                            <li>
                              <input placeholder='Ngày kết thúc' type="text" />
                            </li>
                            <li>
                              <input  placeholder='Ngày bắt đầu' type="text"/>
                            </li>
                      </ul>
                    </div>
                    <div className="thongtincongty company">
                      <h1 className="lable_chitiet">Thông tin cán bộ hướng dẫn</h1>
                      <ul className='thongtintaikhoan'>
                            <li>
                              <input placeholder='Cán bộ hướng dẫn' type="text" />
                            </li>
                            <li>
                              <input  placeholder='chức vụ' type="text"/>
                            </li>
                            <li>
                              <input  placeholder='vị trí hướng dẫn' type="text"/>
                            </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                            <li>
                              <input  placeholder='Số điện thoại' type="text"/>
                            </li>
                            <li>
                              <input  placeholder='email' type="text"/>
                            </li>
                      </ul>
                    </div>
                    <div className="nutbam">
                      <button className='button_huy'> <ImCancelCircle className='icon_button'/>Hủy</button>
                      <button className='button_luu'> <AiOutlineCheck className='icon_button'/>Lưu</button>
                    </div>
              </div>
              
          </div>
        </div>
    )
}

export default thuctap;
