import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { format } from 'date-fns';
import port from '../../port';
import '../../css/responsive.css';
import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';
function DangKyThucTap() {
    const [Giaoviens, setGiaoviens] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    function Dangky() {
        var ThongTinDangKy = {};
        const magiaovien = Math.floor(Math.random() * 100000) + 1;
        ThongTinDangKy = {
            email: taikhoan,
            tengiaovien: document.getElementById('tengiaovien').value,
            magiaovien: magiaovien,
            chucvu: document.getElementById('chucvu').value,
            sodienthoai: document.getElementById('sodienthoai').value,
        };
        axios
            .post(`${port}/teacher/themthongtingiaovien`, ThongTinDangKy)
            .then((response) => {
                alert('Cập nhật thông tin thành công');
            })
            .catch((error) => {
                console.error('Lỗi khi thêm dữ liệu:', error);
            });
        var DateNow = new Date();
        var ThongBao = {
            thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
            thongbaogiaovien: `Tài khoản ${taikhoan} vừa cập nhật thông tin cá nhân`,
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
                            <li id="thongtin" className="click">
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
                    <span id="route">/Đăng ký thông tin</span>
                </div>
                <div id="dondangky" className="content">
                    <div className="thongtincongty company">
                        <h1 className="lable_chitiet">Thông tin đăng ký</h1>
                        <ul className="thongtindangkythuctap email_dangky">
                            <li className="thong_tin_email">
                                <span className="lable">Email </span>
                                <span className="info">{taikhoan}</span>
                            </li>
                            <li>
                                <input
                                    id="tengiaovien"
                                    placeholder="Tên giáo viên"
                                    type="text"
                                />
                            </li>
                            <li></li>
                        </ul>
                        <ul className="thongtindangkythuctap">
                            <li>
                                <input
                                    id="chucvu"
                                    placeholder="Chức vụ"
                                    type="text"
                                />
                            </li>
                            <li>
                                <input
                                    id="sodienthoai"
                                    placeholder="Số điện thoại"
                                    type="text"
                                />
                            </li>
                            <li>
                                <div className="nutbam">
                                    <Link
                                        to={`/teacher/tintuc/taikhoan?taikhoan=${taikhoan}`}
                                    >
                                        <button
                                            className="button_luu"
                                            onClick={Dangky}
                                        >
                                            {' '}
                                            <AiOutlineCheck className="icon_button" />
                                            Lưu
                                        </button>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangKyThucTap;
