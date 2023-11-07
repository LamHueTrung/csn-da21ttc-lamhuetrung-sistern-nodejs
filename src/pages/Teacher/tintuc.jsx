import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import '../../css/teacher.css';
import '../../css/base.css';

function Tintuc() {
  const [TinTucs, setTinTucs] = useState([]);
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan");
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
            <ul id='navbar' className='company'>
              <Link href=""><li className='thongbao '><GrNotification className='icon'/></li></Link>
              <Link to={`/teacher/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc' className='click'><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/teacher/quanlythuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap' ><FiUsers className='icon'/>Thực tập</li></a></Link>
              <Link to={`/teacher/sinhvien/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Sinh viên</li></a></Link>
              <Link to={`/teacher/thongtin/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin'  ><AiOutlineInfoCircle className='icon'/>Thông tin</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatcongty'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Tin tức</span></div>
              <div className="content">
                  <h1 className="lable">Tin tức</h1>
                  <ul className="items">
                    <Link>
                    {TinTucs.map((tintuc) => {
                      if(tintuc.thongbaogiaovien != null)
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
