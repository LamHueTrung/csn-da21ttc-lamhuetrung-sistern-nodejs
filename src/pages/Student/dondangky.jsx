import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { LiaUserCogSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/student.css';
import '../../css/company.css';
import '../../css/base.css';

function Thuctap() {
  const [canbohds, setCanBoHD] = useState([]);
  const [congtys, setCongTy] = useState([]);
  const [Giaoviens, setGiaoviens] = useState([]);
  const [sinhViens, setSinhViens] = useState([]);
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const taikhoan = urlParams.get("taikhoan");
 
  useEffect(() => {
    axios.get('http://localhost:3001/student/danhsachsinhvien') 
      .then((response) => setSinhViens(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var ThongTinSinhVien = {};
    
  useEffect(() => {
    axios.get('http://localhost:3001/company/canbohuongdan') 
      .then((response) => setCanBoHD(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var ThongTinCanBoHD = {};
    canbohds.map(cbhd => {
        if(cbhd.tencanbo == document.querySelector(".tennguoiphutrach").textContent) {
          ThongTinCanBoHD = {
            tencanbo: cbhd.tencanbo,
            macanbo: cbhd.macanbo
          };
        }
    });
    
    var TTCBHD = [];
    canbohds.map(cbhd => {
      congtys.map(ct => {
          if(ct.macongty == cbhd.macongty) {
            TTCBHD.push({
              tencongty: ct.tencongty,
              vitri: cbhd.vitri,
              tencanbo: cbhd.tencanbo,
              sodienthoai: cbhd.sodienthoai,
              email: cbhd.email
            })
          }
      })});
  
  useEffect(() => {
    axios.get('http://localhost:3001/company/danhsachcongty') 
      .then((response) => setCongTy(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
    var ThongTinCongTy = {};
    congtys.map(ct => {
        if(ct.tencongty == document.querySelector(".info_tencongty").textContent) {
          ThongTinCongTy = {
            tencongty: ct.tencongty,
            macongty: ct.macongty,
            ngaybatdau: ct.ngaybatdau,
            ngayketthuc: ct.ngayketthuc
          };
        }
    });
    useEffect(() => {
    axios.get('http://localhost:3001/teacher/danhsachgiaovien') 
      .then((response) => setGiaoviens(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var ThongTinGiaoVien = {};
    Giaoviens.map(gv => {
        if(gv.tengiaovien == document.getElementById("thongtingiaovien").value) {
          ThongTinGiaoVien = {
            tengiaovien: gv.tengiaovien,
            magiaovien: gv.magiaovien
          };
        }
    });
  function dang_ky_thuc_tap() {
    ThongTinSinhVien = {
      masinhvien: document.getElementById('info_masinhvien').value,
      email: document.getElementById('info_email').textContent,
      hoten: document.getElementById('info_hoten').value,
      lop:document.getElementById('info_lop').value,
      ngaysinh: document.getElementById('info_ngaysinh').value,
      sodienthoai: document.getElementById('info_sodienthoai').value
  };
  axios.post('http://localhost:3001/student/themthongtin', ThongTinSinhVien)
      .then(response => {
        console.log(ThongTinSinhVien)
      })
      .catch(error => {
          console.error('Lỗi khi thêm dữ liệu:', error);
      });
    const dataToAdd = {
      trangthaidon: "Chưa duyệt",
      mathuctap: ThongTinSinhVien.masinhvien,
      masinhvien: ThongTinSinhVien.masinhvien,
      loai: document.getElementById("hocphanthuctap").value,
      magiaovien: ThongTinGiaoVien.magiaovien,
      macongty: ThongTinCongTy.macongty,
      macanbohuongdan: ThongTinCanBoHD.macanbo,
      ngaybatdau: document.getElementById("ngaybatdau").value,
      ngayketthuc: document.getElementById("ngayketthuc").value,
      sobuoi: document.getElementById("sobuoi").value,
      sotuan: document.getElementById("sotuan").value, 
      noidungthuctap: document.getElementById("noidungthuctap").value
    }
    console.log(dataToAdd)
    console.log(dataToAdd)
      axios.post('http://localhost:3001/student/dangkythuctap', dataToAdd)
      .then(response => {
        alert('Đăng ký thực tập thành công, chờ xét duyệt');
        console.log(dataToAdd)
      })
      .catch(error => {
        console.log(dataToAdd)
        console.error('Lỗi khi thêm dữ liệu:', error);
      });
  }

  function chonCongty() {
    const inputChecked = document.getElementById('choncongty');
    const TTinput  = inputChecked.value.split(',');
    const tencongty = document.querySelector('.info_tencongty');
    const diachi = document.querySelector('.info_diachi');
    const vitri = document.querySelector('.info_vitri');
    const email = document.querySelector('.info_email');
    const ngaybatdau = document.getElementById("ngaybatdau");
    const ngayketthuc = document.getElementById('ngayketthuc');
    const tennguoiphutrach = document.querySelector('.tennguoiphutrach');
    const email_nguoiphutrach = document.querySelector('.email_nguoiphutrach');
    

    if(inputChecked.checked)
    {
      const congTyDuocChon = {
        tencongty: TTinput[0],
        diachi: TTinput[1],
        vitri: TTinput[2],
        email: TTinput[3],
      }
        var ThoiGianThucTap = {};
        congtys.map(ct => {
          if(ct.tencongty ==congTyDuocChon.tencongty) {
            ThoiGianThucTap = {
              tencongty: ct.tencongty,
              macongty: ct.macongty,
              ngaybatdau: ct.ngaybatdau,
              ngayketthuc: ct.ngayketthuc
            };
          }
      });
      var ThongTinCanBo = {};
      canbohds.map(cb => {
        if(cb.macongty == ThoiGianThucTap.macongty)
        {
          ThongTinCanBo = {
            tenCB: cb.tencanbo,
            emailCB: cb.email
          }
        }
      })
      tencongty.textContent = congTyDuocChon.tencongty;
      diachi.textContent = congTyDuocChon.diachi;
      vitri.textContent = congTyDuocChon.vitri;
      email.textContent = congTyDuocChon.email;
      ngaybatdau.value = ThoiGianThucTap.ngaybatdau;
      ngayketthuc.value = ThoiGianThucTap.ngayketthuc;
      tennguoiphutrach.textContent = ThongTinCanBo.tenCB;
      email_nguoiphutrach.textContent = ThongTinCanBo.emailCB;
    }
  }


    return (
        <div className='container'>
          <div className='Navbar navbarSinhVien'>
            <ul id='navbar'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to={`/student/tintuc/taikhoan?taikhoan=${taikhoan}`}><a ><li id='tintuc'><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to={`/student/dondangky/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap'  className='click'><LiaUserCogSolid className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to={`/student/thuctap/taikhoan?taikhoan=${taikhoan}`}><a href=""><li id='thuctap'  ><LiaUserCogSolid className='icon'/>Thực tập</li></a></Link>
              {/* <Link to="/student/thongtintaikhoan"><a href=""><li id='thongtin' ><AiOutlineInfoCircle className='icon'/>Thông tin</li></a></Link> */}
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatsinhvien'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Đăng ký thực tập</span></div>
              <div id='dondangky' className="content">
                    <div className="thongtincanhan ">
                      <h1 className="lable_chitiet">Thông tin sinh viên</h1>
                      <ul className='thongtintaikhoan email_dangky'>
                          <li className='thong_tin_email'>
                              <span className='lable'>Email sinh viên</span>
                              <span id="info_email" className='info'>{taikhoan}</span>
                          </li>
                          <li>
                              <input id='info_masinhvien' type="text" placeholder='Mã sinh viên' /> 
                          </li>
                          <li>
                              <input type="text" id='info_lop' placeholder='Lớp'/>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan email_dangky'>
                          <li>
                              <input type="text" id='info_hoten' placeholder='Họ tên'/>
                          </li>
                          <li>
                              <input  id='info_ngaysinh' type="text" placeholder='Ngày sinh' /> 
                          </li>
                          <li>
                              <input  id='info_sodienthoai' type="text" placeholder='Số điện thoại' /> 
                          </li>
                      </ul>  
                    </div>
                    <div className="thongtincanhan">
                    <h1 className="lable_chitiet">Lựa chọn công ty</h1>
                      <ul className='thongtintaikhoan danhsachcongty'>
                          <table>
                            <tr className='tieude_table'>
                              <th id='stt'>STT</th>
                              <th id='checked'></th>
                              <th id='tencongty'>Tên công ty</th>
                              <th id='diachi'>Địa chỉ</th>
                              <th id='sdt'>Email</th>
                              <th id='email'>Vị trí thực tập</th>
                            </tr>
                          <tbody>
                            {congtys.map((congty, index) => {
                              return <tr className='info'>
                              <th id='stt'>{index + 1}</th>
                              <th id='checked'><input id='choncongty' value ={[congty.tencongty,congty.diachi,congty.email,congty.vitri]} type="radio" onChange={chonCongty}/></th>
                              <th id='tencongty'>{congty.tencongty}</th>
                              <th id='diachi'>{congty.diachi}</th>
                              <th id='sdt'>{congty.email}</th>
                              <th id='email'>{congty.vitri}</th>
                            </tr>
                          })
                          }
                          </tbody>
                        </table>
                      </ul>
                    <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Tên công ty</span>
                              <span className='info info_tencongty'></span>
                          </li>
                          <li>
                              <span className='lable'>Email công ty</span>
                              <span className='info info_vitri'></span>
                          </li>
                          <li>
                              <span className='lable'>Vị trí thực tập</span>
                              <span className='info info_email'></span>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Địa chỉ</span>
                              <span className='info info_diachi'></span>
                          </li>                      
                          <li>
                              <span className='lable'>Người phụ trách</span>
                              <span className='info tennguoiphutrach'></span>
                          </li>
                          <li>
                              <span className='lable'>Email người phụ trách</span>
                              <span className='info email_nguoiphutrach'></span>
                          </li>
                      </ul>
                    </div>
                    <div className="thongtincongty">
                      <h1 className="lable_chitiet">Thông tin đăng ký</h1>
                      <ul className='thongtindondangky'>
                          <li>
                            <select name="" id="hocphanthuctap">
                                <option value="">--Học phần thực tập--</option>
                                <option value="Đồ án cơ sở ngành">Đồ án cơ sở ngành</option>
                                <option value="Đồ án chuyên ngành">Đồ án chuyên ngành</option>
                                <option value="Đồ án tốt nghiệp">Đồ án tốt nghiệp</option>
                            </select>
                          </li>
                          <li>
                              <input id='ngaybatdau' placeholder='Ngày bắt đầu' type="text"/>
                          </li>
                          <li>
                              <input id='ngayketthuc' placeholder='Ngày kết thúc' type="text" />
                          </li>
                      </ul>
                      <ul className='thongtindondangky'>
                          <li>
                            <select name="" id="thongtingiaovien">
                              <option value="">--Chọn giáo viên--</option>
                              {Giaoviens.map((giaovien,) => {
                                return <option value={giaovien.tengiaovien}>{giaovien.tengiaovien}</option>
                            })
                            }
                            </select>
                          </li>
                          <li>
                              <input id='sobuoi' type="number" placeholder='Số buổi/Tuần' /> 
                          </li>
                          <li>
                            <input id='sotuan' type="number" placeholder='Số tuần' /> 
                          </li>
                      </ul>
                      <ul className='thongtindondangky fullsize' ><li>
                          <input id='noidungthuctap' className='fullsize_input description' type="text" placeholder='Nội dung thực tập'/>
                        </li></ul>
                    </div>
                    <div className="nutbam">
                      <button className='button_huy' > <ImCancelCircle className='icon_button'/>Hủy</button>
                      <button className='button_luu'onClick={dang_ky_thuc_tap}> <AiOutlineCheck className='icon_button'/>Lưu</button>
                    </div>
              </div>
              
          </div>
        </div>
    )
}

export default Thuctap;
