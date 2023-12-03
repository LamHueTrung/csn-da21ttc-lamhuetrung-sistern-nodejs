import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { LiaUserCogSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import port from '../../port';
import '../../css/student.css';
import '../../css/base.css';

function Thuctap() {
    const [thuctaps, setthuctap] = useState([]);
    const [canbohds, setCanBoHD] = useState([]);
    const [congtys, setCongTy] = useState([]);
    const [Giaoviens, setGiaoviens] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    // lấy thông tin sinh viên từ tài khoản trên :slug
    useEffect(() => {
        axios
            .get(`${port}/student/danhsachsinhvien`)
            .then((response) => setSinhViens(response.data))
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

    //lấy thông tin đơn thực tập từ masinhvien trong taikhoan
    var ThongTinThucTap = {};
    var tblThucTap = {};
    const mathuctap = thuctaps.map((tttt) => {
        if (tttt.masinhvien == ThongTinSinhVien.masinhvien) {
            tblThucTap = {
                mathuctap: tttt.mathuctap,
                macongty: tttt.macongty,
                macanbo: tttt.macanbohuongdan,
                magiaovien: tttt.magiaovien,
            };
        }
    });
    console.log(tblThucTap);
    useEffect(() => {
        axios
            .get(`${port}/student/donthuctap`)
            .then((response) => setthuctap(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    thuctaps.map((tt) => {
        if (tt.mathuctap == tblThucTap.mathuctap) {
            ThongTinThucTap = {
                ngaybatdau: tt.ngaybatdau,
                ngayketthuc: tt.ngayketthuc,
                sobuoi: tt.sobuoi,
                sotuan: tt.sotuan,
                trangthaidon: tt.trangthaidon,
            };
        }
    });

    //lấy thông tin giáo viên từ magiaovien trong tblThucTap
    var ThongTinGiaoVien = {};
    useEffect(() => {
        axios
            .get(`${port}/teacher/danhsachgiaovien`)
            .then((response) => setGiaoviens(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    Giaoviens.map((gv) => {
        if (gv.magiaovien == tblThucTap.magiaovien) {
            ThongTinGiaoVien = {
                hoten: gv.tengiaovien,
                email: gv.email,
                chucvu: gv.chucvu,
            };
        }
    });

    //lấy thông tin người phụ trách từ manguoiphutrach trong tblThuctap
    var ThongTinCanBoHD = {};
    useEffect(() => {
        axios
            .get(`${port}/company/canbohuongdan`)
            .then((response) => setCanBoHD(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    canbohds.map((cbhd) => {
        if (cbhd.macanbo == tblThucTap.macanbo) {
            ThongTinCanBoHD = {
                hoten: cbhd.tencanbo,
                email: cbhd.email,
                chucvu: cbhd.chucvu,
            };
        }
    });

    //lấy thong tin cong ty từ macongty trong tblThuctap
    var ThongTinCongTy = {};
    useEffect(() => {
        axios
            .get(`${port}/company/danhsachcongty`) // Điều chỉnh URL tương ứng với tuyến đường API
            .then((response) => setCongTy(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    congtys.map((ct) => {
        if (ct.macongty == tblThucTap.macongty) {
            ThongTinCongTy = {
                tencongty: ct.tencongty,
                email: ct.email,
                vitri: ct.vitri,
            };
        }
    });
    if (ThongTinThucTap.trangthaidon == 'Đã duyệt') {
        const baocaotiendo = document.querySelector('.baocaotiendo');
        const baocaotongket = document.querySelector('.baocaotongket');
        baocaotongket.classList.remove('close');
        baocaotiendo.classList.remove('close');
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
            <div className="Navbar navbarSinhVien">
                <ul id="navbar">
                    <a onClick={closeMenu}>
                        <li className="thongbao ">
                            <AiOutlineHome className="icon" />
                        </li>
                    </a>
                    <Link to={`/student/tintuc/taikhoan?taikhoan=${taikhoan}`}>
                        <a>
                            <li id="tintuc">
                                <HiOutlineNewspaper className="icon" />
                                Tin tức
                            </li>
                        </a>
                    </Link>
                    <Link
                        to={`/student/dondangky/taikhoan?taikhoan=${taikhoan}`}
                    >
                        <a href="">
                            <li id="thuctap">
                                <LiaUserCogSolid className="icon" />
                                Đăng ký thực tập
                            </li>
                        </a>
                    </Link>
                    <Link to={`/student/thuctap/taikhoan?taikhoan=${taikhoan}`}>
                        <a href="">
                            <li id="thuctap" className="click">
                                <LiaUserCogSolid className="icon" />
                                Thực tập
                            </li>
                        </a>
                    </Link>
                    {/* <Link to="/student/thongtintaikhoan"><a href=""><li id='thongtin' ><AiOutlineInfoCircle className='icon'/>Thông tin</li></a></Link> */}
                </ul>
                <Link to="/">
                    <a id="dangxuat" href="" className="dangxuatsinhvien">
                        <FiLogOut className="icon" />
                        Đăng xuất
                    </a>
                </Link>
            </div>
            <div className="data">
                <div className="header">
                    <AiOutlineHome className="icon" />
                    <span id="route">/Thực tập</span>
                </div>
                <div id="thongtinthuctap" className="content">
                    <div className="thongtincanhan ">
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Trạng thái đơn</span>
                                <span className="info">
                                    {ThongTinThucTap.trangthaidon}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">
                            Thông tin đơn thực tập
                        </h1>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Họ tên</span>
                                <span className="info">
                                    {ThongTinSinhVien.hoten}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Email sinh viên</span>
                                <span className="info">
                                    {ThongTinSinhVien.email}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Lớp</span>
                                <span className="info">
                                    {ThongTinSinhVien.lop}
                                </span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Giáo viên</span>
                                <span className="info">
                                    {ThongTinGiaoVien.hoten}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Email giáo viên</span>
                                <span className="info">
                                    {ThongTinGiaoVien.email}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Chức vụ</span>
                                <span className="info">
                                    {ThongTinGiaoVien.chucvu}
                                </span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Người phụ trách</span>
                                <span className="info">
                                    {ThongTinCanBoHD.hoten}
                                </span>
                            </li>
                            <li>
                                <span className="lable">
                                    Email người phụ trách
                                </span>
                                <span className="info">
                                    {ThongTinCanBoHD.email}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Chức vụ</span>
                                <span className="info">
                                    {ThongTinCanBoHD.chucvu}
                                </span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Tên công ty</span>
                                <span className="info">
                                    {ThongTinCongTy.tencongty}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Email công ty</span>
                                <span className="info">
                                    {ThongTinCongTy.email}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Nội dung thực tập</span>
                                <span className="info">
                                    {ThongTinCongTy.vitri}
                                </span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Ngày bắt đầu</span>
                                <span className="info">
                                    {ThongTinThucTap.ngaybatdau}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Ngày kết thúc</span>
                                <span className="info">
                                    {ThongTinThucTap.ngayketthuc}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Số buổi/tuần</span>
                                <span className="info">
                                    {ThongTinThucTap.sobuoi}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Số tuần</span>
                                <span className="info">
                                    {ThongTinThucTap.sotuan}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan baocaotiendo close">
                        <h1 className="lable_chitiet">Báo cáo tuần</h1>
                        <select className="tuanthuctap" name="" id="">
                            <option value="">Tuần 1</option>
                            <option value="">Tuần 2</option>
                            <option value="">Tuần 3</option>
                            <option value="">Tuần 4</option>
                        </select>
                        <ul className="thongtintaikhoan thongtinthuctap">
                            <li>
                                <span className="lable">Tình trạng nộp: </span>
                                <span className="info">Chưa nộp</span>
                            </li>
                            <li>
                                <span className="lable">Hạn nộp: </span>
                                <span className="info">01/11/2023</span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan nopbai">
                            <li>
                                <input
                                    className="fullsize_input"
                                    type="file"
                                    placeholder="Nội dung thực tập"
                                />
                            </li>
                            <button className="button_chinhsua">Nộp bài</button>
                        </ul>
                    </div>
                    <div className="thongtincanhan baocaotongket close">
                        <h1 className="lable_chitiet">Báo cáo tổng kết</h1>
                        <ul className="thongtintaikhoan nopbai">
                            <li>
                                <input
                                    className="fullsize_input"
                                    type="file"
                                    placeholder="Nội dung thực tập"
                                />
                            </li>
                            <button className="button_chinhsua">Nộp bài</button>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thuctap;
