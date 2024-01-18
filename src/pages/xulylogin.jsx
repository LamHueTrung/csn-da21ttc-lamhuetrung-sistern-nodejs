import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import port from '../port';
function XuLyLogin() {
    const [TaiKhoans, setTaiKhoans] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${port}/taikhoan/dangnhaptaikhoan`)
            .then((response) => setTaiKhoans(response.data))
            .catch((error) => {
                console.error('Lỗi react:', error);
            });
    }, []);
    var taiKhoan = '';
    var matKhau = '';
    var loaitaikhoanDN = '';
    const tkTrue = TaiKhoans.map((tk) => {
        if (tk.taikhoan == urlParams.get('taikhoan')) {
            taiKhoan = tk.taikhoan;
        }
    });
    const mkTrue = TaiKhoans.map((mk) => {
        if (mk.taikhoan == taiKhoan) {
            matKhau = mk.matkhau;
        }
    });
    const loaitaikhoan = TaiKhoans.map((ltk) => {
        if (ltk.taikhoan == taiKhoan) {
            loaitaikhoanDN = ltk.loaitaikhoan;
        }
    });
    if (urlParams.get('xuly') == 'dangnhap') {
        var kieutaikhoan = '';
        var src = '';

        if (
            taiKhoan == urlParams.get('taikhoan') &&
            matKhau == urlParams.get('matkhau')
        ) {
            if (loaitaikhoanDN == urlParams.get('loaitaikhoan')) {
                if (loaitaikhoanDN == 'sinhvien') {
                    src = 'student';
                    navigate(`/${src}/tintuc/taikhoan?taikhoan=${taiKhoan}`);
                } else if (loaitaikhoanDN == 'admin') {
                    src = 'admin';
                    navigate(`/${src}/tintuc/taikhoan?taikhoan=${taiKhoan}`);
                } else if (loaitaikhoanDN == 'giaovien') {
                    src = 'teacher';
                    navigate(`/${src}/thongtin/taikhoan?taikhoan=${taiKhoan}`);
                }
                alert('Đăng nhập thành công');
            } else {
                if (loaitaikhoanDN == 'sinhvien') {
                    kieutaikhoan = 'SINH VIÊN';
                } else if (loaitaikhoanDN == 'giaovien') {
                    kieutaikhoan = 'GIÁO VIÊN';
                }
                alert(`Tài khoản của bạn là tài khoản ${kieutaikhoan} `);
                navigate(`/`);
            }
        } else {
            if (urlParams.get('loaitaikhoan') == 'sinhvien') {
                src = 'student';
            } else if (urlParams.get('loaitaikhoan') == 'giaovien') {
                src = 'teacher';
            } else if (urlParams.get('loaitaikhoan') == 'congty') {
                src = 'company';
            }
            navigate(`/${src}/?loaitaikhoan=${urlParams.get('loaitaikhoan')}`);
            // alert("Tài khoản hoặc mật khẩu không chính xác");
        }
    }
    if (urlParams.get('xuly') == 'dangky') {
        var taiKhoanDaLuu = taiKhoan;
        var loaitaikhoanDK = urlParams.get('loaitaikhoan');
        const tensinhvien = urlParams.get('tensinhvien');
        const masinhvien = urlParams.get('masinhvien');
        const ngaysinh = urlParams.get('ngaysinh');
        const lop = urlParams.get('lop');
        const sodienthoai = urlParams.get('sodienthoai');

        const dataSV = {
            hoten: tensinhvien,
            masinhvien: masinhvien,
            ngaysinh: ngaysinh,
            email: urlParams.get('taikhoan'),
            lop: lop,
            sodienthoai: sodienthoai,
            trangthaisinhvien: 'Mới',
        };

        console.log(dataSV);
        const dataToAdd = {
            taikhoan: urlParams.get('taikhoan'),
            matkhau: urlParams.get('matkhau'),
            loaitaikhoan: urlParams.get('loaitaikhoan'),
        };
        if (urlParams.get('xuly') == 'dangky')
            if (urlParams.get('xuly') == 'dangky')
                if (taiKhoanDaLuu != dataToAdd.taikhoan)
                    if (taiKhoanDaLuu != dataToAdd.taikhoan) {
                        axios
                            .post(`${port}/taikhoan/dangkytaikhoan`, dataToAdd)
                            .then((response) => {
                                alert('Đăng ký thành công');
                                console.log(
                                    'Dữ liệu đã được thêm vào MongoDB:',
                                    response.data,
                                );
                            })
                            .catch((error) => {
                                console.error('Lỗi khi thêm dữ liệu:', error);
                            });
                    }
        if (loaitaikhoanDK == 'sinhvien') {
            axios
                .post(`${port}/student/themthongtin`, dataSV)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error('Lỗi khi thêm dữ liệu sinh vien:', error);
                });
            src = 'student';
        } else if (loaitaikhoanDK == 'giaovien') {
            src = 'teacher';
        }
        navigate(`/${src}/?loaitaikhoan=${loaitaikhoanDK}`);
    }
}

export default XuLyLogin;
