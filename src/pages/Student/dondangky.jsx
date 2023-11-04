import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { AiOutlineCheck } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { LiaUserCogSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import '../../css/student.css';
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
    sinhViens.map(sv => {
      if (sv.email == taikhoan){
        ThongTinSinhVien = {
          hoten: sv.hoten,
          email: sv.email,
          masinhvien: sv.masinhvien,
          lop: sv.lop,
          ngaysinh: sv.ngaysinh,
          sodienthoai: sv.sodienthoai
      };
      };
    });
  useEffect(() => {
    axios.get('http://localhost:3001/company/canbohuongdan') 
      .then((response) => setCanBoHD(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var ThongTinCanBoHD = {};
    canbohds.map(cbhd => {
        if(cbhd.tencanbo == document.querySelector(".tennguoiphutrach").value) {
          ThongTinCanBoHD = {
            tencanbo: cbhd.tencanbo,
            macanbo: cbhd.macanbo
          };
        }
    });
  useEffect(() => {
    axios.get('http://localhost:3001/company/danhsachcongty') 
      .then((response) => setCongTy(response.data))
      .catch((error) => {
        console.error('Lỗi react:', error);
      });
  }, []);
  var ThongTinCongTy = {};
    congtys.map(ct => {
        if(ct.tencongty == document.querySelector(".info_tencongty").value) {
          ThongTinCongTy = {
            tencongty: ct.tencongty,
            macongty: ct.macongty
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
        axios.post('http://localhost:3001/student/dangkythuctap', dataToAdd)
        .then(response => {
          alert('Đăng ký thực tập thành công, chờ xét duyệt');
          console.log(dataToAdd)
        })
        .catch(error => {
          alert("Đăng ký thất bại !");
          console.error('Lỗi khi thêm dữ liệu:', error);
        });
    }
  function open() {
    const danhsachdangky = document.querySelector('.danhsachcongty');
    danhsachdangky.classList.remove('close');
  }
  function close() {
    const danhsachdangky = document.querySelector('.danhsachcongty');
    danhsachdangky.classList.add('close');
  }
  function open_canbo() {
    const danhsachcanbo = document.querySelector('.danhsachcanbo');
    danhsachcanbo.classList.remove('close');
  }
  function close_canbo() {
    const danhsachcanbo = document.querySelector('.danhsachcanbo');
    danhsachcanbo.classList.add('close');
  }
  function chonCongty() {
    const inputChecked = document.getElementById('choncongty');
    const TTinput  = inputChecked.value.split(',');
    const tencongty = document.querySelector('.info_tencongty');
    const diachi = document.querySelector('.info_diachi');
    const vitri = document.querySelector('.info_vitri');
    const email = document.querySelector('.info_email');
    const danhsachdangky = document.querySelector('.danhsachcongty');

    if(inputChecked.checked)
    {
      const congTyDuocChon = {
        tencongty: TTinput[0],
        diachi: TTinput[1],
        vitri: TTinput[2],
        email: TTinput[3],
      }
      tencongty.value = congTyDuocChon.tencongty;
      diachi.value = congTyDuocChon.diachi;
      vitri.value = congTyDuocChon.vitri;
      email.value = congTyDuocChon.email;
      danhsachdangky.classList.add('close');
    }
  }
  function chonCanBo() {
    const inputChecked = document.getElementById('choncanbo');
    const TTinput  = inputChecked.value.split(',');
    const nguoiphutrach = document.querySelector('.tennguoiphutrach');
    const email_nguoiphutrach = document.querySelector('.email_nguoiphutrach');
    const danhsachdangky = document.querySelector('.danhsachcanbo');

    if(inputChecked.checked)
    {
      const NguoiPhuTrach = {
        nguoiphutrach: TTinput[0],
        email_nguoiphutrach: TTinput[1],
      }
      nguoiphutrach.value = NguoiPhuTrach.nguoiphutrach;
      email_nguoiphutrach.value = NguoiPhuTrach.email_nguoiphutrach;
      danhsachdangky.classList.add('close');
    }
  }

    return (
        <div className='container'>
          <div className='Navbar navbarSinhVien'>
            <ul id='navbar'>
              <a href=""><li className='thongbao '><GrNotification className='icon'/></li></a>
              <Link to="/student/tintuc"><a ><li id='tintuc'><HiOutlineNewspaper className='icon'/>Tin tức</li></a></Link>
              <Link to="/student/dondangky"><a href=""><li id='thuctap'  className='click'><LiaUserCogSolid className='icon'/>Đăng ký thực tập</li></a></Link>
              <Link to={`/student/thuctap/taikhoan?taikhoan=${ThongTinSinhVien.email}`}><a href=""><li id='thuctap'  ><LiaUserCogSolid className='icon'/>Thực tập</li></a></Link>
              {/* <Link to="/student/thongtintaikhoan"><a href=""><li id='thongtin' ><AiOutlineInfoCircle className='icon'/>Thông tin</li></a></Link> */}
            </ul>
            <Link to="/"><a id='dangxuat' href="" className='dangxuatsinhvien'><FiLogOut className='icon'/>Đăng xuất</a></Link>
          </div>
          <div className='data'>
              <div className="header"><AiOutlineHome className='icon' /><span id='route'>/Đăng ký thực tập</span></div>
              <div id='dondangky' className="content">
                    <div className="danhsachcongty close">
                        <input type="text" placeholder='Công ty' /> 
                        <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                        <table>
                          <thead>
                            <tr className='tieude_table'>
                              <th id='stt'>STT</th>
                              <th id='checked'></th>
                              <th id='tencongty'>Tên công ty</th>
                              <th id='diachi'>Địa chỉ</th>
                              <th id='sdt'>Email</th>
                              <th id='email'>Vị trí thực tập</th>
                            </tr>
                          </thead>
                          <tbody>
                            {congtys.map((congty, index) => {
                              return <tr className='info'>
                              <th id='stt'>{index + 1}</th>
                              <th id='checked'><input id='choncongty' value ={[congty.tencongty,congty.diachi,congty.email,congty.vitri]} type="radio"/></th>
                              <th id='tencongty'>{congty.tencongty}</th>
                              <th id='diachi'>{congty.diachi}</th>
                              <th id='sdt'>{congty.email}</th>
                              <th id='email'>{congty.vitri}</th>
                            </tr>
                          })
                          }
                          </tbody>
                        </table>
                        <div className="nutbam">
                        <button className='button_huy' onClick={close}> <ImCancelCircle className='icon_button'/>Đóng</button>
                        <button className='button_luu' onClick={chonCongty} > <AiOutlineCheck className='icon_button'/>Xác nhận</button>
                      </div>
                      </div>
                      <div className="danhsachcanbo close">
                        <input type="text" placeholder='Công ty' /> 
                        <button className='button_search'> <AiOutlineSearch className='icon_button'/>Tìm kiếm</button>
                        <table>
                          <tr className='tieude_table'>
                            <th id='checked'></th>
                            <th id='tencongty'>Tên cán bộ</th>
                            <th id='vitri'>vị trí hướng dẫn</th>
                            <th id='chucvu'>Chức vụ</th>
                            <th id='sdt'>số điện thoại</th>
                            <th id='email'>Email</th>
                          </tr>
                          {canbohds.map((canbohd) => {
                              return <tr className='info'>
                              <th id='checked'><input id='choncanbo' type="radio" value ={[canbohd.tencanbo,canbohd.email]}/></th>
                              <th id='tencongty'>{canbohd.tencanbo}</th>
                              <th id='vitri'>{canbohd.vitri}</th>
                              <th id='chucvu'>{canbohd.chucvu}</th>
                              <th id='sdt'>{canbohd.sodienthoai}</th>
                              <th id='email'>{canbohd.email}</th>
                            </tr>
                          })
                          }
                        </table>
                        <div className="nutbam">
                        <button className='button_huy' onClick={close_canbo}> <ImCancelCircle className='icon_button'/>Đóng</button>
                        <button className='button_luu'onClick={chonCanBo}> <AiOutlineCheck className='icon_button'/>Xác nhận</button>
                      </div>
                      </div>
                    <div className="thongtincanhan">
                      <h1 className="lable_chitiet">Thông tin sinh viên</h1>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Họ tên</span>
                              <span className='info'>{ThongTinSinhVien.hoten}</span>
                          </li>
                          <li>
                              <span className='lable'>Mã sinh viên</span>
                              <span className='info'>{ThongTinSinhVien.masinhvien}</span>
                          </li>
                          <li>
                              <span className='lable'>Ngày sinh</span>
                              <span className='info'>{ThongTinSinhVien.ngaysinh}</span>
                          </li>
                      </ul>
                      <ul className='thongtintaikhoan'>
                          <li>
                              <span className='lable'>Số điện thoại</span>
                              <span className='info'>{ThongTinSinhVien.sodienthoai}</span>
                          </li>
                          <li>
                              <span className='lable'>Email</span>
                              <span className='info'>{ThongTinSinhVien.email}</span>
                          </li>
                          <li>
                              <span className='lable'>Lớp</span>
                              <span className='info'>{ThongTinSinhVien.lop}</span>
                          </li>
                      </ul>
                    </div>
                    <div className="luachoncongty">
                      <h1 className="lable_chitiet">Lựa chọn công ty</h1>
                      <ul className='thongtindondangky'>
                          <li>
                              <input onClick={open} id='tencongty' className='info_tencongty' type="text" placeholder='Tên công ty' /> 
                          </li>
                          <li>
                              <input type="mail"  className='info_email' placeholder='Email công ty'/>
                          </li>
                          <li>
                              <input type="text" className='info_vitri' placeholder='Vị trí thực tập'/>
                          </li>
                      </ul>
                      <ul className='thongtindondangky fullsize' ><li>
                          <input className='fullsize_input info_diachi' id='diachi' type="text" placeholder='Địa chỉ công ty'/>
                        </li></ul>
                      <ul className='thongtindondangky nguoiphutrach'>
                          <li>
                              <input onClick={open_canbo} type="text" className='tennguoiphutrach' placeholder='Người phụ trách (tại công ty)' /> 
                          </li>
                          <li>
                            <input type="text" className='email_nguoiphutrach' placeholder='Điện thoại/Email người phụ trách' /> 
                          </li>
                      </ul>
                      {/* <button className='button_chinhsua'> <AiOutlineCheck className='icon_button'/>Đăng ký thêm mới công ty</button> */}
                    </div>
                    <div className="thongtincongty">
                      <h1 className="lable_chitiet">2. Thông tin đăng ký</h1>
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
