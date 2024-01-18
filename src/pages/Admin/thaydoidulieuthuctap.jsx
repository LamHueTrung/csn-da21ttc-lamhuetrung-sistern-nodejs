import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { PiStudentDuotone } from 'react-icons/pi';
import { TbHomeEco } from 'react-icons/tb';
import { CiSettings } from 'react-icons/ci';
import { FiUsers } from 'react-icons/fi';
import { format } from 'date-fns';
import { MdOutlineCancel } from 'react-icons/md';
import { TbError404 } from 'react-icons/tb';

import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';
import '../../css/responsive.css';
import '../../css/admin.css';

import port from '../../port';

function QuanLyThucTap() {
    const [DotThucTaps, setDotThucTaps] = useState([]);
    const [ThongTinCongViec, setThongTinCongViecs] = useState([]);
    const [congtys, setCongTy] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const _IdDonThucTap = urlParams.get('id');
    const taikhoan = urlParams.get('taikhoan');

    useEffect(() => {
        axios
            .get(`${port}/admin/thongtincongbo`)
            .then((response) => setThongTinCongViecs(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
        axios
            .get(`${port}/admin/danhsachdotthuctap`)
            .then((response) => setDotThucTaps(response.data))
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
    var ThongTinCongBo = [];
    var TenCongTy = '';
    var TenDotThucTap = '';
    function openMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.add('openMenu');
    }
    function closeMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.remove('openMenu');
    }
    ThongTinCongViec.map((ttcv) => {
        if (ttcv.madotthuctap == _IdDonThucTap) {
            congtys.map((ct) => {
                if (ttcv.macongty == ct.macongty) {
                    TenCongTy = ct.tencongty;
                }
            });
            DotThucTaps.map((dtt) => {
                if (dtt._id == ttcv.madotthuctap) {
                    TenDotThucTap = dtt.tendotthuctap;
                }
            });
            ThongTinCongBo.push({
                _id: ttcv._id,
                tendotthuctap: TenDotThucTap,
                tencongty: TenCongTy,
                congviec: ttcv.congviecthuctap,
                ghichu: ttcv.ghichu,
            });
        }
    });
    console.log(DotThucTaps);
    var DanhSachDotThucTapChange = [];
    const handleDTTChange = (event, dtt) => {
        if (event.target.checked) {
            DanhSachDotThucTapChange.push(dtt);
        }
    };
    const ERORR = (event, dtt) => {
        alert('Chức năng chưa thiết lập xong ');
    };
    const DeleteDTT = (event, dtt) => {
        if (DanhSachDotThucTapChange.length === 0) {
            alert('Bạn chưa chọn dữ liệu');
        } else {
            const userConfirmed = window.confirm(
                'Bạn muốn xoá các dữ liệu đã chọn?',
            );
            if (userConfirmed) {
                DanhSachDotThucTapChange.map((dtt) => {
                    axios
                        .delete(`${port}/admin/xoadulieucongbo/${dtt._id}`)
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.error(
                                'Lỗi khi thêm dữ liệu sinh vien:',
                                error,
                            );
                        });
                });
                alert('Xoá thành công');
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
                    <span id="route">
                        /Quản lý đợt thực tập /Thay đổi dữ liệu {TenDotThucTap}
                    </span>
                </div>
                <div className="content">
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet tieuDeDulieu">
                            Dữ liệu {TenDotThucTap}
                        </h1>
                        <div className="danhsachdondangky">
                            <button
                                className="icon_dotthuctap themdulieu"
                                onClick={DeleteDTT}
                            >
                                {' '}
                                <MdOutlineCancel className="icon_button" />
                                Xoá dữ liệu
                            </button>
                            <button
                                className="icon_dotthuctap themdulieu"
                                onClick={ERORR}
                            >
                                {' '}
                                <TbError404 className="icon_button" />
                                Chỉnh sửa dữ liệu
                            </button>
                            <ul className="thongtintaikhoan mobile_dulieucongbo">
                                <table className="dsDeDulieu">
                                    <thead>
                                        <tr className="tieude_table">
                                            <th id="stt">STT</th>
                                            <th id="checked"></th>

                                            <th id="tensinhvien">
                                                Tên đợt thực tập
                                            </th>
                                            <th id="tensinhvien">
                                                Tên công ty
                                            </th>
                                            <th id="emailsinhvien">
                                                Công việc
                                            </th>
                                            <th id="ngaytaodon">Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ThongTinCongBo.map((dtt, index) => {
                                            return (
                                                <tr className="info">
                                                    <th id="stt">
                                                        {index + 1}
                                                    </th>
                                                    <th id="checked">
                                                        <input
                                                            id="choncongty"
                                                            // checked = {selectedTTCB === ttcb}
                                                            type="checkbox"
                                                            onChange={(event) =>
                                                                handleDTTChange(
                                                                    event,
                                                                    dtt,
                                                                )
                                                            }
                                                        />
                                                    </th>
                                                    <th id="tensinhvien">
                                                        {dtt.tendotthuctap}
                                                    </th>
                                                    <th id="tensinhvien">
                                                        {dtt.tencongty}
                                                    </th>
                                                    <th id="emailsinhvien">
                                                        {dtt.congviec}
                                                    </th>
                                                    <th id="ngaytaodon">
                                                        {dtt.ghichu}
                                                    </th>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuanLyThucTap;
