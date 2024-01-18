import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { LiaUserCogSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { CiSettings } from 'react-icons/ci';
import { ImCancelCircle } from 'react-icons/im';
import { format } from 'date-fns';
import port from '../../port';
import '../../css/student.css';
import '../../css/base.css';
function Thuctap() {
    const [thuctaps, setthuctap] = useState([]);
    const [canbohds, setCanBoHD] = useState([]);
    const [congtys, setCongTy] = useState([]);
    const [Giaoviens, setGiaoviens] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const [BaoCaos, setBaoCaos] = useState([]);
    const [Dotthuctaps, setDotthuctaps] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const taikhoan = urlParams.get('taikhoan');

    useEffect(() => {
        axios
            .get(`${port}/admin/danhsachdotthuctap`)
            .then((response) => setDotthuctaps(response.data))
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
    useEffect(() => {
        axios
            .get(`${port}/student/thongtinbaocao`)
            .then((response) => setBaoCaos(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    var ThongTinSinhVien = {};
    sinhViens.map((sv) => {
        if (sv.email == taikhoan) {
            ThongTinSinhVien = {
                _id: sv._id,
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
                sotuan: tttt.sotuan,
                loai: tttt.loai,
            };
        }
    });

    useEffect(() => {
        axios
            .get(`${port}/student/donthuctap`)
            .then((response) => setthuctap(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    var hannop = '';
    thuctaps.map((tt) => {
        if (tt.mathuctap == tblThucTap.mathuctap) {
            ThongTinThucTap = {
                ngaybatdau: tt.ngaybatdau,
                ngayketthuc: tt.ngayketthuc,
                sobuoi: tt.sobuoi,
                sotuan: tt.sotuan,
                trangthaidon: tt.trangthaidon,
                noidungthuctap: tt.noidungthuctap,
            };
            hannop = ThongTinThucTap.ngaybatdau.split('/');
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
        } else {
            ThongTinGiaoVien = {
                hoten: 'Chưa phân công',
                email: 'Chưa có',
                chucvu: 'Chưa có',
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
                macanbo: cbhd.macanbo,
                macongty: cbhd.macongty,
                tencanbo: cbhd.tencanbo,
                sotaikhoan: cbhd.sotaikhoan,
                sodienthoai: cbhd.sodienthoai,
            };
        }
    });

    //lấy thong tin cong ty từ macongty trong tblThuctap
    var ThongTinCongTy = {};
    var ArrSoTuan = [];
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
                sodienthoai: ct.sodienthoai,
                diachi: ct.diachi,
            };
        }
    });
    if (ThongTinThucTap.trangthaidon == 'Đã duyệt') {
        const baocaotiendo = document.querySelector('.baocaotiendo');
        const baocaotongket = document.querySelector('.baocaotongket');
        const nutbam = document.querySelector('.nutbam');
        baocaotongket.classList.remove('close');
        baocaotiendo.classList.remove('close');
        nutbam.classList.remove('close');
    }
    function openMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.add('openMenu');
    }
    function closeMenu() {
        const Navbar = document.querySelector('.Navbar');
        Navbar.classList.remove('openMenu');
    }
    var ngay = parseInt(hannop[0]);
    var thang = parseInt(hannop[1]);
    var nam = parseInt(hannop[2]);
    for (let i = 1; i <= tblThucTap.sotuan; i++) {
        ngay = ngay + 7;
        ArrSoTuan.push({
            tuan: i,
            hannop: ngay + '/' + thang + '/' + nam,
        });

        switch (thang) {
            case (1, 3, 5, 7, 8, 10, 12):
                if (ngay > 31) {
                    thang = thang + 1;
                    ngay = 1;
                }
            case 2:
                if (nam % 4 == 0) {
                    if (nam % 100 == 0 && nam % 400 == 0) {
                        if (ngay > 29) {
                            thang = thang + 1;
                            ngay = 1;
                        }
                    }
                }
            default:
                if (ngay > 30) {
                    thang = thang + 1;
                    ngay = 1;
                }
        }
        if (thang > 12) {
            nam = nam + 1;
            thang = 1;
        }
    }
    var defaulHanNop = ArrSoTuan[0];
    var hannop = document.querySelector('.hannop');
    var tuanthuctap;
    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        if (file.type !== 'application/pdf') {
            alert('Chỉ được upload file PDF!');
            event.target.value = '';
        } else {
            setSelectedFile(file);
        }
    };

    const handleUploadFile = async () => {
        if (document.getElementById('fileBaoCao').value == '') {
            alert('Bạn chưa chọn file để nộp');
        } else {
            var tuanthuctap_kt = document.getElementById('tuanthuctap').value;
            var trangthai_kt =
                document.getElementById('trangthaibaocao').textContent;
            var alert_nopbai = 0;
            BaoCaos.map((baocaosinhvien) => {
                if (baocaosinhvien.mathuctap == tblThucTap.mathuctap) {
                    if (
                        baocaosinhvien.trangthai == trangthai_kt &&
                        baocaosinhvien.tuan == tuanthuctap_kt
                    ) {
                        alert_nopbai = 1;
                    }
                }
            });
            if (alert_nopbai == 1) {
                alert(`Bạn đã nộp báo cáo tuần ${tuanthuctap_kt} `);
            } else {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('name', `${tblThucTap.mathuctap}.pdf`);
                try {
                    const response = await axios.post(
                        `${port}/api/upload`,
                        formData,
                    );
                    console.log('Upload thành công:', formData);
                } catch (error) {
                    console.error('Upload thất bại:', error);
                }
                var DateNow = new Date();
                const dataToAdd = {
                    mathuctap: tblThucTap.mathuctap,
                    filename: selectedFile.name,
                    tuan: document.querySelector('.tuanthuctap').value,
                    hannop: document.querySelector('.hannop').textContent,
                    ngaynop: format(DateNow, 'dd/MM/yyyy'),
                    trangthai: 'Đã nộp',
                };
                axios
                    .post(`${port}/student/baocao`, dataToAdd)
                    .then((response) => {
                        alert('Nộp báo cáo thành công');
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        console.error('Lỗi khi thêm dữ liệu:', error);
                    });
                const dataToadd2 = {
                    trangthaisinhvien: 'Đang thực tập',
                };
                axios
                    .put(
                        `${port}/student/capnhattrangthai/${ThongTinSinhVien._id}`,
                        dataToadd2,
                    )
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error('Lỗi khi thêm dữ liệu sinh vien:', error);
                    });
                var ThongBao = {
                    thoigian: format(DateNow, 'HH:mm:ss - dd/MM/yyyy'),
                    thongbaogiaovien: `${ThongTinSinhVien.hoten} vừa nộp báo cáo thực tập tuần ${dataToAdd.tuan}`,
                };
                axios
                    .post(`${port}/student/themthongbao`, ThongBao)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error('Lỗi khi thêm dữ liệu:', error);
                    });
                window.location.reload();
                navigate(`/student/thuctap/taikhoan?taikhoan=${taikhoan}`);
            }
        }
    };
    const handleUploadFileTongKet = async () => {
        if (document.getElementById('baocaotongket').value == '') {
            alert('Bạn chưa chọn file để nộp');
        } else {
            alert('Chức năng chưa cập nhật');
        }
    };
    var TrangthaiBaoCao = [];
    BaoCaos.map((bc) => {
        if (bc.mathuctap == tblThucTap.mathuctap) {
            TrangthaiBaoCao.push({
                trangthai: bc.trangthai,
                tuan: bc.tuan,
            });
        }
    });
    const ERORR = (event, dtt) => {
        alert('Chức năng chưa thiết lập xong ');
    };
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
                    <span id="route">
                        /{ThongTinSinhVien.hoten} /Chi tiết đơn thực tập{' '}
                    </span>
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
                                <span className="lable">Tên công ty</span>
                                <span className="info">
                                    {ThongTinCongTy.tencongty}
                                </span>
                            </li>
                            <li>
                                <span className="lable">
                                    Số điện thoại công ty
                                </span>
                                <span className="info">
                                    {ThongTinCongTy.sodienthoai}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Địa chỉ</span>
                                <span className="info">
                                    {ThongTinCongTy.diachi}
                                </span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Người phụ trách</span>
                                <span className="info">
                                    {ThongTinCanBoHD.tencanbo}
                                </span>
                            </li>
                            <li>
                                <span className="lable">
                                    Số điện thoại người phụ trách
                                </span>
                                <span className="info">
                                    {ThongTinCanBoHD.sodienthoai}
                                </span>
                            </li>
                            <li>
                                <span className="lable">Số tài khoản</span>
                                <span className="info">
                                    {ThongTinCanBoHD.sotaikhoan}
                                </span>
                            </li>
                        </ul>

                        <ul className="motacongty fullsize">
                            <li>
                                <span className="lable">
                                    Công việc thực tập
                                </span>
                                <textarea
                                    disabled
                                    id="noidungthuctap"
                                    className="fullsize_input description info "
                                    type="textbox"
                                    value={ThongTinThucTap.noidungthuctap}
                                />
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan">
                            <li>
                                <span className="lable">Đợt thực tập</span>
                                <span className="info">{tblThucTap.loai}</span>
                            </li>
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
                                <span className="lable">Số tuần</span>
                                <span className="info">
                                    {ThongTinThucTap.sotuan}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="thongtincanhan baocaotiendo close">
                        <h1 className="lable_chitiet">Báo cáo tuần</h1>

                        <select
                            className="tuanthuctap"
                            name=""
                            id="tuanthuctap"
                            onChange={(event) => {
                                tuanthuctap =
                                    document.getElementById(
                                        'tuanthuctap',
                                    ).value;
                                var hannop = document.querySelector('.hannop');
                                hannop.innerHTML =
                                    ArrSoTuan[tuanthuctap - 1].hannop;
                                var trangthaibaocao =
                                    document.querySelector('.trangthaibaocao');
                                var temp = 'Chưa nộp';
                                TrangthaiBaoCao.map((ttbc) => {
                                    if (
                                        ttbc.tuan ==
                                        document.querySelector('.tuanthuctap')
                                            .value
                                    ) {
                                        temp = ttbc.trangthai;
                                        console.log(ttbc.trangthai);
                                    }
                                });
                                trangthaibaocao.innerHTML = temp;
                            }}
                        >
                            {ArrSoTuan.map((tuan) => {
                                document.querySelector('.hannop').innerHTML =
                                    defaulHanNop.hannop;
                                return (
                                    <option value={tuan.tuan}>
                                        Tuần {tuan.tuan}
                                    </option>
                                );
                            })}
                        </select>
                        <ul className="thongtintaikhoan thongtinthuctap">
                            <li>
                                <span className="lable">Tình trạng nộp: </span>
                                <span
                                    className="info trangthaibaocao"
                                    id="trangthaibaocao"
                                ></span>
                            </li>
                            <li>
                                <span className="lable">Hạn nộp: </span>
                                <span className="info hannop"></span>
                            </li>
                        </ul>
                        <ul className="thongtintaikhoan nopbai">
                            <li>
                                <input
                                    id="fileBaoCao"
                                    className="fullsize_input"
                                    placeholder="Nội dung thực tập"
                                    type="file"
                                    onChange={handleChangeFile}
                                />
                            </li>

                            <button
                                onClick={handleUploadFile}
                                className="button_chinhsua"
                            >
                                Nộp bài
                            </button>
                        </ul>
                    </div>
                    <div className="thongtincanhan baocaotongket close">
                        <h1 className="lable_chitiet">Báo cáo tổng kết</h1>
                        <ul className="thongtintaikhoan nopbai">
                            <li>
                                <input
                                    id="baocaotongket"
                                    className="fullsize_input"
                                    type="file"
                                    placeholder="Nội dung thực tập"
                                    onChange={handleChangeFile}
                                />
                            </li>
                            <button
                                onClick={handleUploadFileTongKet}
                                className="button_chinhsua"
                            >
                                Nộp bài
                            </button>
                        </ul>
                    </div>
                    <div className="nutbam">
                        <button className="button_huy" onClick={ERORR}>
                            <ImCancelCircle className="icon_button" />
                            Hủy đơn đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thuctap;
