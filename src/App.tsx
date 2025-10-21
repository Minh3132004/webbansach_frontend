import React, { useState } from 'react';
import './App.css';
import Navbar from "./layouts/header-footer/Navbar";
import Footer from "./layouts/header-footer/Footer";
import HomePage from "./layouts/homepage/HomePage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './layouts/about/about';
import ChitietSanPham from './layouts/product/ChiTietSanPham';
import DangKyNguoiDung from './user/DangKyNguoiDung';

function App() {
  
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState<string>("");

    return (
    <div className="App">
        <BrowserRouter>
            <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem}/>
            
            <Routes>
                <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem}/>}/>
                <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem}/>}/>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/sach/:maSach' element={<ChitietSanPham />}/>
                <Route path='/dang-ky' element={<DangKyNguoiDung/>}/>
            </Routes>

            <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
