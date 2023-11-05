import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function XuLyLogin() {
    const [TaiKhoans, setTaiKhoans] = useState([]);
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const navigate = useNavigate();
 
    useEffect(() => {
        axios.get('http://localhost:3001/taikhoan/dangnhaptaikhoan') 
          .then((response) => setTaiKhoans(response.data))
          .catch((error) => {
            console.error('Lỗi react:', error);
          });
      }, []);
      var taiKhoan = "";
      var matKhau = "";
      var loaitaikhoanDN = "";
      const tkTrue = TaiKhoans.map(tk => {
          if (tk.taikhoan == urlParams.get("taikhoan"))
          {
              taiKhoan = tk.taikhoan;
          }
      });
      const mkTrue = TaiKhoans.map(mk => {
          if(mk.taikhoan == taiKhoan){
              matKhau = mk.matkhau;
          };
      });
      const loaitaikhoan = TaiKhoans.map(ltk => {
          if(ltk.taikhoan == taiKhoan){
              loaitaikhoanDN = ltk.loaitaikhoan
              ;
          };
      });
    if (urlParams.get("xuly") == "dangnhap")
        {
            var kieutaikhoan = "";
            var src = "";
        
            if (taiKhoan == urlParams.get("taikhoan") && matKhau == urlParams.get("matkhau"))
            {
                if(loaitaikhoanDN == urlParams.get("loaitaikhoan"))
                {
                    if(loaitaikhoanDN == 'sinhvien')
                    {
                        src = "student";
                    } else if(loaitaikhoanDN == 'giaovien')
                    {
                        src = "teacher";
                    } else if(loaitaikhoanDN == 'congty') 
                    {
                        src = "company";
                    }
                    navigate(`/${src}/tintuc/taikhoan?taikhoan=${taiKhoan}`);
                    alert("Đăng nhập thành công");
                } else {
                    if(loaitaikhoanDN == 'sinhvien')
                    {
                        kieutaikhoan = "SINH VIÊN";
                    } else if(loaitaikhoanDN == 'giaovien')
                    {
                        kieutaikhoan = "GIÁO VIÊN";
                    } else if(loaitaikhoanDN == 'congty') 
                    {
                        kieutaikhoan = "CÔNG TY";
                    }
                    alert(`Tài khoản của bạn là tài khoản ${kieutaikhoan} `);
                    navigate(`/`);
        
                }
            } else {
                if (loaitaikhoanDN == urlParams.get("loaitaikhoan")) {
                    if(loaitaikhoanDN == 'sinhvien')
                        {
                            src = "student";
                        } else if(loaitaikhoanDN == 'giaovien')
                        {
                            src = "teacher";
                        } else if(loaitaikhoanDN == 'congty') 
                        {
                            src = "company";
                        }
                        navigate(`/${src}/`);
                        alert(`Tài khoản hoặc mật khẩu nhập không chính xác`);
                }
            };
    } else 
    {
        var taiKhoanDaLuu = taiKhoan;
        var loaitaikhoanDK = urlParams.get("loaitaikhoan");
            const dataToAdd = {
                taikhoan: urlParams.get("taikhoan"),
                matkhau: urlParams.get("matkhau"),
                loaitaikhoan: urlParams.get("loaitaikhoan")
            };
            if(urlParams.get("xuly") == "dangky")
            {
                console.log(taiKhoanDaLuu != dataToAdd.taikhoan)
                if (taiKhoanDaLuu == dataToAdd.taikhoan)
                {
                    axios.post('http://localhost:3001/taikhoan/dangkytaikhoan', dataToAdd)
                    .then(response => {
                        console.log('Dữ liệu đã được thêm vào MongoDB:', response.data);
                    })
                    .catch(error => {
                        console.error('Lỗi khi thêm dữ liệu:', error);
                    });
                    alert("Đăng ký thành công");
                }
                if(loaitaikhoanDK == 'sinhvien')
                {
                    src = "student";
                } else if(loaitaikhoanDK == 'giaovien')
                {
                    src = "teacher";
                } else if(loaitaikhoanDK == 'congty') 
                {
                    src = "company";
                }
                navigate(`/${src}/?loaitaikhoan=${loaitaikhoanDK}`);
        }       
    }
            
}

export default XuLyLogin;