import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { GrNotification } from 'react-icons/gr';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { LiaUserCogSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { format } from 'date-fns';
import { AiOutlineHome } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import port from '../../port';
import '../../css/student.css';
import '../../css/company.css';
import '../../css/base.css';

function Thuctap() {
    const [canbohds, setCanBoHD] = useState([]);
    const [congtys, setCongTy] = useState([]);
    const [congviecs, setCongViec] = useState([]);
    const [Giaoviens, setGiaoviens] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const [Dotthuctaps, setDotthuctaps] = useState([]);
    const [thongtincongbos, setThongtincongbos] = useState([]);
    const [selectedTTCB, setSelectedTTCB] = useState(null);
    const url = window.location.search;
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    useEffect(() => {
        axios
            .get(`${port}/admin/danhsachdotthuctap`)
            .then((response) => setDotthuctaps(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
        axios
            .get(`${port}/admin/thongtincongbo`)
            .then((response) => setThongtincongbos(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
        axios
            .get(`${port}/company/danhsachcongty`)
            .then((response) => setCongTy(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
        axios
            .get(`${port}/teacher/danhsachgiaovien`)
            .then((response) => setGiaoviens(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
        axios
            .get(`${port}/student/danhsachsinhvien`)
            .then((response) => setSinhViens(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
        axios
            .get(`${port}/company/canbohuongdan`)
            .then((response) => setCanBoHD(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);

    var ThongTinSinhVien = {};
    sinhViens.map((sv) => {
        if (sv.email == taikhoan) {
            ThongTinSinhVien = {
                idsinhvien: sv._id,
                tensinhvien: sv.hoten,
                masinhvien: sv.masinhvien,
                ngaysinh: sv.ngaysinh,
                lop: sv.lop,
                sodienthoai: sv.sodienthoai,
                trangthaisinhvien: sv.trangthaisinhvien,
            };
        }
    });
    var MaDotThucTap_Defaul = '';
    Dotthuctaps.map((dtt) => {
        var LopDotthuctap = [];
        var AllLopThucTap = [];
        AllLopThucTap.push(dtt.danhsachlop.split(','));
        LopDotthuctap = [...new Set(AllLopThucTap.flat())];
        LopDotthuctap.map((ldtt2) => {
            if (ldtt2 == ThongTinSinhVien.lop) {
                MaDotThucTap_Defaul = dtt._id;
            }
        });
    });
    var ThongTinCongBo = [];
    var ThongTinDotThucTap = {};
    var ThongTinCongTyThucTap = {};
    var ThongTinCanBoHuongDan = {};

    thongtincongbos.map((ttcb) => {
        if (ttcb.madotthuctap == MaDotThucTap_Defaul) {
            Dotthuctaps.map((dtt) => {
                if (dtt._id == ttcb.madotthuctap) {
                    ThongTinDotThucTap = {
                        _id: dtt._id,
                        tendotthuctap: dtt.tendotthuctap,
                        ngaybatdau: dtt.ngaybatdau,
                        ngayketthuc: dtt.ngayketthuc,
                        danhsachlop: dtt.danhsachlop,
                        ghichu: dtt.ghichu,
                    };
                }
            });

            congtys.map((ct) => {
                if (ct.macongty == ttcb.macongty) {
                    ThongTinCongTyThucTap = {
                        macongty: ct.macongty,
                        tencongty: ct.tencongty,
                        diachi: ct.diachi,
                        macanbo: ct.macanbo,
                        sodienthoai: ct.sodienthoai,
                    };
                }
            });

            canbohds.map((cbhd) => {
                if (cbhd.macongty == ttcb.macongty) {
                    ThongTinCanBoHuongDan = {
                        macanbo: cbhd.macanbo,
                        tencanbo: cbhd.tencanbo,
                        sotaikhoan: cbhd.sotaikhoan,
                        sodienthoai: cbhd.sodienthoai,
                    };
                }
            });

            ThongTinCongBo.push({
                tendotthuctap: ThongTinDotThucTap.tendotthuctap,
                ngaybatdau: ThongTinDotThucTap.ngaybatdau,
                ngayketthuc: ThongTinDotThucTap.ngayketthuc,
                danhsachlop: ThongTinDotThucTap.danhsachlop,
                ghichu: ThongTinDotThucTap.ghichu,
                macongty: ThongTinCongTyThucTap.macongty,
                tencongty: ThongTinCongTyThucTap.tencongty,
                diachi: ThongTinCongTyThucTap.diachi,
                sodienthoaicongty: ThongTinCongTyThucTap.sodienthoai,
                macanbo: ThongTinCanBoHuongDan.macanbo,
                tencanbo: ThongTinCanBoHuongDan.tencanbo,
                sotaikhoan: ThongTinCanBoHuongDan.sotaikhoan,
                sodienthoaicanbo: ThongTinCanBoHuongDan.sodienthoai,
                congviecthuctap: ttcb.congviecthuctap,
                motacongviec: ttcb.ghichu,
            });
        }
    });
    const LOADING = () => setCongViec(ThongTinCongBo);
    const handleCongtyChange = (event, ttcb) => {
        const tencongty = document.querySelector('.info_tencongty');
        const diachi = document.querySelector('.info_diachi');
        const sodienthoai = document.querySelector('.info_sodienthoai');
        const tennguoiphutrach = document.querySelector('.tennguoiphutrach');
        const sotaikhoan = document.querySelector('.info_sotaikhoan');
        const motacongviec = document.querySelector('.info_motacongviec');
        const ghichu = document.querySelector('.info_ghichu');
        const dotthuctap = document.querySelector('.dotthuctap');
        const congviecthuctap = document.querySelector('.congviecthuctap');
        const ngaybatdau = document.querySelector('.ngaybatdau');
        const ngayketthuc = document.querySelector('.ngayketthuc');
        const sdtnguoiphutrach = document.querySelector('.sdt_nguoiphutrach');
        const email_nguoiphutrach = document.querySelector(
            '.email_nguoiphutrach',
        );
        if (event.target.checked) {
            setSelectedTTCB(ttcb);
            tencongty.textContent = ttcb.tencongty;
            diachi.textContent = ttcb.diachi;
            sodienthoai.textContent = ttcb.sodienthoaicongty;
            tennguoiphutrach.textContent = ttcb.tencanbo;
            sdtnguoiphutrach.textContent = ttcb.sodienthoaicanbo;
            sotaikhoan.textContent = ttcb.sotaikhoan;
            motacongviec.textContent = ttcb.motacongviec;
            dotthuctap.textContent = ttcb.tendotthuctap;
            ngaybatdau.textContent = ttcb.ngaybatdau;
            ngayketthuc.textContent = ttcb.ngayketthuc;
            ghichu.textContent = ttcb.ghichu;
            ghichu.textContent = ttcb.ghichu;
            congviecthuctap.textContent = ttcb.congviecthuctap;
        } else {
            setSelectedTTCB(null);
        }
    };
    function dang_ky_thuc_tap() {
        const congviecthuctap_KT =
            document.getElementById('congviecthuctap').textContent;
        if (congviecthuctap_KT == '') {
            alert('Bạn chưa chọn chương trình thực tập');
            navigate(`/student/dondangky/taikhoan?taikhoan=${taikhoan}`);
        } else {
            if (
                ThongTinSinhVien.trangthaisinhvien == 'Đã đăng ký' ||
                ThongTinSinhVien.trangthaisinhvien == 'Đã được duyệt' ||
                ThongTinSinhVien.trangthaisinhvien == 'Đang thực tập'
            ) {
                alert(`Sinh viên ${ThongTinSinhVien.trangthaisinhvien}`);
                navigate(`/student/thuctap/taikhoan?taikhoan=${taikhoan}`);
            } else {
                var tuanbatdau = document
                    .getElementById('ngaybatdau')
                    .textContent.split('/');
                var tuanketthuc = document
                    .getElementById('ngayketthuc')
                    .textContent.split('/');
                var ngaydb = parseInt(tuanbatdau[0]);
                var thangdb = parseInt(tuanbatdau[1]);
                var namdb = parseInt(tuanbatdau[2]);
                var ngaykt = parseInt(tuanketthuc[0]);
                var thangkt = parseInt(tuanketthuc[1]);
                var namkt = parseInt(tuanketthuc[2]);

                var tuan = 0;
                while (thangdb != thangkt) {
                    ngaydb = ngaydb + 7;
                    tuan = tuan + 1;
                    switch (thangdb) {
                        case (1, 3, 5, 7, 8, 10, 12):
                            if (ngaydb > 31) {
                                thangdb = thangdb + 1;
                                ngaydb = 1;
                            }
                        case 2:
                            if (namdb % 4 == 0) {
                                if (namdb % 100 == 0 && namdb % 400 == 0) {
                                    if (ngaydb > 29) {
                                        thangdb = thangdb + 1;
                                        ngaydb = 1;
                                    }
                                }
                            }
                        default:
                            if (ngaydb > 30) {
                                thangdb = thangdb + 1;
                                ngaydb = 1;
                            }
                    }
                    if (thangdb > 12) {
                        namdb = namdb + 1;
                        thangdb = 1;
                    }
                }
                const dataToAdd = {
                    trangthaidon: 'Chưa duyệt',
                    mathuctap: ThongTinSinhVien.idsinhvien,
                    idsinhvien: ThongTinSinhVien.idsinhvien,
                    masinhvien: ThongTinSinhVien.masinhvien,
                    loai: document.getElementById('dotthuctap').textContent,
                    magiaovien: 'chưa gán',
                    macongty: selectedTTCB.macongty,
                    macanbohuongdan: selectedTTCB.macanbo,
                    ngaybatdau:
                        document.getElementById('ngaybatdau').textContent,
                    ngayketthuc:
                        document.getElementById('ngayketthuc').textContent,
                    sotuan: tuan,
                    noidungthuctap:
                        document.getElementById('congviecthuctap').textContent,
                };

                axios
                    .post(`${port}/student/dangkythuctap`, dataToAdd)
                    .then((response) => {
                        alert('Đăng ký thực tập thành công, chờ xét duyệt');
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        console.error('Lỗi khi thêm dữ liệu:', error);
                    });

                var DateNow = new Date();
                var ThongBao = {
                    thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
                    thongbaoadmin: `${ThongTinSinhVien.tensinhvien} vừa đăng ký thực tập ${dataToAdd.loai}`,
                };
                axios
                    .post(`${port}/student/themthongbao`, ThongBao)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error('Lỗi khi thêm dữ liệu:', error);
                    });
                const dataToadd2 = {
                    trangthaisinhvien: 'Đã đăng ký',
                };
                axios
                    .put(
                        `${port}/student/capnhattrangthai/${dataToAdd.idsinhvien}`,
                        dataToadd2,
                    )
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error('Lỗi khi thêm dữ liệu sinh vien:', error);
                    });

                navigate(`/student/thuctap/taikhoan?taikhoan=${taikhoan}`);
            }
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
                            <li id="thuctap" className="click">
                                <LiaUserCogSolid className="icon" />
                                Đăng ký thực tập
                            </li>
                        </a>
                    </Link>
                    <Link to={`/student/thuctap/taikhoan?taikhoan=${taikhoan}`}>
                        <a href="">
                            <li id="thuctap">
                                <LiaUserCogSolid className="icon" />
                                Thực tập
                            </li>
                        </a>
                    </Link>
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
                    <span id="route">
                        /{ThongTinSinhVien.tensinhvien} /Đăng ký thực tập{' '}
                    </span>
                </div>
                <div id="dondangky" className="content">
                    <div className="thongtincanhan ">
                        <h1 className="lable_chitiet">Thông tin sinh viên</h1>
                        <ul className="thongtintaikhoan email_dangky">
                            <li className="thong_tin_email">
                                <span className="lable">Email sinh viên</span>
                                <span id="info_email" className="info">
                                    {taikhoan}
                                </span>
                            </li>
                            <li>
                                <input
                                    id="info_masinhvien"
                                    type="text"
                                    placeholder="Mã sinh viên"
                                    value={ThongTinSinhVien.masinhvien}
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    id="info_lop"
                                    placeholder="Lớp"
                                    value={ThongTinSinhVien.lop}
                                />
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan email_dangky">
                            <li>
                                <input
                                    type="text"
                                    id="info_hoten"
                                    placeholder="Họ tên"
                                    value={ThongTinSinhVien.tensinhvien}
                                />
                            </li>
                            <li>
                                <input
                                    id="info_ngaysinh"
                                    type="text"
                                    placeholder="Ngày sinh"
                                    value={ThongTinSinhVien.ngaysinh}
                                />
                            </li>
                            <li>
                                <input
                                    id="info_sodienthoai"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    value={ThongTinSinhVien.sodienthoai}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan">
                        <h1 className="lable_chitiet">
                            Lựa chọn công việc thực tập
                        </h1>
                        <ul className="thongtintaikhoan danhsachcongty">
                            <li className="hienthithongtin ">
                                <button
                                    className="button_search"
                                    onClick={LOADING}
                                >
                                    Hiển thị thông tin
                                </button>
                            </li>
                            <table>
                                <thead>
                                    <tr className="tieude_table">
                                        <th id="stt">STT</th>
                                        <th id="checked"></th>
                                        <th id="emailsinhvien">Đợt thực tập</th>
                                        <th id="emailsinhvien">
                                            Công việc thực tập
                                        </th>
                                        <th id="emailsinhvien">Tên công ty</th>
                                        <th id="admin_diachicongty">Địa chỉ</th>
                                        <th id="emailsinhvien">
                                            Số điện thoại
                                        </th>
                                        <th id="emailsinhvien">Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {congviecs.map((ttcb, index) => {
                                        return (
                                            <tr className="info">
                                                <th id="stt">{index + 1}</th>
                                                <th id="checked">
                                                    <input
                                                        id="choncongty"
                                                        checked={
                                                            selectedTTCB ===
                                                            ttcb
                                                        }
                                                        type="checkbox"
                                                        onChange={(event) =>
                                                            handleCongtyChange(
                                                                event,
                                                                ttcb,
                                                            )
                                                        }
                                                    />
                                                </th>
                                                <th id="emailsinhvien">
                                                    {ttcb.tendotthuctap}
                                                </th>
                                                <th id="emailsinhvien">
                                                    {ttcb.congviecthuctap}
                                                </th>
                                                <th id="emailsinhvien">
                                                    {ttcb.tencongty}
                                                </th>
                                                <th id="admin_diachicongty">
                                                    {ttcb.diachi}
                                                </th>
                                                <th id="emailsinhvien">
                                                    {ttcb.sodienthoaicongty}
                                                </th>
                                                <th id="emailsinhvien">
                                                    {ttcb.motacongviec}
                                                </th>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li className="close">
                                <span className="lable">Đợt thực tập</span>
                                <span
                                    className="info dotthuctap"
                                    id="dotthuctap"
                                ></span>
                            </li>
                            <li>
                                <span className="lable">
                                    Công việc thực tập
                                </span>
                                <span
                                    className="info congviecthuctap"
                                    id="congviecthuctap"
                                ></span>
                            </li>
                            <li>
                                <span className="lable">Ngày bắt đầu</span>
                                <span
                                    className="info ngaybatdau"
                                    id="ngaybatdau"
                                ></span>
                            </li>
                            <li>
                                <span className="lable">Ngày kết thúc</span>
                                <span
                                    className="info ngayketthuc"
                                    id="ngayketthuc"
                                ></span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Tên công ty</span>
                                <span
                                    className="info info_tencongty"
                                    id="tencongty"
                                ></span>
                            </li>
                            <li>
                                <span className="lable">Số điện thoại</span>
                                <span
                                    className="info info_sodienthoai"
                                    id="sodienthoaicongty"
                                ></span>
                            </li>
                            <li>
                                <span className="lable">Địa chỉ</span>
                                <span
                                    className="info info_diachi"
                                    id="diachicongty"
                                ></span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Người phụ trách</span>
                                <span
                                    className="info tennguoiphutrach"
                                    id="nguoiphutrach"
                                ></span>
                            </li>
                            <li>
                                <span className="lable">
                                    SDT người phụ trách
                                </span>
                                <span
                                    className="info sdt_nguoiphutrach"
                                    id="sdtnguoiphutrach"
                                ></span>
                            </li>
                            <li>
                                <span className="lable">Số tài khoản</span>
                                <span
                                    className="info info_sotaikhoan"
                                    id="stknguoiphutrach"
                                ></span>
                            </li>
                        </ul>
                        <ul className="motacongty fullsize">
                            <li>
                                <span className="lable">Mô tả công việc</span>
                                <textarea
                                    disabled
                                    id="motacongviec"
                                    className="fullsize_input description info info_motacongviec"
                                    type="textbox"
                                />
                            </li>
                        </ul>
                        <ul className="motacongty fullsize">
                            <li>
                                <span className="lable">Ghi chú</span>
                                <textarea
                                    disabled
                                    id="ghichu"
                                    className="fullsize_input description info info_ghichu"
                                    type="textbox"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="nutbam">
                        <button
                            className="button_luu"
                            onClick={dang_ky_thuc_tap}
                        >
                            <AiOutlineCheck className="icon_button" />
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thuctap;
