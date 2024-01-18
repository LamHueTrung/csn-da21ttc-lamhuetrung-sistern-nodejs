import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { PiStudentDuotone } from 'react-icons/pi';
import { TbHomeEco } from 'react-icons/tb';
import { AiOutlineSearch } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { FiUsers } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';

import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';
import '../../css/responsive.css';
import port from '../../port';

function QuanLyThucTap() {
    const [DotThucTaps, setDotThucTaps] = useState([]);
    const [selectedDTT, setSelectedDTT] = useState(null);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    useEffect(() => {
        axios
            .get(`${port}/admin/danhsachdotthuctap`)
            .then((response) => setDotThucTaps(response.data))
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

    // xoá - mới cập nhật
    var DanhSachDotThucTapChange = [];
    const handleDTTChange = (event, dtt) => {
        const checkbox = document.querySelector(`[name="${dtt._id}"]`);
        const parentElement = checkbox.parentNode;
        parentElement.style.border = '2px solid #090584';
        if (event.target.checked) {
            DanhSachDotThucTapChange.push(dtt);
        }
        event.preventDefault();
    };
    const DeleteDTT = (event, dtt) => {
        if (DanhSachDotThucTapChange.length === 0) {
            alert('Bạn chưa chọn đợt thực tập muốn xoá');
        } else {
            const userConfirmed = window.confirm(
                'Bạn muốn xoá các đợt thực tập đã chọn?',
            );
            if (userConfirmed) {
                const dataToadd2 = {
                    deleted: 'deleted',
                };
                DanhSachDotThucTapChange.map((dtt) => {
                    axios
                        .put(
                            `${port}/admin/xoadotthuctap/${dtt._id}`,
                            dataToadd2,
                        )
                        .then((response) => {
                            alert('Xoá thành công');
                            console.log(response);
                        })
                        .catch((error) => {
                            console.error(
                                'Lỗi khi thêm dữ liệu sinh vien:',
                                error,
                            );
                        });
                });
            } else {
                alert('Đã hủy bỏ xoá đợt thực tập');
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
                    <span id="route">/Quản lý đợt thực tập</span>
                </div>
                <div className="content">
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">
                            Danh sách đợt thực tập
                        </h1>
                        <div className="danhsachdondangky">
                            <button
                                className="icon_dotthuctap themdulieu"
                                onClick={DeleteDTT}
                            >
                                {' '}
                                <MdOutlineCancel className="icon_button" />
                                Xoá đợt
                            </button>
                            <Link
                                to={`/admin/quanlydotthuctap/taikhoan?taikhoan=${taikhoan}`}
                            >
                                <button className="icon_dotthuctap themdotmoi">
                                    {' '}
                                    <IoIosAddCircleOutline className="icon_button" />
                                    Thêm đợt mới
                                </button>
                            </Link>
                            <Link
                                to={`/admin/themdotthuctap/taikhoan?taikhoan=${taikhoan}`}
                            >
                                <button className="icon_dotthuctap themdulieu">
                                    {' '}
                                    <IoIosAddCircleOutline className="icon_button" />
                                    Thêm dữ liệu đợt
                                </button>
                            </Link>

                            <table>
                                <thead>
                                    <tr className="tieude_table">
                                        <th id="stt">STT</th>
                                        <th id="checked"></th>

                                        <th id="masinhvien">Tên đợt</th>
                                        <th id="tensinhvien">Ngày bắt đầu</th>
                                        <th id="emailsinhvien">
                                            Ngày kết thúc
                                        </th>
                                        <th id="ngaytaodon">Danh sách lớp</th>
                                        <th id="ngaytaodon">Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {DotThucTaps.map((dtt, index) => {
                                        if (dtt.deleted != 'deleted') {
                                            return (
                                                <Link
                                                    to={`/admin/thaydoidotthuctap/thaydoidulieu?id=${dtt._id}&taikhoan=${taikhoan}`}
                                                >
                                                    <tr className="info">
                                                        <th id="stt">
                                                            {index + 1}
                                                        </th>
                                                        <th id="checked">
                                                            <input
                                                                id="choncongty"
                                                                name={dtt._id}
                                                                // checked = {selectedTTCB === ttcb}
                                                                type="checkbox"
                                                                onClick={(
                                                                    event,
                                                                ) => {
                                                                    handleDTTChange(
                                                                        event,
                                                                        dtt,
                                                                    );
                                                                }}
                                                            />
                                                        </th>

                                                        <th id="masinhvien">
                                                            {dtt.tendotthuctap}
                                                        </th>
                                                        <th id="tensinhvien">
                                                            {dtt.ngaybatdau}
                                                        </th>
                                                        <th id="emailsinhvien">
                                                            {dtt.ngayketthuc}
                                                        </th>
                                                        <th id="ngaytaodon">
                                                            {dtt.danhsachlop}
                                                        </th>
                                                        <th id="ngaytaodon">
                                                            {dtt.ghichu}
                                                        </th>
                                                    </tr>
                                                </Link>
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

export default QuanLyThucTap;
