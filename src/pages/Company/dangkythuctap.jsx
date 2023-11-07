import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { AiOutlineCheck } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import { format } from 'date-fns';
import '../../css/student.css';
import '../../css/base.css';
import '../../css/company.css';
function DangKyThucTap() {
  const [TaiKhoans, setTaiKhoans] = useState([]);
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan");
  useEffect(() => {
    axios.get('http://localhost:3001/company/dangnhaptaikhoan') 
      .then((response) => setTaiKhoans(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var ThongTinCongTy = {};
  TaiKhoans.map(tk => {
      if (tk.taikhoan == taikhoan){
        ThongTinCongTy = {  
          email: tk.taikhoan,
      };
    };
  });
  function Dangky() {
    var ThongTinDangKy = {};
    const macongty = Math.floor(Math.random() * 100000) + 1;
    ThongTinDangKy = {
      email: ThongTinCongTy.email,
      tencongty: document.getElementById('tencongty').value,
      macongty: macongty,
      diachi: document.getElementById('diachi').value,
      vitri: document.getElementById('vitri').value,
      ngaybatdau: document.getElementById('ngaybatdau').value,
      ngayketthuc: document.getElementById('ngayketthuc').value,
    }
    axios.post('http://localhost:3001/company/dangkythongtin', ThongTinDangKy)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error('Lỗi khi thêm dữ liệu:', error);
      });
      var DateNow = new Date();
      var ThongBao = {
        thoigian: format(DateNow, "HH:mm:ss - dd/MM/yyyy"),
        thongbaosinhvien: `Công ty ${ThongTinDangKy.tencongty} vừa đăng ký chương trình thực tập`,
      }
      axios.post('http://localhost:3001/company/themthongbao', ThongBao)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error('Lỗi khi thêm dữ liệu:', error);
        });
    var ThongTinCanBo ={};
    ThongTinCanBo = {
      macanbo: document.getElementById('macanbo').textContent,
      macongty: macongty,
      tencanbo: document.getElementById('tencanbo').value,
      chucvu: document.getElementById('chucvu').value,
      vitri: document.getElementById('vitrihuongdan').value,
      email: document.getElementById('email').value,
      sodienthoai: document.getElementById('sodienthoai').value,
    }
    axios.post('http://localhost:3001/company/themcanbo', ThongTinCanBo)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error('Lỗi khi thêm dữ liệu:', error);
      });
    alert("Đăng ký chương trình thực tập thành công");
  }
    return (
        <div className='container'>
          <div className='Navbar'>
            <ul id='navbar' className='company'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to={`/company/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/company/dangkythuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap' className='click'><FiUsers className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to={`/company/danhsachdangky/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin'><PiStudentDuotone className='icon'/>Danh sách đăng ký</li></a></Link>
              <Link to={`/company/canbohuongdan/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin'><PiStudentDuotone className='icon'/>Cán bộ hướng dẫn</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatcongty'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Đăng ký chương trình thực tập</span></div>
              <div id='dondangky' className="content">
                    <div className="thongtincongty company">
                      <h1 className="lable_chitiet">Thông tin đăng ký</h1>
                      <ul className='thongtindangkythuctap email_dangky'>
                            <li className='thong_tin_email'>
                                <span className='lable'>Email </span>
                                <span className='info'>{ThongTinCongTy.email}</span>
                            </li>
                          <li>
                            <input id='tencongty'  placeholder='Tên công ty' type="text"/>
                          </li>
                            <li>
                              <input id='diachi' placeholder='Địa chỉ' type="text" />
                            </li>
                            
                      </ul>
                      <ul className='thongtindangkythuctap'>
                          <li>
                            <input id='vitri'  placeholder='Vị trí thực tập' type="text"/>
                          </li>
                            <li>
                              <input id='ngaybatdau' placeholder='Ngày bắt đầu' type="text" />
                            </li>
                            <li>
                              <input id='ngayketthuc'  placeholder='Ngày kết thúc' type="text"/>
                            </li>
                      </ul>
                    </div>
                    <div className="thongtincongty company">
                      <h1 className="lable_chitiet">Thông tin cán bộ hướng dẫn</h1>
                      <ul className='thongtindangkythuctap email_dangky'>
                            <li className='thong_tin_email'>
                                <span className='lable'>Mã người phụ trách </span>
                                <span className='info' id='macanbo'>{Math.floor(Math.random() * 100000) + 1}</span>
                            </li>
                            <li>
                              <input id='tencanbo' placeholder='Phụ trách hướng dẫn' type="text" />
                            </li>
                            <li>
                              <input id='vitrihuongdan' placeholder='vị trí hướng dẫn' type="text"/>
                            </li>
                      </ul>
                      <ul className='thongtindangkythuctap '>
                        <li>
                          <input id='chucvu' placeholder='chức vụ' type="text"/>
                        </li>
                        <li>
                          <input id='sodienthoai' placeholder='Số điện thoại' type="text"/>
                        </li>
                        <li>
                          <input id='email' placeholder='email' type="text"/>
                        </li>
                      </ul>
                    </div>
                    <div className="nutbam">
                      <button className='button_huy'> <ImCancelCircle className='icon_button'/>Hủy</button>
                      <button className='button_luu' onClick={Dangky}> <AiOutlineCheck className='icon_button'/>Lưu</button>
                    </div>
              </div>
              
          </div>
        </div>
    )
}

export default DangKyThucTap;
