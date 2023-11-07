import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { LiaUserCogSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/student.css';
import '../../css/base.css';

function Tintuc() {
  const [TinTucs, setTinTucs] = useState([]);
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan");
  useEffect(() => {
    axios.get('http://localhost:3001/student/tintuc') // Điều chỉnh URL tương ứng với tuyến đường API
      .then((response) => setTinTucs(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);

    return (
      <div className='container'>
          <div className='Navbar navbarSinhVien'>
            <ul id='navbar'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to={`/student/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc' className='click'><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/student/dondangky/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap'  ><LiaUserCogSolid className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to={`/student/thuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap'  ><LiaUserCogSolid className='icon'/>Thực tập</li></a></Link>
              {/* <Link to="/student/thongtintaikhoan"><a href=""><li id='thongtin' ><AiOutlineInfoCircle className='icon'/>Thông tin</li></a></Link> */}
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatsinhvien'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Tin tức</span></div>
              <div className="content">
                  <h1 className="lable">Tin tức</h1>
                  <ul className="items">
                    <Link>
                    {TinTucs.map((tintuc) => {
                      if(tintuc.thongbaosinhvien != null) {
                          return<li>
                                <h2>THÔNG BÁO: {tintuc.thongbaosinhvien}</h2>
                                <span> ({tintuc.thoigian}) </span>
                              </li>
                      }
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
