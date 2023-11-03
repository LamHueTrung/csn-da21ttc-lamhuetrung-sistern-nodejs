import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function Thuctap() {
  const [canbohds, setCanBoHD] = useState([]);
  const [congtys, setCongTy] = useState([]);
  const [Giaoviens, setGiaoviens] = useState([]);
  const [sinhViens, setSinhViens] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/student/danhsachsinhvien') 
      .then((response) => setSinhViens(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:3001/company/canbohuongdan') 
      .then((response) => setCanBoHD(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  
  useEffect(() => {
    axios.get('http://localhost:3001/company/danhsachcongty') 
      .then((response) => setCongTy(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/teacher/danhsachgiaovien') 
      .then((response) => setGiaoviens(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  function open() {
    const danhsachdangky = document.querySelector('.danhsachcongty');
    danhsachdangky.classList.remove('close');
  }
  function close() {
    const danhsachdangky = document.querySelector('.danhsachcongty');
    danhsachdangky.classList.add('close');
  }
  function open_canbo() {
    const danhsachcanbo = document.querySelector('.danhsachcanbo');
    danhsachcanbo.classList.remove('close');
  }
  function close_canbo() {
    const danhsachcanbo = document.querySelector('.danhsachcanbo');
    danhsachcanbo.classList.add('close');
  }

  const thongtinsinhvien = sinhViens.filter(sv => sv.masinhvien == "110121255");
    return (
        <div className='container'>
          <div className='Navbar navbarSinhVien'>
            <ul id='navbar'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to="/student/tintuc"><a ><li id='tintuc'><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to="/student/dondangky"><a href=""><li id='thuctap'  className='click'><LiaUserCogSolid className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to="/student/thuctap"><a href=""><li id='thuctap'  ><LiaUserCogSolid className='icon'/>Thực tập</li></a></Link>
              {/* <Link to="/student/thongtintaikhoan"><a href=""><li id='thongtin' ><AiOutlineInfoCircle className='icon'/>Thông tin</li></a></Link> */}
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatsinhvien'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Đăng ký thực tập</span></div>
              <div id='dondangky' className="content">
                    <div className="danhsachcongty close">
                        <input type="text" placeholder='Công ty' /> 
                        <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                        <table>
                          <tr className='tieude_table'>
                            <th id='stt'>STT</th>
                            <th id='checked'></th>
                            <th id='tencongty'>Tên công ty</th>
                            <th id='diachi'>Địa chỉ</th>
                            <th id='sdt'>Email</th>
                            <th id='email'>Vị trí thực tập</th>
                          </tr>
                          {congtys.map((congty, index) => {
                            return <tr className='info'>
                            <th id='stt'>{index + 1}</th>
                            <th id='checked'><input type="radio" /></th>
                            <th id='tencongty'>{congty.tencongty}</th>
                            <th id='diachi'>{congty.diachi}</th>
                            <th id='sdt'>{congty.email}</th>
                            <th id='email'>{congty.vitri}</th>
                          </tr>
                        })
                        }
                          
                          
                        </table>
                        <div className="nutbam">
                        <button className='button_huy' onClick={close}> <ImCancelCircle className='icon_button'/>Đóng</button>
                        <button className='button_luu'> <AiOutlineCheck className='icon_button'/>Xác nhận</button>
                      </div>
                      </div>
                      <div className="danhsachcanbo close">
                        <input type="text" placeholder='Công ty' /> 
                        <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                        <table>
                          <tr className='tieude_table'>
                            <th id='checked'></th>
                            <th id='tencongty'>Tên cán bộ</th>
                            <th id='vitri'>vị trí hướng dẫn</th>
                            <th id='chucvu'>Chức vụ</th>
                            <th id='sdt'>số điện thoại</th>
                            <th id='email'>Email</th>
                          </tr>
                          {canbohds.map((canbohd) => {
                              return <tr className='info'>
                              <th id='checked'><input type="radio" /></th>
                              <th id='tencongty'>{canbohd.tencanbo}</th>
                              <th id='vitri'>{canbohd.vitri}</th>
                              <th id='chucvu'>{canbohd.chucvu}</th>
                              <th id='sdt'>{canbohd.sodienthoai}</th>
                              <th id='email'>{canbohd.email}</th>
                            </tr>
                          })
                          }
                        </table>
                        <div className="nutbam">
                        <button className='button_huy' onClick={close_canbo}> <ImCancelCircle className='icon_button'/>Đóng</button>
                        <button className='button_luu'> <AiOutlineCheck className='icon_button'/>Xác nhận</button>
                      </div>
                      </div>
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Thông tin sinh viên</h1>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Họ tên</span>
                              {thongtinsinhvien.map(sv => {
                                  return <span className='info'>{sv.hoten}</span>
                              })
                              }
                          </li>
                          <li>
                              <span className='lable'>Mã sinh viên</span>
                              {thongtinsinhvien.map(sv => {
                                  return <span className='info'>{sv.masinhvien}</span>
                              })
                              }
                          </li>
                          <li>
                              <span className='lable'>Ngày sinh</span>
                              {thongtinsinhvien.map(sv => {
                                  return <span className='info'>{sv.ngaysinh}</span>
                              })
                              }
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Số điện thoại</span>
                              {thongtinsinhvien.map(sv => {
                                  return <span className='info'>{sv.sodienthoai}</span>
                              })
                              }
                          </li>
                          <li>
                              <span className='lable'>Email</span>
                              {thongtinsinhvien.map(sv => {
                                  return <span className='info'>{sv.email}</span>
                              })
                              }
                          </li>
                          <li>
                              <span className='lable'>Lớp</span>
                              {thongtinsinhvien.map(sv => {
                                  return <span className='info'>{sv.lop}</span>
                              })
                              }
                          </li>
                      </ul>
                    </div>
                    <div className="luachoncongty">
                      <h1 className="lable_chitiet">1. Lựa chọn công ty</h1>
                      
                      <ul className='thongtintaikhoan'>
                          <li>
                              <input onClick={open} id='tencongty' type="text" placeholder='Tên công ty' /> 
                          </li>
                          <li>
                              <input type="mail" placeholder='Email công ty'/>
                          </li>
                          <li>
                              <input type="number" placeholder='Vị trí thực tập'/>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan fullsize' ><li>
                          <input className='fullsize_input' type="text" placeholder='Địa chỉ công ty'/>
                        </li></ul>
                      <ul className='thongtintaikhoan nguoiphutrach'>
                          <li>
                              <input onClick={open_canbo} type="text" placeholder='Người phụ trách (tại công ty)' /> 
                          </li>
                          <li>
                            <input type="text" placeholder='Điện thoại/Email người phụ trách' /> 
                          </li>
                      </ul>
                      <button className='button_chinhsua'> <AiOutlineCheck className='icon_button'/>Đăng ký thêm mới công ty</button>
                    </div>
                    <div className="thongtincongty">
                      <h1 className="lable_chitiet">2. Thông tin đăng ký</h1>
                      <ul className='thongtintaikhoan'>
                          <li>
                            <select name="" id="">
                                <option value="">Học phần thực tập</option>
                            </select>
                          </li>
                          <li>
                              <input  placeholder='Ngày bắt đầu' type="text"/>
                          </li>
                          <li>
                              <input placeholder='Ngày kết thúc' type="text" />
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                          <li>
                            <select name="" id="1">
                              <option value="">--Chọn giáo viên--</option>
                              {Giaoviens.map((giaovien,) => {
                                return <option value="">{giaovien.tengiaovien}</option>
                            })
                            }
                            </select>
                          </li>
                          <li>
                              <input type="number" placeholder='Số buổi/Tuần' /> 
                          </li>
                          <li>
                            <input type="number" placeholder='Số giờ/buổi' /> 
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan fullsize' ><li>
                          <input className='fullsize_input description' type="text" placeholder='Nội dung thực tập'/>
                        </li></ul>
                      <button className='button_chinhsua'> <AiOutlineCheck className='icon_button'/>Đăng ký thêm mới công ty</button>
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

export default Thuctap;
