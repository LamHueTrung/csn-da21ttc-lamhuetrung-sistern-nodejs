import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import React from 'react';
import './App.css';
import Login from '../src/Login';
import Index from '../src/home';
import XulyLogin from '../src/xulylogin';
import Tintuc from '../src/pages/Student/tintuc';
import Thuctap from '../src/pages/Student/thuctap';
import DonThuctap from '../src/pages/Student/dondangky';
import Thongtin from '../src/pages/Student/thontintaikhoan';
import TintucCT from '../src/pages/Company/tintuc';
import Dangkythuctap from '../src/pages/Company/dangkythuctap';
import Danhsachdangky from '../src/pages/Company/danhsachdangky';
import Danhsachcanbo from '../src/pages/Company/canbohuongdan';
import TintucGV from '../src/pages/Teacher/tintuc';
import Thongtindangky from '../src/pages/Teacher/thongtindangky';
import Quanlythuctap from '../src/pages/Teacher/quanlythuctap';
import Sinhvien from '../src/pages/Teacher/sinhvien';
import Giaovien from '../src/pages/Teacher/giaovien';
import Congty from '../src/pages/Teacher/congty';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/student/",
    element:<Login />,
    
  },
  {
    path: "/student/:slug",
    element:<XulyLogin />,
    
  },
  {
    path: "/teacher",
    element:<Login />,
    
  },
  {
    path: "/teacher/:slug",
    element:<XulyLogin />,
    
  },
  {
    path: "/company",
    element:<Login />,
    
  },
  {
    path: "/company/:slug",
    element:<XulyLogin />,
    
  },
  {
    path: "/student/thongtintaikhoan",
    element: <Thongtin />,
  },
  {
    path: "/student/tintuc",
    element: <Tintuc />,
  },
  {
    path: "/student/dondangky",
    element: <DonThuctap />,
  },
  {
    path: "/student/thuctap",
    element: <Thuctap />,
  },
  {
    path: "/teacher/quanlythuctap",
    element: <Quanlythuctap />,
  },
  {
    path: "/teacher/tintuc",
    element: <TintucGV />,
  },
  {
    path: "/teacher/quanlythuctap/thongtindangky/",
    element: <Thongtindangky />,
  },
  {
    path: "/teacher/sinhvien",
    element: <Sinhvien />,
  },
  {
    path: "/teacher/giaovien",
    element: <Giaovien />,
  },
  {
    path: "/teacher/congty",
    element: <Congty />,
  },
  {
    path: "/company/dangkythuctap",
    element: <Dangkythuctap />,
  },
  {
    path: "/company/tintuc",
    element: <TintucCT />,
  },
  {
    path: "/company/danhsachdangky",
    element: <Danhsachdangky />,
  },
  {
    path: "/company/canbohuongdan",
    element: <Danhsachcanbo />,
  },
  
]);
function App() {
  return (
    <div className="App">
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
