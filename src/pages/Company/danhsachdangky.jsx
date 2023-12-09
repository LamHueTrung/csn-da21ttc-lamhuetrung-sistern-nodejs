import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import port from '../../port';
import '../../css/company.css';
import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';

function DanhSachDangKy() {
    const [thuctaps, setthuctap] = useState([]);
    const [canbohds, setCanBoHD] = useState([]);
    const [congtys, setCongTy] = useState([]);
    const [Giaoviens, setGiaoviens] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    var ThongTinGiaoVien = {};
    var ThongTinCanBoHD = '';
    var ThongTinSinhVien = '';
    var ThongTinCongTy = '';
    var tblThucTap = [];

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
    var MaCongTy = '';
    congtys.map((ct) => {
        if (ct.email == taikhoan) {
            MaCongTy = ct.macongty;
        }
    });
    const mathuctap = thuctaps.map((tttt) => {
        sinhViens.map((sv) => {
            if (sv.masinhvien == tttt.masinhvien) {
                ThongTinSinhVien = sv.hoten;
            }
        });
        Giaoviens.map((gv) => {
            if (gv.magiaovien == tttt.magiaovien) {
                ThongTinGiaoVien = {
                    tengiaovien: gv.tengiaovien,
                    email: gv.email,
                };
            }
        });
        congtys.map((ct) => {
            if (ct.macongty == tttt.macongty) {
                ThongTinCongTy = {
                    tencongty: ct.tencongty,
                    email: ct.email,
                };
            }
        });
        canbohds.map((cbhd) => {
            if (cbhd.macanbo == tttt.macanbohuongdan) {
                ThongTinCanBoHD = cbhd.tencanbo;
            }
        });
        tblThucTap.push({
            _id: tttt._id,
            mathuctap: tttt.mathuctap,
            tensinhvien: ThongTinSinhVien,
            tengiaovien: ThongTinGiaoVien.tengiaovien,
            tencanbo: ThongTinCanBoHD,
            noidungthuctap: tttt.noidungthuctap,
            emailcongty: ThongTinCongTy.email,
            tencongty: ThongTinCongTy.tencongty,
            trangthaidon: tttt.trangthaidon,
        });
    });

    function openMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.add('openMenu');
    }
    function closeMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.remove('openMenu');
    }
    console.log(`${ThongTinCongTy.tencongty} đã duyệt`)
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
                    <Link to={`/company/tintuc/taikhoan?taikhoan=${taikhoan}`}>
                        <a>
                            <li id="tintuc">
                                <HiOutlineNewspaper className="icon" />
                                Tin tức
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/company/dangkythuctap/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thuctap">
                                <FiUsers className="icon" />
                                Đăng ký thực tập
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/company/danhsachdangky/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thongtin" className="click">
                                <PiStudentDuotone className="icon" />
                                Danh sách đăng ký
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/company/canbohuongdan/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thongtin">
                                <PiStudentDuotone className="icon" />
                                Cán bộ hướng dẫn
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
                    <span id="route">/Danh sách đăng ký thực tập</span>
                </div>
                <div className="content">
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">Đơn đăng ký thực tập</h1>
                        <div className="danhsachdondangky">
                            <input type="text" placeholder="Công ty" />
                            <button className="button_search">
                                {' '}
                                <AiOutlineSearch className="icon_button" />
                                Tìm kiếm
                            </button>
                            <table>
                                <thead>
                                    <tr className="tieude_table">
                                        <th id="stt">STT</th>
                                        <th id="masinhvien">Tên sinh viên</th>
                                        <th id="tensinhvien">
                                            Giáo viên hướng dẫn
                                        </th>
                                        <th id="emailsinhvien">
                                            Vị trí  thực tập
                                        </th>
                                        <th id="ngaytaodon">Người phụ trách</th>
                                        <th id="trangthai">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tblThucTap.map((dtt, index) => {
                                        if (
                                            taikhoan == dtt.emailcongty &&
                                            dtt.emailcongty != null
                                          && dtt.trangthaidon == 'Giáo viên đã duyệt' || dtt.trangthaidon == `${ThongTinCongTy.tencongty} đã duyệt`)
                                            return (
                                                <Link
                                                    to={`/company/quanlythuctap/thongtindangky/duyetdonthuctap?mathuctap=${dtt.mathuctap}&id=${dtt._id}&taikhoan=${taikhoan}`}
                                                >
                                                    <tr className="info">
                                                        <th id="stt">
                                                            {index + 1}
                                                        </th>
                                                        <th id="masinhvien">
                                                            {dtt.tensinhvien}
                                                        </th>
                                                        <th id="tensinhvien">
                                                            {dtt.tengiaovien}
                                                        </th>
                                                        <th id="emailsinhvien">
                                                            {dtt.noidungthuctap}
                                                        </th>
                                                        <th id="ngaytaodon">
                                                            {dtt.tencanbo}
                                                        </th>
                                                        <th id="trangthai">
                                                            {dtt.trangthaidon}
                                                        </th>
                                                    </tr>
                                                </Link>
                                            );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DanhSachDangKy;
