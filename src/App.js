import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter, 
  Route
} from "react-router-dom";
import React from 'react';
import './App.css';
import Login from '../src/Login';
import Index from '../src/home';
import XulyLogin from '../src/xulylogin';
import Tintuc from '../src/pages/Student/tintuc';
import Thuctap from '../src/pages/Student/thuctap';
import DonThuctap from '../src/pages/Student/dondangky';
import TintucCT from '../src/pages/Company/tintuc';
import Dangkythuctap from '../src/pages/Company/dangkythuctap';
import Danhsachdangky from '../src/pages/Company/danhsachdangky';
import Danhsachcanbo from '../src/pages/Company/canbohuongdan';
import TintucAD from '../src/pages/Admin/tintuc';
import Thongtindangky from '../src/pages/Admin/thongtindangky';
import Quanlythuctap from '../src/pages/Admin/quanlythuctap';
import Sinhvien from '../src/pages/Admin/sinhvien';
import Giaovien from '../src/pages/Admin/giaovien';
import Congty from '../src/pages/Admin/congty';
import TintucGV from '../src/pages/Teacher/tintuc';
import SinhvienDangKyGV from '../src/pages/Teacher/sinhvien';
import DonThucTapGV from '../src/pages/Teacher/quanlythuctap';
import ThongTinDangKyGV from '../src/pages/Teacher/thongtindangky';



const router = createBrowserRouter([
  {
    path: "/admin/quanlythuctap/:slug",
    element: <Quanlythuctap />,
  },
  {
    path: "/admin/congty/:slug",
    element: <Congty />,
  },
  {
    path: "/admin/quanlythuctap/thongtindangky/:slug",
    element: <Thongtindangky />,
  },
  {
    path: "/admin/sinhvien/:slug",
    element: <Sinhvien />,
  },
  {
    path: "/admin/giaovien/:slug",
    element: <Giaovien />,
  },
  {
    path: "/admin/tintuc/:slug",
    element: <TintucAD />,
  },
  {
    path: "/admin",
    element:<Login />,
  },
  {
    path: "/teacher/quanlythuctap/:slug",
    element: <DonThucTapGV />,
  },
  {
    path: "/teacher/quanlythuctap/thongtindangky",
    element: <ThongTinDangKyGV />,
  },
  {
    path: "/teacher/sinhvien/:slug",
    element: <SinhvienDangKyGV />,
  },
  {
    path: "/teacher/tintuc/:slug",
    element: <TintucGV />,
  },
  {
    path: "/teacher",
    element:<Login />,
    
  },
  {
    path: "/company/tintuc/:slug",
    element: <TintucCT />,
  },
  {
    path: "/company/dangkythuctap/:slug",
    element: <Dangkythuctap />,
  },
  {
    path: "/company/danhsachdangky/:slug",
    element: <Danhsachdangky />,
  },
  {
    path: "/company/canbohuongdan/:slug",
    element: <Danhsachcanbo />,
  },
  
  {
    path: "/company",
    element:<Login />,
    
  },
  {
    path: "/student/tintuc/:slug",
    element: <Tintuc />,
  },
  {
    path: "/student/dondangky/:slug",
    element: <DonThuctap />,
  },
  {
    path: "/student/thuctap/:slug",
    element: <Thuctap />,
  },
  {
    path: "/student/tintuc/:slug",
    element: <Tintuc />
  },
  {
    path: "/xuly/",
    element:<XulyLogin />,
    
  },
  {
    path: "/student",
    element:<Login />,
    
  },
  {
    path: "/",
    element: <Index />
  },
]);
function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
