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

function Sinhvien() {
  const [sinhViens, setSinhViens] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/student/danhsachsinhvien') // Điều chỉnh URL tương ứng với tuyến đường API
      .then((response) => setSinhViens(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);

    return (
        <div className='container'>
           <div className='Navbar'>
            <ul id='navbar'>
              <Link href=""><li className='thongbao '><GrNotification className='icon'/></li></Link>
              <Link to="/teacher/tintuc"><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to="/teacher/quanlythuctap"><a href=""><li id='thuctap' ><FiUsers className='icon'/>Thực tập</li></a></Link>
              <Link to="/teacher/congty"><a href=""><li id='thongtin'  ><TbHomeEco className='icon'/>Công ty</li></a></Link>
              <Link to="/teacher/sinhvien"><a href=""><li id='thongtin' className='click' ><PiStudentDuotone className='icon'/>Sinh viên</li></a></Link>
              <Link to="/teacher/giaovien"><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Giáo viên</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuat'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Danh sách sinh viên</span></div>
              <div className="content">
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Thông tin sinh viên</h1>
                      <div className="danhsachdondangky">
                      <input type="text" placeholder='từ khóa' /> 
                      <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                      <table>
                        <thead>
                          <tr className='tieude_table'>
                            <th id='stt'>STT</th>
                            <th id='masinhvien'>Mã sinh viên</th>
                            <th id='tensinhvien'>Tên sinh viên</th>
                            <th id='emailsinhvien'>Email</th>
                            <th id='ngaytaodon'>Số điện thoại</th>
                            <th id='trangthai'>Lớp</th>
                          </tr>
                        </thead>
                        <tbody>
                        {sinhViens.map((sinhVien, index) => {
                            return <tr className='info'>      
                            <th id='stt'>{index + 1}</th>
                            <th id='masinhvien'>{sinhVien.masinhvien}</th>
                            <th id='tensinhvien'>{sinhVien.hoten}</th>
                            <th id='emailsinhvien'>{sinhVien.email}</th>
                            <th id='ngaytaodon'>{sinhVien.sodienthoai}</th>
                            <th id='trangthai'>{sinhVien.lop}</th>
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

export default Sinhvien;
