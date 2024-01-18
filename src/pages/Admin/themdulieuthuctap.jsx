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
    const [selectedDotThucTap, setSelectedDotThucTap] = useState('');
    const [file, setFile] = useState(null);

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
    DotThucTaps.map((dtt) => {
        if (dtt._id == selectedDotThucTap) {
            TenDotThucTap = dtt.tendotthuctap;
        }
    });
    const handleGiaovienChange = (event) => {
        setSelectedDotThucTap(event.target.value);
    };
    function openMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.add('openMenu');
    }
    function closeMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.remove('openMenu');
    }
    const handleChangeFile = (event) => {
        const file = event.target.files[0];

        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.slice(
                ((fileName.lastIndexOf('.') - 1) >>> 0) + 2,
            );

            // Kiểm tra nếu phần mở rộng là "csv"
            if (fileExtension.toLowerCase() === 'csv') {
                setFile(file);
            } else {
                alert('Chỉ chấp nhận file CSV. Vui lòng chọn lại.');
                event.target.value = '';
            }
        }
    };
    const handleUpload = async () => {
        const dtt_kt = document.querySelector('#thongtingiaovien').value;
        if (dtt_kt == '') {
            alert('Chưa chọn đợt thực tập');
        } else {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', `thongtincongviec.pdf`);
            try {
                const response = await axios.post(
                    `${port}/api/themcongviec/${selectedDotThucTap}`,
                    formData,
                );
                setThongTinCongViecs(response.data);
                var DateNow = new Date();
                var ThongBao = {
                    thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
                    thongbaoadmin: `Dữ liệu đợt thực tập ${TenDotThucTap} vừa được cập nhật`,
                };
                axios
                    .post(`${port}/company/themthongbao`, ThongBao)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error('Lỗi khi thêm dữ liệu:', error);
                    });
                alert('Thành công');
                console.log('Upload thành công:', formData);
            } catch (error) {
                alert('Thất bại');
                console.error('Upload thất bại:', error);
            }
        }
    };
    ThongTinCongViec.map((ttcv) => {
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
            tendotthuctap: TenDotThucTap,
            tencongty: TenCongTy,
            congviec: ttcv.congviecthuctap,
            ghichu: ttcv.ghichu,
        });
    });
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
                    <div className="thongtincanhan mobile_taidulieu">
                        <h1 className="lable_chitiet">Đợt thực tập</h1>
                        <ul className="thongtintaikhoan">
                            <li className="themgiaovienhuongdan">
                                <select
                                    name=""
                                    id="thongtingiaovien"
                                    onChange={handleGiaovienChange}
                                >
                                    <option value="">
                                        --Chọn đợt thực tập--
                                    </option>
                                    {DotThucTaps.map((dtt) => {
                                        if (dtt.deleted != 'deleted') {
                                            return (
                                                <option value={dtt._id}>
                                                    {dtt.tendotthuctap}
                                                </option>
                                            );
                                        }
                                    })}
                                </select>
                            </li>
                            <li>
                                <input
                                    id="fileBaoCao"
                                    className="fullsize_input"
                                    placeholder="Nội dung thực tập"
                                    type="file"
                                    onChange={handleChangeFile}
                                />
                            </li>
                            <li>
                                <button
                                    onClick={handleUpload}
                                    className="button_chinhsua"
                                >
                                    Tải lên
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet tieuDeDulieu">
                            Dữ liệu công bố
                        </h1>
                        <div className="danhsachdondangky">
                            <ul className="thongtintaikhoan mobile_dulieucongbo">
                                <table className="dsDeDulieu">
                                    <thead>
                                        <tr className="tieude_table">
                                            <th id="stt">STT</th>
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
