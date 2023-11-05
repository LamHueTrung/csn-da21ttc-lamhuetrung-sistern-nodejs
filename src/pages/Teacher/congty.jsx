import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function Congty() {
  const [congtys, setCongTy] = useState([]);
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan");

  useEffect(() => {
    axios.get('http://localhost:3001/company/danhsachcongty') // Điều chỉnh URL tương ứng với tuyến đường API
      .then((response) => setCongTy(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
    return (
        <div className='container'>
           <div className='Navbar'>
            <ul id='navbar'>
              <Link href=""><li className='thongbao '><GrNotification className='icon'/></li></Link>
              <Link to={`/teacher/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/teacher/quanlythuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap' ><FiUsers className='icon'/>Thực tập</li></a></Link>
              <Link to={`/teacher/congty/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin'  className='click'><TbHomeEco className='icon'/>Công ty</li></a></Link>
              <Link to={`/teacher/sinhvien/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Sinh viên</li></a></Link>
              <Link to={`/teacher/giaovien/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Giáo viên</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuat'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Công ty thực tập</span></div>
              <div className="content">
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Công ty thực tập</h1>
                      <div className="danhsachdondangky">
                      <input type="text" placeholder='từ khóa' /> 
                      <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                      <table>
                        <thead>
                          <tr className='tieude_table'>
                            <th id='soluong'>Mã công ty</th>
                            <th id='tencongty'>Tên công ty</th>
                            <th id='tencongty'>Email</th>
                            <th id='diachicongty'>Địa chỉ</th>
                            <th id='vitri'>Vị trí tuyển thực tập</th>
                          </tr>
                        </thead>
                        <tbody>
                        {congtys.map(congty => {
                            return <tr className='info'>
                            <th id='soluong'>{congty.macongty}</th>
                            <th id='tencongty'>{congty.tencongty}</th>
                            <th id='tencongty'>{congty.email}</th>
                            <th id='diachicongty'>{congty.diachi}</th>
                            <th id='vitri'>{congty.vitri}</th>
                        </tr>
                        })
                        }
                          
                        </tbody>
                        
                      </table>
                </div>
            </div>

                    
              </div>
              
          </div>
        </div>
    )
}

export default Congty;
