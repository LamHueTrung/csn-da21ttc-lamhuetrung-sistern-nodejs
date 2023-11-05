import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function DanhSachDangKy() {
  const [thuctaps, setthuctap] = useState([]);
  const [congtys, setCongTy] = useState([]);
  const [sinhViens, setSinhViens] = useState([]);
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan");
  
  // lấy macongty từ tài khoản trên :slug 
  useEffect(() => {
    axios.get('http://localhost:3001/company/danhsachcongty') 
      .then((response) => setCongTy(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var MaCongTy = {};
  congtys.map(ct => {
    if (ct.email == taikhoan){
      MaCongTy = {
        macongty: ct.macongty,
    };
    };
  });
  //lấy thông tin đơn thực tập từ macongty trong taikhoan
  // var ThongTinThucTap = {};
  useEffect(() => {
    axios.get('http://localhost:3001/company/donthuctap') 
      .then((response) => setthuctap(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var tblThucTap = [];
  const mathuctap = thuctaps.map(tttt => {
    if(tttt.macongty == MaCongTy.macongty)
    {
      tblThucTap.push({
        masinhvien: tttt.masinhvien,
        loai: tttt.loai
      })
    }
  });

  //lấy danh sách sinh viên đăng ký thực tập tại công ty đang đăng nhập
  var MSSV = [];
  tblThucTap.map(mssv => {
    MSSV.push({
      mssv: mssv.masinhvien,
      loai: mssv.loai
    }) 
  })
  useEffect(() => {
    axios.get('http://localhost:3001/student/danhsachsinhvien') 
      .then((response) => setSinhViens(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
    });
    }, []);
  var DanhSachSVCuaCongTy = [];
  MSSV.filter((sv) => {
    sinhViens.map((ttsv) => {
      if(sv.mssv == ttsv.masinhvien)
      {
        DanhSachSVCuaCongTy.push({
          masinhvien: ttsv.masinhvien,
          hoten: ttsv.hoten,
          email: ttsv.email,
          sodienthoai: ttsv.sodienthoai,
          loai: sv.loai
        })
      }
    })
  })


    return (
        <div className='container'>
           <div className='Navbar'>
            <ul id='navbar' className='company'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to={`/company/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/company/dangkythuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap'><FiUsers className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to={`/company/danhsachdangky/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' className='click'><PiStudentDuotone className='icon'/>Danh sách đăng ký</li></a></Link>
              <Link to={`/company/canbohuongdan/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin'><PiStudentDuotone className='icon'/>Cán bộ hướng dẫn</li></a></Link>
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
                          <th id='vitri'>Thể loại</th>
                        </tr>
                        {
                            DanhSachSVCuaCongTy.map((ttsv,index) => {
                                return(
                                  <tr className='info'>
                                    <th id='stt'>{index+1}</th>
                                    <th id='masinhvien'>{ttsv.masinhvien}</th>
                                    <th id='tensinhvien'>{ttsv.hoten}</th>
                                    <th id='emailsinhvien'>{ttsv.email}</th>
                                    <th id='sdt'>{ttsv.sodienthoai}</th>
                                    <th id='vitri'>{ttsv.loai}</th>
                                  </tr>
                                )
                            })}
                      </table>
                </div>
            </div>

                    
              </div>
              
          </div>
        </div>
    )
}

export default DanhSachDangKy;
