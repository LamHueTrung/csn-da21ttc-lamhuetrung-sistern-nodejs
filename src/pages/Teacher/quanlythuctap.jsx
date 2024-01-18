import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import port from '../../port';
import '../../css/teacher.css';
import '../../css/responsive.css';
import '../../css/student.css';
import '../../css/base.css';

function QuanLyThucTap() {
    const [thuctaps, setthuctap] = useState([]);
    const [danhsachthuctaps, setdanhsachthuctap] = useState([]);
    const [canbohds, setCanBoHD] = useState([]);
    const [congtys, setCongTy] = useState([]);
    const [Giaoviens, setGiaoviens] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const [danhsachs, setDanhsachs] = useState([]);

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    var ThongTinGiaoVien = {};
    var ThongTinCanBoHD = '';
    var ThongTinSinhVien = {};
    var ThongTinCongTy = '';
    var tblThucTap = [];

    useEffect(() => {
        axios
            .get(`${port}/student/danhsachsinhvien`) // Điều chỉnh URL tương ứng với tuyến đường API
            .then((response) => setDanhsachs(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);

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
    var MaGV = '';
    Giaoviens.map((gv) => {
        if (gv.email == taikhoan) {
            MaGV = gv.magiaovien;
        }
    });
    const mathuctap = thuctaps.map((tttt) => {
        sinhViens.map((sv) => {
            if (sv.masinhvien == tttt.masinhvien) {
                ThongTinSinhVien = {
                    tensinhvien: sv.hoten,
                    lop: sv.lop,
                };
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
        canbohds.map((cbhd) => {
            if (cbhd.macanbo == tttt.macanbohuongdan) {
                ThongTinCanBoHD = cbhd.tencanbo;
            }
        });
        congtys.map((ct) => {
            if (ct.macongty == tttt.macongty) {
                ThongTinCongTy = ct.tencongty;
            }
        });
        tblThucTap.push({
            _id: tttt._id,
            mathuctap: tttt.mathuctap,
            magiaovien: tttt.magiaovien,
            tensinhvien: ThongTinSinhVien.tensinhvien,
            tengiaovien: ThongTinGiaoVien.tengiaovien,
            tencanbo: ThongTinCanBoHD,
            tencongty: ThongTinCongTy,
            trangthaidon: tttt.trangthaidon,
            noidungthuctap: tttt.noidungthuctap,
            dotthuctap: tttt.loai,
            lop: ThongTinSinhVien.lop,
        });
    });
    function loading() {
        setDanhsachs(tblThucTap);
    }
    function openMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.add('openMenu');
    }
    function closeMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.remove('openMenu');
    }
    var tukhoa = '';
    var danhsachtimkiem = tblThucTap;
    var tukhoa = '';
    function timkiemsinhvien() {
        tukhoa = document.getElementById('tukhoa').value;
        console.log(tukhoa == '');
        if (tukhoa == '') {
            document.querySelector('.danhsachall').classList.remove('close');
            document.querySelector('.danhsachtimkiem').classList.add('close');
        } else {
            danhsachtimkiem = [];
            danhsachtimkiem = tblThucTap.filter((sv) => {
                return sv.lop == tukhoa || sv.trangthaisinhvien == tukhoa;
            });
            setDanhsachs(danhsachtimkiem);
            document.querySelector('.danhsachall').classList.add('close');
            document
                .querySelector('.danhsachtimkiem')
                .classList.remove('close');
        }
    }
    var urlDuyetDon = '/teacher/quanlythuctap/thongtindangky/duyetdonthuctap';
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
                    <span id="route">
                        /{ThongTinGiaoVien.tengiaovien} /Quản lý thực tập
                    </span>
                </div>
                <div className="content">
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">Đơn đăng ký thực tập</h1>
                        <div className="danhsachdondangky">
                            <input
                                type="text"
                                placeholder="Từ khoá"
                                id="tukhoa"
                            />
                            <button
                                className="button_search"
                                onClick={timkiemsinhvien}
                            >
                                {' '}
                                <AiOutlineSearch className="icon_button" />
                                Tìm kiếm
                            </button>
                            <table className="danhsachall">
                                <thead>
                                    <tr className="tieude_table">
                                        <th id="stt">STT</th>
                                        <th id="tensinhvien">Đợt thực tập</th>
                                        <th id="tensinhvien">Tên sinh viên</th>
                                        <th id="tensinhvien">Lớp</th>
                                        <th id="emailsinhvien">
                                            Công ty đăng ký
                                        </th>
                                        <th id="ngaytaodon">Người phụ trách</th>
                                        <th id="ngaytaodon">
                                            Nội dung thực tập
                                        </th>
                                        <th id="trangthai">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tblThucTap.map((dtt, index) => {
                                        if (
                                            MaGV == dtt.magiaovien &&
                                            dtt.tengiaovien != null
                                        )
                                            return (
                                                <Link
                                                    to={`${urlDuyetDon}?mathuctap=${dtt.mathuctap}&id=${dtt._id}&taikhoan=${taikhoan}`}
                                                >
                                                    <tr className="info">
                                                        <th id="stt">
                                                            {index + 1}
                                                        </th>
                                                        <th id="tensinhvien">
                                                            {dtt.dotthuctap}
                                                        </th>
                                                        <th id="tensinhvien">
                                                            {dtt.tensinhvien}
                                                        </th>
                                                        <th id="tensinhvien">
                                                            {dtt.lop}
                                                        </th>
                                                        <th id="emailsinhvien">
                                                            {dtt.tencongty}
                                                        </th>
                                                        <th id="ngaytaodon">
                                                            {dtt.tencanbo}
                                                        </th>
                                                        <th id="ngaytaodon">
                                                            {dtt.noidungthuctap}
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
                            <table className="danhsachtimkiem close">
                                <thead>
                                    <tr className="tieude_table">
                                        <th id="stt">STT</th>
                                        <th id="tensinhvien">Đợt thực tập</th>
                                        <th id="tensinhvien">Tên sinh viên</th>
                                        <th id="tensinhvien">Lớp</th>
                                        <th id="emailsinhvien">
                                            Công ty đăng ký
                                        </th>
                                        <th id="ngaytaodon">Người phụ trách</th>
                                        <th id="ngaytaodon">
                                            Nội dung thực tập
                                        </th>
                                        <th id="trangthai">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {danhsachs.map((dtt, index) => {
                                        if (
                                            MaGV == dtt.magiaovien &&
                                            dtt.tengiaovien != null
                                        )
                                            return (
                                                <Link
                                                    to={`${urlDuyetDon}?mathuctap=${dtt.mathuctap}&id=${dtt._id}&taikhoan=${taikhoan}`}
                                                >
                                                    <tr className="info">
                                                        <th id="stt">
                                                            {index + 1}
                                                        </th>
                                                        <th id="tensinhvien">
                                                            {dtt.dotthuctap}
                                                        </th>
                                                        <th id="tensinhvien">
                                                            {dtt.tensinhvien}
                                                        </th>
                                                        <th id="tensinhvien">
                                                            {dtt.lop}
                                                        </th>
                                                        <th id="emailsinhvien">
                                                            {dtt.tencongty}
                                                        </th>
                                                        <th id="ngaytaodon">
                                                            {dtt.tencanbo}
                                                        </th>
                                                        <th id="ngaytaodon">
                                                            {dtt.noidungthuctap}
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

export default QuanLyThucTap;
