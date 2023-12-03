import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { PiStudentDuotone } from 'react-icons/pi';
import { FiUsers } from 'react-icons/fi';
import { format } from 'date-fns';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import port from '../../port';
import '../../css/responsive.css';
import '../../css/teacher.css';
import '../../css/base.css';
function ThongTinDangKyGV() {
    const [thuctaps, setthuctap] = useState([]);
    const [canbohds, setCanBoHD] = useState([]);
    const [congtys, setCongTy] = useState([]);
    const [Giaoviens, setGiaoviens] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const madon = urlParams.get('mathuctap');
    const taikhoan = urlParams.get('taikhoan');
    const _IdDonThucTap = urlParams.get('id');
    var ThongTinGiaoVien = {};
    var ThongTinCanBoHD = {};
    var ThongTinSinhVien = {};
    var ThongTinCongTy = {};
    var tblThucTap = {};

    useEffect(() => {
        axios
            .get(`${port}/company/danhsachcongty`) // Điều chỉnh URL tương ứng với tuyến đường API
            .then((response) => setCongTy(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(`${port}/student/donthuctap`)
            .then((response) => setthuctap(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(`${port}/company/canbohuongdan`)
            .then((response) => setCanBoHD(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(`${port}/teacher/danhsachgiaovien`)
            .then((response) => setGiaoviens(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(`${port}/student/danhsachsinhvien`)
            .then((response) => setSinhViens(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);

    const mathuctap = thuctaps.map((tttt) => {
        if (tttt.mathuctap == madon) {
            sinhViens.map((sv) => {
                if (sv.masinhvien == tttt.masinhvien) {
                    ThongTinSinhVien = {
                        hoten: sv.hoten,
                        email: sv.email,
                        sdt: sv.sodienthoai,
                        lop: sv.lop,
                        masinhvien: sv.masinhvien,
                        ngaysinh: sv.ngaysinh,
                    };
                }
            });
            Giaoviens.map((gv) => {
                if (gv.magiaovien == tttt.magiaovien) {
                    ThongTinGiaoVien = {
                        tengiaovien: gv.tengiaovien,
                        email: gv.email,
                        chucvu: gv.chucvu,
                    };
                }
            });
            canbohds.map((cbhd) => {
                if (cbhd.macanbo == tttt.macanbohuongdan) {
                    ThongTinCanBoHD = {
                        tencanbo: cbhd.tencanbo,
                        email: cbhd.email,
                        vitri: cbhd.vitri,
                    };
                }
            });
            congtys.map((ct) => {
                if (ct.macongty == tttt.macongty) {
                    ThongTinCongTy = {
                        tencongty: ct.tencongty,
                        email: ct.email,
                        diachi: ct.diachi,
                    };
                }
            });
            tblThucTap = {
                trangthaidon: tttt.trangthaidon,
                tensinhvien: ThongTinSinhVien.hoten,
                emailsinhvien: ThongTinSinhVien.email,
                sodienthoaisinhvien: ThongTinSinhVien.sdt,
                lopsinhvien: ThongTinSinhVien.lop,
                masinhvien: ThongTinSinhVien.masinhvien,
                ngaysinhsinhvien: ThongTinSinhVien.ngaysinh,
                tengiaovien: ThongTinGiaoVien.tengiaovien,
                emailgiaovien: ThongTinGiaoVien.email,
                chucvugiaovien: ThongTinGiaoVien.chucvu,
                tencanbo: ThongTinCanBoHD.tencanbo,
                emailcanbo: ThongTinCanBoHD.email,
                tencongty: ThongTinCongTy.tencongty,
                emailcongty: ThongTinCongTy.email,
                diachicongty: ThongTinCongTy.diachi,
                vitrihuongdan: ThongTinCanBoHD.vitri,
                hocphanthuctap: tttt.loai,
                ngaybatdau: tttt.ngaybatdau,
                ngayketthuc: tttt.ngayketthuc,
                sobuoi: tttt.sobuoi,
                sotuan: tttt.sotuan,
                noidung: tttt.noidungthuctap,
            };
        }
    });
    function DuyetDon() {
        const updatedData = {
            trangthaidon: 'Giáo viên đã duyệt',
        };
        console.log(updatedData);
        axios
            .put(
                `${port}/teacher/duyetdonthuctap/${_IdDonThucTap}`,
                updatedData,
            )
            .then((response) => {
                console.log('Dữ liệu sau khi cập nhật:', response.data);
                alert('Duyệt đơn thành công');
            })
            .catch((error) => {
                alert('Duyệt đơn thất bại');
                console.error('Lỗi cập nhật dữ liệu:', error);
            });
        var DateNow = new Date();
        var ThongBao = {
            thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
            thongbaosinhvien: `Đơn thực tập của bạn ${tblThucTap.tensinhvien} vừa được giáo viên duyệt`,
        };
        axios
            .post(`${port}/teacher/themthongbao`, ThongBao)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Lỗi khi thêm dữ liệu:', error);
            });
    }
    function TuChoiDon() {
        const updatedData = {
            trangthaidon: 'Từ chối đơn',
        };
        console.log(updatedData);
        axios
            .put(
                `${port}/teacher/duyetdonthuctap/${_IdDonThucTap}`,
                updatedData,
            )
            .then((response) => {
                console.log('Dữ liệu sau khi cập nhật:', response.data);
                alert('Đã từ chối đơn thực tập');
            })
            .catch((error) => {
                alert('Duyệt đơn thất bại');
                console.error('Lỗi cập nhật dữ liệu:', error);
            });
        var DateNow = new Date();
        var ThongBao = {
            thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
            thongbaosinhvien: `Đơn thực tập của bạn ${tblThucTap.tensinhvien} đã bị giáo viên từ chối`,
        };
        axios
            .post(`${port}/teacher/themthongbao`, ThongBao)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Lỗi khi thêm dữ liệu:', error);
            });
    }
    function openMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.add('openMenu');
    }
    function closeMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.remove('openMenu');
    }
    return (
        <div className="container">
            <a onClick={openMenu} className="mobile-navbar">
                <CiSettings className="icon" />
            </a>
            <div className="Navbar">
                <ul id="navbar" className="company">
                    <a onClick={closeMenu}>
                        <li className="thongbao ">
                            <AiOutlineHome className="icon" />
                        </li>
                    </a>
                    <Link to={`/teacher/tintuc/taikhoan?taikhoan=${taikhoan}`}>
                        <a>
                            <li id="tintuc">
                                <HiOutlineNewspaper className="icon" />
                                Tin tức
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/teacher/quanlythuctap/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thuctap" className="click">
                                <FiUsers className="icon" />
                                Thực tập
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/teacher/sinhvien/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thongtin">
                                <PiStudentDuotone className="icon" />
                                Sinh viên
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/teacher/thongtin/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thongtin">
                                <AiOutlineInfoCircle className="icon" />
                                Thông tin
                            </li>
                        </a>
                    </Link>
                </ul>
                <Link to="/">
                    <a id="dangxuat" href="" className="dangxuatcongty">
                        <FiLogOut className="icon" />
                        Đăng xuất
                    </a>
                </Link>
            </div>
            <div className="data">
                <div className="header">
                    <AiOutlineHome className="icon" />
                    <span id="route">/Đơn đăng ký thực tập</span>
                </div>
                <div className="content">
                    <div className="thongtincanhan">
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Trạng thái đơn</span>
                                <span className="info">
                                    {tblThucTap.trangthaidon}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">
                            Thông tin sinh viên thực tập
                        </h1>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Họ tên</span>
                                <span className="info">
                                    {tblThucTap.tensinhvien}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Mã sinh viên</span>
                                <span className="info">
                                    {tblThucTap.masinhvien}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Ngày sinh</span>
                                <span className="info">
                                    {tblThucTap.ngaysinhsinhvien}
                                </span>
                            </li>
                        </ul>

                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Số điện thoại</span>
                                <span className="info">
                                    {tblThucTap.sodienthoaisinhvien}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Email</span>
                                <span className="info">
                                    {tblThucTap.emailsinhvien}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Lớp</span>
                                <span className="info">
                                    {tblThucTap.lopsinhvien}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">
                            Thông tin giáo viên hướng dẫn
                        </h1>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Họ tên</span>
                                <span className="info">
                                    {tblThucTap.tengiaovien}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Chức vụ</span>
                                <span className="info">
                                    {tblThucTap.chucvugiaovien}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Email</span>
                                <span className="info">
                                    {tblThucTap.emailgiaovien}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">
                            Thông tin công ty đăng ký thực tập
                        </h1>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Tên công ty</span>
                                <span className="info">
                                    {tblThucTap.tencongty}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Email </span>
                                <span className="info">
                                    {tblThucTap.emailcongty}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Đia chỉ</span>
                                <span className="info">
                                    {tblThucTap.diachicongty}
                                </span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Người phụ trách</span>
                                <span className="info">
                                    {tblThucTap.tencanbo}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Vị trí hướng dẫn</span>
                                <span className="info">
                                    {tblThucTap.vitrihuongdan}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Email</span>
                                <span className="info">
                                    {tblThucTap.emailcanbo}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">
                            Thông tin đăng ký thực tập
                        </h1>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Học phần thực tập</span>
                                <span className="info">
                                    {tblThucTap.hocphanthuctap}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Ngày bắt đầu</span>
                                <span className="info">
                                    {tblThucTap.ngaybatdau}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Ngày kết thúc</span>
                                <span className="info">
                                    {tblThucTap.ngayketthuc}
                                </span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Số buổi/tuần</span>
                                <span className="info">
                                    {tblThucTap.sobuoi}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Số tuần</span>
                                <span className="info">
                                    {tblThucTap.sotuan}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Nội dung thực tập</span>
                                <span className="info">
                                    {tblThucTap.noidung}
                                </span>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="dinhkem">
                      <h1 className="lable_chitiet">3.Đính kèm</h1>
                      <ul className='thongtintaikhoan' ><li>
                          <input className='fullsize_input' type="file" placeholder='Nội dung thực tập' />
                      </li></ul>
                    </div> */}
                    <div className="nutbam">
                        <Link
                            to={`/teacher/quanlythuctap/taikhoan?taikhoan=${taikhoan}`}
                        >
                            <button className="button_luu" onClick={DuyetDon}>
                                {' '}
                                <AiOutlineCheck className="icon_button" />
                                Đồng ý
                            </button>
                            <button className="button_huy" onClick={TuChoiDon}>
                                {' '}
                                <ImCancelCircle className="icon_button" />
                                Từ chối
                            </button>

                            <button className="button_huy">
                                {' '}
                                <ImCancelCircle className="icon_button" />
                                Đóng
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThongTinDangKyGV;
