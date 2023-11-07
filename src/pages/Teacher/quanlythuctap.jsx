import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';

function QuanLyThucTap() {
  const [thuctaps, setthuctap] = useState([]);
  const [canbohds, setCanBoHD] = useState([]);
  const [congtys, setCongTy] = useState([]);
  const [Giaoviens, setGiaoviens] = useState([]);
  const [sinhViens, setSinhViens] = useState([]);  
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan"); 

  var ThongTinGiaoVien = {};
  var ThongTinCanBoHD = "";
  var ThongTinSinhVien = "";
  var ThongTinCongTy = "";
  var tblThucTap = [];

  useEffect(() => {
    axios.get('http://localhost:3001/company/danhsachcongty') // Điều chỉnh URL tương ứng với tuyến đường API
      .then((response) => setCongTy(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:3001/student/donthuctap') 
      .then((response) => setthuctap(response.data))
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
      axios.get('http://localhost:3001/teacher/danhsachgiaovien') 
        .then((response) => setGiaoviens(response.data))
        .catch((error) => {
          console.error('Lỗi react:', error);
      });
      }, []);    
      useEffect(() => {
        axios.get('http://localhost:3001/student/danhsachsinhvien') 
          .then((response) => setSinhViens(response.data))
          .catch((error) => {
            console.error('Lỗi react:', error);
          });
      }, [])
            
  const mathuctap = thuctaps.map(tttt => {
    sinhViens.map(sv => {
      if(sv.masinhvien == tttt.masinhvien) {
        ThongTinSinhVien = sv.hoten;
      };
    });
    Giaoviens.map(gv => {
      if (gv.magiaovien == tttt.magiaovien){
        ThongTinGiaoVien = {
          tengiaovien: gv.tengiaovien,
          email: gv.email
        } 
          
      };
    });
    canbohds.map(cbhd => {
      if (cbhd.macanbo == tttt.macanbohuongdan){
        ThongTinCanBoHD = cbhd.tencanbo;
      };
    });
    congtys.map(ct => {
      if (ct.macongty == tttt.macongty){
        ThongTinCongTy = ct.tencongty;
      };
    }); 
      tblThucTap.push({
        _id: tttt._id,
        mathuctap: tttt.mathuctap,
        tensinhvien: ThongTinSinhVien,
        tengiaovien: ThongTinGiaoVien.tengiaovien,
        tencanbo: ThongTinCanBoHD,
        tencongty: ThongTinCongTy,
        trangthaidon: tttt.trangthaidon
      })
    });
    console.log()
    return (
        <div className='container'>
           <div className='Navbar'>
            <ul id='navbar' className='company'>
              <Link href=""><li className='thongbao '><GrNotification className='icon'/></li></Link>
              <Link to={`/teacher/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc' ><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/teacher/quanlythuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap' className='click'><FiUsers className='icon'/>Thực tập</li></a></Link>
              <Link to={`/teacher/sinhvien/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin' ><PiStudentDuotone className='icon'/>Sinh viên</li></a></Link>
              <Link to={`/teacher/thongtin/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thongtin'  ><AiOutlineInfoCircle className='icon'/>Thông tin</li></a></Link>
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatcongty'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Quản lý thực tập</span></div>
              <div className="content">
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Đơn đăng ký thực tập</h1>
                      <div className="danhsachdondangky">
                      <input type="text" placeholder='Công ty' /> 
                      <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                      <table>
                      <tr className='tieude_table'>
                          <th id='stt'>STT</th>
                          <th id='trangthai'>Tên sinh viên</th>
                          <th id='trangthai'>Giáo viên hướng dẫn</th>
                          <th id='trangthai'>Công ty đăng ký</th>
                          <th id='trangthai'>Người phụ trách</th>
                          <th id='trangthai'>Trạng thái</th>
                        </tr>
                        {
                            tblThucTap.map((dtt, index) => {
                              if(ThongTinGiaoVien.tengiaovien == dtt.tengiaovien)
                               return <Link to={`/teacher/quanlythuctap/thongtindangky/duyetdonthuctap?mathuctap=${dtt.mathuctap}&id=${dtt._id}&taikhoan=${taikhoan}`}>
                               <tr className='info'>
                                  <th id='stt'>{index + 1}</th>
                                  <th id='trangthai'>{dtt.tensinhvien}</th>
                                  <th id='trangthai'>{dtt.tengiaovien}</th>
                                  <th id='trangthai'>{dtt.tencongty}</th>
                                  <th id='trangthai'>{dtt.tencanbo}</th>
                                  <th id='trangthai'>{dtt.trangthaidon}</th>
                                </tr>
                            </Link>
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

export default QuanLyThucTap;
