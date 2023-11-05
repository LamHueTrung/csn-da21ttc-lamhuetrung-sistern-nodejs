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

function CanboHD() {
  const [canbohds, setCanBoHD] = useState([]);
  const [congtys, setCongTy] = useState([]);

  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan");
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
  
  useEffect(() => {
    axios.get('http://localhost:3001/company/canbohuongdan') // Điều chỉnh URL tương ứng với tuyến đường API
      .then((response) => setCanBoHD(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var DanhSachCanBo = [];
  canbohds.map(cbhd => {
    if (MaCongTy.macongty === cbhd.macongty)
    {
      DanhSachCanBo.push({
        tencanbo: cbhd.tencanbo,
        chucvu: cbhd.chucvu,
        vitri: cbhd.vitri,
        email: cbhd.email,
        sodienthoai: cbhd.sodienthoai
      })
    }
  })
    return (
        <div className='container'>
           <div className='Navbar'>
            <ul id='navbar' className='company'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to={`/company/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/company/dangkythuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap'><FiUsers className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to={`/company/danhsachdangky/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Danh sách đăng ký</li></a></Link>
              <Link to={`/company/canbohuongdan/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' className='click'><PiStudentDuotone className='icon'/>Cán bộ hướng dẫn</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatcongty'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Danh sách cán bộ hướng dẫn</span></div>
              <div className="content">
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Danh sách cán bộ hướng dẫn</h1>
                      <div className="danhsachdondangky">
                      <input type="text" placeholder='từ khóa' /> 
                      <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                      <table>
                          <tr className='tieude_table'>
                            <th id='stt'>STT</th>
                            <th id='tensinhvien'>Tên cán bộ</th>
                            <th id='masinhvien'>Chức vụ </th>
                            <th id='vitri'>Vị trí hướng dẫn</th>
                            <th id='emailsinhvien'>Email</th>
                            <th id='sdt'>Số điện thoại</th>
                          </tr>
                          {DanhSachCanBo.map((canbohd, index) => {
                              return <tr className='info'>
                              <th id='stt'>{index + 1}</th>
                              <th id='tensinhvien'>{canbohd.tencanbo}</th>
                              <th id='masinhvien'>{canbohd.chucvu}</th>
                              <th id='vitri'>{canbohd.vitri}</th>
                              <th id='emailsinhvien'>{canbohd.email}</th>
                              <th id='sdt'>{canbohd.sodienthoai}</th>
                          </tr>
                          })
                          }
                          
                      </table>
                </div>
            </div>
              </div>
              
          </div>
        </div>
    )
}

export default CanboHD;
