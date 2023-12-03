import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { TbHomeEco } from 'react-icons/tb';
import { AiOutlineHome } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import port from '../../port';
import '../../css/teacher.css';
import '../../css/base.css';
import '../../css/responsive.css';
function Tintuc() {
    const [TinTucs, setTinTucs] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');
    useEffect(() => {
        axios
            .get(`${port}/company/tintuc`) // Điều chỉnh URL tương ứng với tuyến đường API
            .then((response) => setTinTucs(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
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
                <ul id="navbar">
                    <a onClick={closeMenu}>
                        <li className="thongbao ">
                            <AiOutlineHome className="icon" />
                        </li>
                    </a>
                    <Link to={`/admin/tintuc/taikhoan?taikhoan=${taikhoan}`}>
                        <a>
                            <li id="tintuc" className="click">
                                <HiOutlineNewspaper className="icon" />
                                Tin tức
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/admin/quanlythuctap/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thuctap">
                                <FiUsers className="icon" />
                                Thực tập
                            </li>
                        </a>
                    </Link>
                    <Link to={`/admin/congty/taikhoan?taikhoan=${taikhoan}`}>
                        <a href="">
                            <li id="thongtin">
                                <TbHomeEco className="icon" />
                                Công ty
                            </li>
                        </a>
                    </Link>
                    <Link to={`/admin/sinhvien/taikhoan?taikhoan=${taikhoan}`}>
                        <a href="">
                            <li id="thongtin">
                                <PiStudentDuotone className="icon" />
                                Sinh viên
                            </li>
                        </a>
                    </Link>
                    <Link to={`/admin/giaovien/taikhoan?taikhoan=${taikhoan}`}>
                        <a href="">
                            <li id="thongtin">
                                <PiStudentDuotone className="icon" />
                                Giáo viên
                            </li>
                        </a>
                    </Link>
                </ul>
                <Link to="/">
                    <a id="dangxuat" href="" className="dangxuat">
                        <FiLogOut className="icon" />
                        Đăng xuất
                    </a>
                </Link>
            </div>
            <div className="data">
                <div className="header">
                    <AiOutlineHome className="icon" />
                    <span id="route">/Tin tức</span>
                </div>
                <div className="content">
                    <h1 className="lable">Tin tức</h1>
                    <ul className="items">
                        <Link>
                            {TinTucs.map((tintuc) => {
                                if (tintuc.thongbaogiaovien != null)
                                    return (
                                        <li>
                                            <h2>
                                                THÔNG BÁO GIÁO VIÊN:{' '}
                                                {tintuc.thongbaogiaovien}
                                            </h2>
                                            <span> ({tintuc.thoigian}) </span>
                                        </li>
                                    );
                            })}
                            {TinTucs.map((tintuc) => {
                                if (tintuc.thongbaosinhvien != null)
                                    return (
                                        <li>
                                            <h2>
                                                THÔNG BÁO SINH VIÊN:{' '}
                                                {tintuc.thongbaosinhvien}
                                            </h2>
                                            <span> ({tintuc.thoigian}) </span>
                                        </li>
                                    );
                            })}
                            {TinTucs.map((tintuc) => {
                                if (tintuc.thongbaocongty != null)
                                    return (
                                        <li>
                                            <h2>
                                                THÔNG BÁO CÔNG TY:{' '}
                                                {tintuc.thongbaocongty}
                                            </h2>
                                            <span> ({tintuc.thoigian}) </span>
                                        </li>
                                    );
                            })}
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Tintuc;
