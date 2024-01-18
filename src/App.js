import {
    createBrowserRouter,
    RouterProvider,
    BrowserRouter,
    Route,
} from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from '../src/pages/Login';
import Index from '../src/pages/home';
import XulyLogin from '../src/pages/xulylogin';
import Tintuc from '../src/pages/Student/tintuc';
import Thuctap from '../src/pages/Student/thuctap';
import DonThuctap from '../src/pages/Student/dondangky';
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
import ThongTinGV from '../src/pages/Teacher/dangkythongtin';
import XemBaoCao from '../src/pages/Teacher/xembaocao';
import ThemCongTy from './pages/Admin/themcongty';
import DotThucTap from './pages/Admin/dotthuctap';
import QuanLyDotThucTap from './pages/Admin/quanlydotthuctap';
import ThemDotThucTap from './pages/Admin/themdulieuthuctap';
import SuaDotThucTap from './pages/Admin/thaydoidulieuthuctap';

const router = createBrowserRouter([
    {
        path: '/admin/quanlythuctap/:slug',
        element: <Quanlythuctap />,
    },
    {
        path: '/admin/themdotthuctap/:slug',
        element: <ThemDotThucTap />,
    },
    {
        path: '/admin/thaydoidotthuctap/:slug',
        element: <SuaDotThucTap />,
    },
    {
        path: '/admin/danhsachdotthuctap/:slug',
        element: <QuanLyDotThucTap />,
    },
    {
        path: '/admin/quanlydotthuctap/:slug',
        element: <DotThucTap />,
    },
    {
        path: '/admin/themcongty/:slug',
        element: <ThemCongTy />,
    },
    {
        path: '/admin/congty/:slug',
        element: <Congty />,
    },
    {
        path: '/admin/quanlythuctap/thongtindangky/:slug',
        element: <Thongtindangky />,
    },
    {
        path: '/admin/sinhvien/:slug',
        element: <Sinhvien />,
    },
    {
        path: '/admin/giaovien/:slug',
        element: <Giaovien />,
    },
    {
        path: '/admin/tintuc/:slug',
        element: <TintucAD />,
    },
    {
        path: '/admin',
        element: <Login />,
    },
    {
        path: '/teacher/quanlythuctap/:slug',
        element: <DonThucTapGV />,
    },
    {
        path: '/teacher/quanlythuctap/thongtindangky/:slug',
        element: <ThongTinDangKyGV />,
    },
    {
        path: '/teacher/quanlythuctap/xembaocao/:slug',
        element: <XemBaoCao />,
    },
    {
        path: '/teacher/sinhvien/:slug',
        element: <SinhvienDangKyGV />,
    },
    {
        path: '/teacher/thongtin/:slug',
        element: <ThongTinGV />,
    },
    {
        path: '/teacher/tintuc/:slug',
        element: <TintucGV />,
    },
    {
        path: '/teacher',
        element: <Login />,
    },
    {
        path: '/student/tintuc/:slug',
        element: <Tintuc />,
    },
    {
        path: '/student/dondangky/:slug',
        element: <DonThuctap />,
    },
    {
        path: '/student/thuctap/:slug',
        element: <Thuctap />,
    },
    {
        path: '/student/tintuc/:slug',
        element: <Tintuc />,
    },
    {
        path: '/xuly/',
        element: <XulyLogin />,
    },
    {
        path: '/student',
        element: <Login />,
    },
    {
        path: '/',
        element: <Index />,
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
