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
function DangKyThucTap() {
    const [TaiKhoans, setTaiKhoans] = useState([]);
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
    var ThongTinCongTy = {};
    TaiKhoans.map((tk) => {
        if (tk.taikhoan == taikhoan) {
            ThongTinCongTy = {
                email: tk.taikhoan,
            };
        }
    });
    function isValidPhoneNumber(phoneNumber) {
        phoneNumber = String(phoneNumber).trim();

        var phoneRegex = /^\+?[0-9]+$/;
        if (!phoneRegex.test(phoneNumber)) {
            return false;
        }
        if (phoneNumber.length !== 10) {
            return false;
        }
        return true;
    }
    function isValidNganHang(stk) {
        stk = String(stk).trim();

        var phoneRegex = /^\+?[0-9]+$/;
        if (!phoneRegex.test(stk)) {
            return false;
        }
        if (stk.length > 10 && stk.length < 16) {
            return false;
        }
        return true;
    }
    function Dangky(event) {
        var tencongty = document.getElementById('tencongty').value;
        var diachi = document.getElementById('diachi').value;
        var macanbo = document.getElementById('macanbo').textContent;
        var sodienthoai = document.getElementById('sodienthoai').value;
        var sodienthoaicanbo =
            document.getElementById('sodienthoaicanbo').value;
        var motacongviec = document.getElementById('motacongviec').value;
        if (
            tencongty == '' ||
            diachi == '' ||
            macanbo == '' ||
            sodienthoai == '' ||
            motacongviec == ''
        ) {
            alert('Điền đầy đủ thông tin');
            event.preventDefault();
        } else if (!isValidPhoneNumber(sodienthoai)) {
            alert('Số điện thoại công ty không hợp lệ');
            event.preventDefault();
        } else if (!isValidPhoneNumber(sodienthoaicanbo)) {
            alert('Số điện thoại cán bộ không hợp lệ');
            event.preventDefault();
        } else if (
            isValidNganHang(document.getElementById('sotaikhoan').value)
        ) {
            alert('Số tài khoản cán bộ không hợp lệ');
            event.preventDefault();
        } else {
            var ThongTinDangKy = {};
            const macongty = Math.floor(Math.random() * 100000) + 1;
            ThongTinDangKy = {
                macongty: macongty,
                tencongty: document.getElementById('tencongty').value,
                diachi: document.getElementById('diachi').value,
                macanbo: document.getElementById('macanbo').textContent,
                sodienthoai: document.getElementById('sodienthoai').value,
                motacongviec: document.getElementById('motacongviec').value,
            };
            axios
                .post(`${port}/company/dangkythongtin`, ThongTinDangKy)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Lỗi khi thêm dữ liệu:', error);
                });
            var DateNow = new Date();
            var ThongBao = {
                thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
                thongbaoadmin: `Công ty ${ThongTinDangKy.tencongty} vừa được thêm vào chương trình thực tập`,
            };
            axios
                .post(`${port}/company/themthongbao`, ThongBao)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Lỗi khi thêm dữ liệu:', error);
                });
            var ThongTinCanBo = {};
            ThongTinCanBo = {
                macanbo: document.getElementById('macanbo').textContent,
                macongty: macongty,
                tencanbo: document.getElementById('tencanbo').value,
                sotaikhoan: document.getElementById('sotaikhoan').value,
                sodienthoai: document.getElementById('sodienthoaicanbo').value,
            };
            axios
                .post(`${port}/company/themcanbo`, ThongTinCanBo)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Lỗi khi thêm dữ liệu:', error);
                });
            alert('Thêm công ty thực tập thành công');
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
                            <li id="thuctap">
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
                            <li id="thongtin" className="click">
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
                    <span id="route">/Đăng ký chương trình thực tập</span>
                </div>
                <div id="dondangky" className="content">
                    <div className="thongtincongty company">
                        <h1 className="lable_chitiet">Thông tin đăng ký</h1>
                        <ul className="thongtindangkythuctap email_dangky">
                            <li className="thong_tin_email close">
                                <span className="lable">Người tạo </span>
                                <span className="info">
                                    {ThongTinCongTy.email}
                                </span>
                            </li>
                            <li>
                                <input
                                    id="tencongty"
                                    placeholder="Tên công ty"
                                    type="text"
                                />
                            </li>
                            <li>
                                <input
                                    id="diachi"
                                    placeholder="Địa chỉ"
                                    type="text"
                                />
                            </li>
                            <li>
                                <input
                                    id="sodienthoai"
                                    placeholder="Số điện thoại"
                                    type="number"
                                />
                            </li>
                        </ul>
                        <ul className="thongtindondangky fullsize">
                            <li>
                                <textarea
                                    id="motacongviec"
                                    className="fullsize_input description"
                                    type="textbox"
                                    placeholder="Mô tả công việc (chi tiết công việc, địa chỉ thực tập, Phúc lợi...)"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincongty company">
                        <h1 className="lable_chitiet">
                            Thông tin cán bộ hướng dẫn
                        </h1>
                        <ul className="thongtindangkythuctap email_dangky">
                            <li className="thong_tin_email close">
                                <span className="lable">
                                    Mã người phụ trách{' '}
                                </span>
                                <span className="info" id="macanbo">
                                    {Math.floor(Math.random() * 100000) + 1}
                                </span>
                            </li>
                            <li>
                                <input
                                    id="tencanbo"
                                    placeholder="Tên cán bộ phụ trách"
                                    type="text"
                                />
                            </li>
                            <li>
                                <input
                                    id="sodienthoaicanbo"
                                    placeholder="Số điện thoại"
                                    type="number"
                                />
                            </li>
                            <li>
                                <input
                                    id="sotaikhoan"
                                    placeholder="Số tài khoản"
                                    type="number"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="nutbam">
                        <Link
                            to={`/admin/congty/taikhoan?taikhoan=${taikhoan}`}
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

export default DangKyThucTap;
