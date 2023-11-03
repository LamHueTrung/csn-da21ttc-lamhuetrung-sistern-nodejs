import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { TbHomeEco } from 'react-icons/tb';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/teacher.css';
import '../../css/base.css';

function Tintuc() {
  const [TinTucs, setTinTucs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/company/tintuc') // Điều chỉnh URL tương ứng với tuyến đường API
      .then((response) => setTinTucs(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
    return (
      <div className='container'>
          <div className='Navbar'>
            <ul id='navbar'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to="/teacher/tintuc"><a ><li id='tintuc' className='click'><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to="/teacher/quanlythuctap"><a href=""><li id='thuctap' ><FiUsers className='icon'/>Thực tập</li></a></Link>
              <Link to="/teacher/congty"><a href=""><li id='thongtin'  ><TbHomeEco className='icon'/>Công ty</li></a></Link>
              <Link to="/teacher/sinhvien"><a href=""><li id='thongtin'><PiStudentDuotone className='icon'/>Sinh viên</li></a></Link>
              <Link to="/teacher/giaovien"><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Giáo viên</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuat'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Tin tức</span></div>
              <div className="content">
                  <h1 className="lable">Tin tức</h1>
                  <ul className="items">
                    <Link>
                    {TinTucs.map((tintuc) => {
                          return<li>
                                <h2>THÔNG BÁO: {tintuc.thongbaogiaovien}</h2>
                                <span> ({tintuc.thoigian}) </span>
                              </li>
                      })
                    }
                    </Link>
                  </ul>
              </div>
          </div>
        </div>
    )
}

export default Tintuc;
