import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineCheck } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { LiaUserCogSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../css/student.css';
import '../../css/base.css';

function thuctap() {
    return (
        <div className='container'>
          <div className='Navbar navbarSinhVien'>
            <ul id='navbar'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to="/student/tintuc"><a ><li id='tintuc'><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to="/student/dondangky"><a href=""><li id='thuctap'><LiaUserCogSolid className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to="/student/thuctap"><a href=""><li id='thuctap'  className='click'><LiaUserCogSolid className='icon'/>Thực tập</li></a></Link>
              {/* <Link to="/student/thongtintaikhoan"><a href=""><li id='thongtin' ><AiOutlineInfoCircle className='icon'/>Thông tin</li></a></Link> */}
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatsinhvien'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Thực tập</span></div>
              <div id='thongtinthuctap' className="content">
                    <div className="thongtincanhan">
                        <ul className='thongtintaikhoan'>
                            <li>
                                <span className='lable'>Trạng thái đơn</span>
                                <span className='info'>Đã duyệt</span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                    <h1 className="lable_chitiet">Thông tin sinh viên</h1>
                    <ul className='thongtintaikhoan'>
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
                              <span className='lable'>Họ tên</span>
                              <span className='info'>Lâm Huệ Trung</span>
                          </li>
                          <li>
                              <span className='lable'>Mã sinh viên</span>
                              <span className='info'>110121255</span>
                          </li>
                          <li>
                              <span className='lable'>Lớp</span>
                              <span className='info'>DA21TTC</span>
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
                              <span className='lable'>Nội dung thực tập</span>
                              <span className='info'>Javascipt</span>
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
                    </div>
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Báo cáo tuần</h1>
                      <select className='tuanthuctap' name="" id="">
                          <option value="">Tuần 1</option>
                          <option value="">Tuần 2</option>
                          <option value="">Tuần 3</option>
                          <option value="">Tuần 4</option>
                      </select>
                          <ul className='thongtintaikhoan thongtinthuctap'>
                            <li>
                                <span className='lable'>Tình trạng nộp: </span>
                                <span className='info'>Chưa nộp</span>
                            </li>
                            <li>
                                <span className='lable'>Hạn nộp: </span>
                                <span className='info'>01/11/2023</span>
                            </li>
                        </ul>
                        <ul className='thongtintaikhoan nopbai' >
                          <li>
                          <input className='fullsize_input' type="file" placeholder='Nội dung thực tập'/>
                          </li>
                          <button className='button_chinhsua'>Nộp bài</button>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Báo cáo tổng kết</h1>
                        <ul className='thongtintaikhoan nopbai' >
                          <li>
                          <input className='fullsize_input' type="file" placeholder='Nội dung thực tập'/>
                          </li>
                          <button className='button_chinhsua'>Nộp bài</button>
                        </ul>
                    </div>
              </div>
          </div>
        </div>
    )
}

export default thuctap;
