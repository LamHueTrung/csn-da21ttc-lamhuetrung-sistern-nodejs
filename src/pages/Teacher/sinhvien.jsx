import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import port from '../../port';
import '../../css/responsive.css';
import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';

function Sinhvien() {
    const [sinhViens, setSinhViens] = useState([]);
    const [danhsachs, setDanhsachs] = useState([]);
    const [thuctaps, setthuctap] = useState([]);
    const [value, setValue] = useState('');
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    useEffect(() => {
        axios
            .get(`${port}/student/danhsachsinhvien`) // Điều chỉnh URL tương ứng với tuyến đường API
            .then((response) => setSinhViens(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
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
            .get(`${port}/student/donthuctap`)
            .then((response) => setthuctap(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    var ThongTinSinhVien = {};
    sinhViens.map((sv) => {
        if (sv.email == taikhoan) {
            ThongTinSinhVien = {
                hoten: sv.hoten,
                email: sv.email,
                masinhvien: sv.masinhvien,
                lop: sv.lop,
            };
        }
    });
    var danhsachtimkiem = sinhViens;
    var tukhoa = '';
    function timkiemsinhvien() {
        tukhoa = document.getElementById('tukhoa').value;
        if (tukhoa == '') {
            setDanhsachs(sinhViens);
        } else {
            danhsachtimkiem = [];
            sinhViens.map((sv) => {
                if (sv.lop == tukhoa || sv.trangthaisinhvien == tukhoa) {
                    danhsachtimkiem.push({
                        hoten: sv.hoten,
                        email: sv.email,
                        masinhvien: sv.masinhvien,
                        lop: sv.lop,
                        sodienthoai: sv.sodienthoai,
                        trangthaisinhvien: sv.trangthaisinhvien,
                    });
                }
            });
            setDanhsachs(danhsachtimkiem);
        }
    }
    var tblThucTap = {};
    const mathuctap = thuctaps.map((tttt) => {
        if (tttt.masinhvien == ThongTinSinhVien.masinhvien) {
            tblThucTap = {
                mathuctap: tttt.mathuctap,
                macongty: tttt.macongty,
                macanbo: tttt.macanbohuongdan,
                masinhvien: tttt.masinhvien,
                ngaybatdau: tttt.ngaybatdau,
                loai: tttt.loai,
            };
        }
    });
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
                            <li id="thuctap">
                                <FiUsers className="icon" />
                                Thực tập
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/teacher/sinhvien/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thongtin" className="click">
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
                    <span id="route">/Danh sách sinh viên</span>
                </div>
                <div className="content">
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">Thông tin sinh viên</h1>
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
                                        <th id="masinhvien">Mã sinh viên</th>
                                        <th id="tensinhvien">Tên sinh viên</th>
                                        <th id="emailsinhvien">Email</th>
                                        <th id="ngaytaodon">Số điện thoại</th>
                                        <th id="trangthai">Lớp</th>
                                        <th id="trangthai">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {danhsachs.map((sinhVien, index) => {
                                        return (
                                            <tr className="info">
                                                <th id="stt">{index + 1}</th>
                                                <th id="masinhvien">
                                                    {sinhVien.masinhvien}
                                                </th>
                                                <th id="tensinhvien">
                                                    {sinhVien.hoten}
                                                </th>
                                                <th id="emailsinhvien">
                                                    {sinhVien.email}
                                                </th>
                                                <th id="ngaytaodon">
                                                    {sinhVien.sodienthoai}
                                                </th>
                                                <th id="trangthai">
                                                    {sinhVien.lop}
                                                </th>
                                                <th id="trangthai">
                                                    {sinhVien.trangthaisinhvien}
                                                </th>
                                            </tr>
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

export default Sinhvien;
