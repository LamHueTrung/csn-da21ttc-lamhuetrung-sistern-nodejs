import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { PiStudentDuotone } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { TbHomeEco } from 'react-icons/tb';
import { format } from 'date-fns';
import port from '../../port';
import '../../css/company.css';
import '../../css/student.css';
import '../../css/base.css';
function DangKyDotThucTap() {
    const [TaiKhoans, setTaiKhoans] = useState([]);
    const [DotThucTaps, setDotThucTaps] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    useEffect(() => {
        axios
            .get(`${port}/company/dangnhaptaikhoan`)
            .then((response) => setTaiKhoans(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    useEffect(() => {
        axios
            .get(`${port}/admin/danhsachdotthuctap`)
            .then((response) => setDotThucTaps(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);

    function Dangky(event) {
        var ThongTinDangKy = {};
        var tendotthuctap = document.getElementById('tendotthuctap').value;
        var ngaybatdau = document.getElementById('Ngaybatdau').value;
        var ngayketthuc = document.getElementById('ngayketthuc').value;
        var ghichu = document.getElementById('ghichu').value;
        var danhsachlop = document.getElementById('danhsachlop').value;
        if (
            tendotthuctap == '' ||
            ngaybatdau == '' ||
            ngayketthuc == '' ||
            ghichu == '' ||
            danhsachlop == ''
        ) {
            alert('Điền đầy đủ thông tin');
            event.preventDefault();
        } else if (ngayketthuc < ngaybatdau) {
            alert('Ngày kết thúc không hợp lệ');
            event.preventDefault();
        } else {
            ThongTinDangKy = {
                tendotthuctap: document.getElementById('tendotthuctap').value,
                ngaybatdau: document.getElementById('Ngaybatdau').value,
                ngayketthuc: document.getElementById('ngayketthuc').value,
                ghichu: document.getElementById('ghichu').value,
                danhsachlop: document.getElementById('danhsachlop').value,
            };
            axios
                .post(`${port}/admin/themdotthuctap`, ThongTinDangKy)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Lỗi khi thêm dữ liệu:', error);
                });
            var DateNow = new Date();
            var ThongBao = {
                thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
                thongbaosinhvien: `Thực tập ${ThongTinDangKy.tendotthuctap} đã mở ${ThongTinDangKy.ghichu}`,
                thongbaogiaovien: `Thực tập ${ThongTinDangKy.tendotthuctap} đã mở ${ThongTinDangKy.ghichu}`,
                thongbaoadmin: `Thực tập ${ThongTinDangKy.tendotthuctap} đã mở ${ThongTinDangKy.ghichu}`,
            };
            axios
                .post(`${port}/company/themthongbao`, ThongBao)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Lỗi khi thêm dữ liệu:', error);
                });
            alert('Thêm đợt thực tập thành công');
        }
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
                <ul id="navbar">
                    <a onClick={closeMenu}>
                        <li className="thongbao ">
                            <AiOutlineHome className="icon" />
                        </li>
                    </a>
                    <Link to={`/admin/tintuc/taikhoan?taikhoan=${taikhoan}`}>
                        <a>
                            <li id="tintuc">
                                <HiOutlineNewspaper className="icon" />
                                Tin tức
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/admin/danhsachdotthuctap/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thuctap" className="click">
                                <FiUsers className="icon" />
                                Đợt thực tập
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/admin/quanlythuctap/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thuctap">
                                <FiUsers className="icon" />
                                Duyệt đơn
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
                    <span id="route">/Thêm đợt thực tập</span>
                </div>
                <div id="dondangky" className="content">
                    <div className="thongtincongty company">
                        <h1 className="lable_chitiet">Thêm đợt thực tập</h1>
                        <ul className="thongtindangkythuctap">
                            <li>
                                <input
                                    id="tendotthuctap"
                                    placeholder="Tên đợt thực tập"
                                    type="text"
                                />
                            </li>
                            <li>
                                <input
                                    id="Ngaybatdau"
                                    placeholder="Ngày bắt đầu"
                                    type="Date"
                                />
                            </li>
                            <li>
                                <input
                                    id="ngayketthuc"
                                    placeholder="Ngày kết thúc"
                                    type="Date"
                                />
                            </li>
                        </ul>
                        <ul className="thongtindondangky fullsize">
                            <li>
                                <textarea
                                    id="ghichu"
                                    className="fullsize_input description"
                                    type="textbox"
                                    placeholder="Ghi chú"
                                />
                            </li>
                        </ul>
                        <ul className="thongtindondangky fullsize">
                            <li>
                                <textarea
                                    id="danhsachlop"
                                    className="fullsize_input description"
                                    type="textbox"
                                    placeholder="Danh sách lớp (Nhập danh sách lớp theo cú pháp A,B,C,D,....)"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="nutbam">
                        <Link
                            to={`/admin/danhsachdotthuctap/taikhoan?taikhoan=${taikhoan}`}
                        >
                            <button className="button_huy">
                                {' '}
                                <ImCancelCircle className="icon_button" />
                                Đóng
                            </button>
                            <button className="button_luu" onClick={Dangky}>
                                {' '}
                                <AiOutlineCheck className="icon_button" />
                                Thêm
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangKyDotThucTap;
