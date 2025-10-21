import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import HinhAnhSanPham from "./component/HinhAnhSanPham";
import DanhGiaSanPham from "./component/DanhGiaSanPham";
import renderRating from "../utils/SaoXepHang";
import { BagFill } from "react-bootstrap-icons";



const ChitietSanPham: React.FC = () => {

    const {maSach} = useParams();

    let maSachNumber = 0;

    try {
        maSachNumber = parseInt(maSach+'');
    } catch (error) {
        maSachNumber = 0;
        console.log("Error : "+error);
    }

    if(isNaN(maSachNumber)){
        maSachNumber = 0;
    }

    const [sach , setSach] = useState<SachModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);
    const [soLuong , setSoLuong] = useState(1);

    const tangSoLuong = () => {
        if(sach && sach.soLuong && soLuong < sach.soLuong){
            setSoLuong(soLuong + 1);
        }
    }
    const giamSoLuong = () => {
        if(sach && sach.soLuong && soLuong > 1){
            setSoLuong(soLuong - 1);
        }
    }
    
    const handleSoLuong= (event: React.ChangeEvent<HTMLInputElement>) => {
        const soLuongNumber = parseInt(event.target.value);
        if(soLuongNumber >= 1 && sach && sach.soLuong && soLuongNumber <= sach.soLuong){
            setSoLuong(soLuongNumber);
        }
    }
    
    const handleMuaNgay = () => {
        
    
    }
    const handleThemVaoGioHang = () => {
        
    
    }

    useEffect(()=> {
            laySachTheoMaSach(maSachNumber)
                .then(sachData => {setSach(sachData); setDangTaiDuLieu(false)})
                .catch(error => {setBaoLoi(error.message); setDangTaiDuLieu(false)});
        },[maSachNumber] //Chỉ gọi một lần
    )

    if(dangTaiDuLieu){
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        )
    }
    if(baoLoi){
        return (
            <div>
                <h1>Gặp lỗi : {baoLoi}</h1>
            </div>
        )
    }

    if(!sach){
        return (
            <div>
                <h1>Không tìm thấy sách</h1>
            </div>
        )
    }

    return (
        <div className="container mt-4 mb-5">
            <div className="row">
                <div className="col-md-5">
                    <HinhAnhSanPham maSach = {sach.maSach} />
                </div>
                <div className="col-md-7">
                    <h2 className="mb-3">{sach.tenSach}</h2>
                    
                    <div className="d-flex align-items-center mb-3">
                        <span className="fs-5 fw-bold text-warning me-2">{sach.trungBinhXepHang}</span>
                        <div className="d-flex align-items-center">
                            {renderRating(sach.trungBinhXepHang || 0)}
                        </div>
                    </div>

                    <div className="mb-3">
                        <h3 className="text-danger fw-bold">{sach.giaBan?.toLocaleString('vi-VN')} VNĐ</h3>
                    </div>

                    <div className="col-4">
                        <div>
                            <div className="mb-2">Số lượng</div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-secondary" onClick={giamSoLuong}>-</button>
                                <input type="number" className="form-control text-center" onChange={handleSoLuong} value={soLuong} />
                                <button className="btn btn-outline-secondary" onClick={tangSoLuong}>+</button>
                            </div>
                            <span>
                                {
                                    <span>Số tiền tạm tính : {(soLuong * (sach.giaBan || 0)).toLocaleString('vi-VN')} VNĐ</span>
                                }
                            </span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h5 className="mb-2">Mô tả sản phẩm:</h5>
                        <p className="text-muted">{sach.moTa}</p>
                    </div>

                    <div className="border rounded p-3 bg-light">
                        <h5 className="mb-3">Đặt hàng</h5>
                        <div className="d-grid gap-2">
                            <button className="btn btn-danger btn-lg" onClick={handleMuaNgay}>
                                <BagFill className="me-2" />
                                Mua ngay
                            </button>
                            <button className="btn btn-danger btn-lg" onClick={handleThemVaoGioHang}>
                                <i className="fas fa-shopping-cart me-2"></i>
                                Thêm vào giỏ hàng
                            </button>
                            <button className="btn btn-outline-primary">
                                <i className="fas fa-heart me-2"></i>
                                Yêu thích
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mt-5">
                <div className="col-12">
                    <DanhGiaSanPham maSach = {sach.maSach} />
                </div>
            </div>
        </div>
    );
}
export default ChitietSanPham;