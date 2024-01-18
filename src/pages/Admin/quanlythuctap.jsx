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
import { MdDoneAll } from 'react-icons/md';
import '../../css/student.css';
import '../../css/base.css';
import '../../css/teacher.css';
import '../../css/responsive.css';
import port from '../../port';

function QuanLyThucTap() {
    const [thuctaps, setthuctap] = useState([]);
    const [canbohds, setCanBoHD] = useState([]);
    const [congtys, setCongTy] = useState([]);
    const [Giaoviens, setGiaoviens] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');
    var ThongTinGiaoVien = '';
    var ThongTinCanBoHD = '';
    var ThongTinSinhVien = '';
    var ThongTinCongTy = {};
    var tblThucTap = [];
    function openMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.add('openMenu');
    }
    function closeMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.remove('openMenu');
    }
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

    const mathuctap = thuctaps.map((tttt) => {
        sinhViens.map((sv) => {
            if (sv.masinhvien == tttt.masinhvien) {
                ThongTinSinhVien = sv.hoten;
            }
        });
        Giaoviens.map((gv) => {
            if (gv.magiaovien == tttt.magiaovien) {
                ThongTinGiaoVien = gv.tengiaovien;
            }
        });
        canbohds.map((cbhd) => {
            if (cbhd.macanbo == tttt.macanbohuongdan) {
                ThongTinCanBoHD = cbhd.tencanbo;
            }
        });
        congtys.map((ct) => {
            if (ct.macongty == tttt.macongty) {
                ThongTinCongTy = {
                    tencongty: ct.tencongty,
                    vitrithuctap: ct.vitrithuctap,
                };
            }
        });
        var temptengiaovien = '';
        if (tttt.magiaovien == 'chưa gán') {
            temptengiaovien = 'chưa gán';
        } else {
            temptengiaovien = ThongTinGiaoVien;
        }
        tblThucTap.push({
            _id: tttt._id,
            mathuctap: tttt.mathuctap,
            tensinhvien: ThongTinSinhVien,
            tengiaovien: temptengiaovien,
            tencanbo: ThongTinCanBoHD,
            tencongty: ThongTinCongTy.tencongty,
            trangthaidon: tttt.trangthaidon,
            noidungthuctap: tttt.noidungthuctap,
            dotthuctap: tttt.loai,
        });
    });
    const ERORR = (event, dtt) => {
        alert('Chức năng chưa thiết lập xong ');
    };
    const DuyetToanBo = (event, dtt) => {
        const updatedData = [];
        tblThucTap.map((ttt) => {
            if (ttt.trangthaidon == 'Chưa duyệt') {
                console.log(ttt);
            }
        });
    };
    // function duyettatca() {
    //     const updatedData = [];
    //     tblThucTap.map(ttt => {
    //         if(ttt.trangthaidon == 'Chưa duyệt') {
    //             Giaoviens.map(gv => {
    //                 updatedData.push( {
    //                     trangthaidon: 'Đã duyệt',
    //                     magiaovien: gv.magiaovien
    //                 });
    //             })
    //             updatedData.map( data => {
    //             axios
    //                 .put(
    //                     `${port}/teacher/duyetdonthuctap/${_IdDonThucTap}`,
    //                     data,
    //                 )
    //                 .then((response) => {
    //                     console.log('Dữ liệu sau khi cập nhật:', response.data);
    //                     alert('Duyệt đơn thành công');
    //                 })
    //                 .catch((error) => {
    //                     alert('Duyệt đơn thất bại');
    //                     console.error('Lỗi cập nhật dữ liệu:', error);
    //                 });
    //                 const dataToadd2 = {
    //                     trangthaisinhvien: 'Đã được duyệt',
    //                 };
    //                 axios
    //                     .put(`${port}/student/capnhattrangthai/${ThongTinSinhVien._id}`, dataToadd2)
    //                     .then((response) => {
    //                         console.log(response);
    //                     })
    //                     .catch((error) => {
    //                         console.error('Lỗi khi thêm dữ liệu sinh vien:', error);
    //                     });
    //             var DateNow = new Date();
    //             var ThongBao = {
    //                 thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
    //                 thongbaosinhvien: `Đơn thực tập của bạn đã được người phê duyệt với giao viên hướng dẫn là ${ThongTinGiaoVien.tengiaovien} `,
    //                 thongbaogiaovien: `Bạn được phân công hướng dẫn sinh viên ${tblThucTap.tensinhvien}`,
    //             };
    //             axios
    //                 .post(`${port}/teacher/themthongbao`, ThongBao)
    //                 .then((response) => {
    //                     console.log(response);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Lỗi khi thêm dữ liệu:', error);
    //                 });
    //             })

    //         }
    //     })
    // }
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
                            <li id="thuctap" className="click">
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
                    <span id="route">/Quản lý thực tập</span>
                </div>
                <div className="content">
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">Đơn đăng ký thực tập</h1>
                        <div className="danhsachdondangky">
                            <button className="icon_dotthuctap" onClick={ERORR}>
                                {' '}
                                <MdDoneAll className="icon_button" />
                                Duyệt toàn bộ
                            </button>
                            <table>
                                <thead>
                                    <tr className="tieude_table">
                                        <th id="stt">STT</th>
                                        <th id="tensinhvien">Đợt thực tập</th>
                                        <th id="tensinhvien">Tên sinh viên</th>
                                        <th id="tensinhvien">
                                            Giáo viên hướng dẫn
                                        </th>
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
                                        return (
                                            <Link
                                                to={`/admin/quanlythuctap/thongtindangky/duyetdonthuctap?mathuctap=${dtt.mathuctap}&id=${dtt._id}&taikhoan=${taikhoan}`}
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
                                                        {dtt.tengiaovien}
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
