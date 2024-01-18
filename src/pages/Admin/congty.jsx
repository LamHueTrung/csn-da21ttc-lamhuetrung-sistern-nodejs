import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { PiStudentDuotone } from 'react-icons/pi';
import { TbHomeEco } from 'react-icons/tb';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiSettings } from 'react-icons/ci';
import { FiUsers } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';

import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';
import '../../css/responsive.css';
import port from '../../port';
function Congty() {
    const [congtys, setCongTy] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');
    useEffect(() => {
        axios
            .get(`${port}/company/danhsachcongty`) // Điều chỉnh URL tương ứng với tuyến đường API
            .then((response) => setCongTy(response.data))
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

    var DanhSachCongTyChange = [];
    const handleCTChange = (event, dtt) => {
        if (event.target.checked) {
            DanhSachCongTyChange.push(dtt);
        }
    };
    const DeleteCT = (event, dtt) => {
        if (DanhSachCongTyChange.length === 0) {
            alert('Bạn chưa chọn công ty muốn xoá');
        } else {
            const userConfirmed = window.confirm(
                'Bạn muốn xoá các đợt thực tập đã chọn?',
            );
            if (userConfirmed) {
                const dataToadd2 = {
                    deleted: 'deleted',
                };
                DanhSachCongTyChange.map((ct) => {
                    axios
                        .put(`${port}/company/xoacongty/${ct._id}`, dataToadd2)
                        .then((response) => {
                            alert('Xoá thành công');
                            console.log(response);
                        })
                        .catch((error) => {
                            console.error(
                                'Lỗi khi thêm dữ liệu công ty:',
                                error,
                            );
                        });
                });
            } else {
                alert('Đã hủy bỏ xoá công ty');
            }
        }
    };
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
                    <span id="route">/Công ty thực tập</span>
                </div>
                <div className="content">
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">Công ty thực tập</h1>
                        <div className="danhsachdondangky">
                            <button
                                className="icon_dotthuctap themdulieu"
                                onClick={DeleteCT}
                            >
                                {' '}
                                <MdOutlineCancel className="icon_button" />
                                Xoá công ty
                            </button>
                            <Link
                                to={`/admin/themcongty/taikhoan?taikhoan=${taikhoan}`}
                            >
                                <button className="themdulieu icon_dotthuctap mobile_button_seach">
                                    {' '}
                                    <IoIosAddCircleOutline className="icon_button" />
                                    Thêm công ty
                                </button>
                            </Link>
                            <table>
                                <thead>
                                    <tr className="tieude_table">
                                        <th id="checked"></th>
                                        <th id="macongty">Mã công ty</th>
                                        <th id="admin_tencongty">
                                            Tên công ty
                                        </th>
                                        <th id="admin_diachicongty">Địa chỉ</th>
                                        <th id="vitri">Số điện thoại</th>
                                        <th id="admin_diachicongty">Mô tả</th>
                                        <th id="vitri">Mã cán bộ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {congtys.map((congty) => {
                                        if (congty.deleted != 'deleted') {
                                            return (
                                                <tr className="info">
                                                    <th id="checked">
                                                        <input
                                                            id="choncongty"
                                                            // checked = {selectedTTCB === ttcb}
                                                            type="checkbox"
                                                            onChange={(event) =>
                                                                handleCTChange(
                                                                    event,
                                                                    congty,
                                                                )
                                                            }
                                                        />
                                                    </th>
                                                    <th id="macongty">
                                                        {congty.macongty}
                                                    </th>
                                                    <th id="admin_tencongty">
                                                        {congty.tencongty}
                                                    </th>
                                                    <th id="admin_diachicongty">
                                                        {congty.diachi}
                                                    </th>
                                                    <th id="vitri">
                                                        {congty.sodienthoai}
                                                    </th>
                                                    <th id="admin_diachicongty">
                                                        {congty.motacongviec}
                                                    </th>
                                                    <th id="vitri">
                                                        {congty.macanbo}
                                                    </th>
                                                </tr>
                                            );
                                        }
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

export default Congty;
