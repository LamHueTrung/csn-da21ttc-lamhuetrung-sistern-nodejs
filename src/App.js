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
import TintucGV from '../src/pages/Teacher/tintuc';
import Thongtindangky from '../src/pages/Teacher/thongtindangky';
import Quanlythuctap from '../src/pages/Teacher/quanlythuctap';
import Sinhvien from '../src/pages/Teacher/sinhvien';
import Giaovien from '../src/pages/Teacher/giaovien';
import Congty from '../src/pages/Teacher/congty';


const router = createBrowserRouter([
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
    path: "/teacher",
    element:<Login />,
    
  },
  {
    path: "/teacher/xuly/",
    element:<XulyLogin />,
    
  },
  {
    path: "/teacher/quanlythuctap/:slug",
    element: <Quanlythuctap />,
  },
  {
    path: "/teacher/tintuc/:slug",
    element: <TintucGV />,
  },
  {
    path: "/teacher/quanlythuctap/thongtindangky/:slug",
    element: <Thongtindangky />,
  },
  {
    path: "/teacher/sinhvien/:slug",
    element: <Sinhvien />,
  },
  {
    path: "/teacher/giaovien/:slug",
    element: <Giaovien />,
  },
  {
    path: "/teacher/congty/:slug",
    element: <Congty />,
  },
  {
    path: "/company",
    element:<Login />,
    
  },
  {
    path: "/company/xuly/",
    element:<XulyLogin />,
    
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
    path: "/student/tintuc/:slug",
    element: <Tintuc />
  },
  {
    path: "/student/xuly/",
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
