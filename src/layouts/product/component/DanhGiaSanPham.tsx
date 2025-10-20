import React, {useEffect, useState} from "react";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGiaModel";


interface DanhGiaSanPham{
    maSach : number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {

    const maSach = props.maSach;


    const [danhSachDanhGia , setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);


    useEffect(()=> {
            layToanBoDanhGiaCuaMotSach(maSach)
                .then(danhGiaData => {
                    setDanhSachDanhGia(danhGiaData);
                    setDangTaiDuLieu(false);
                }
                )
                .catch(error => setBaoLoi(error.message));
        },[] //Chỉ gọi một lần
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

    return (        
            <div className="container mt-4 mb-4">
                <h3 className="mb-3">Đánh giá sản phẩm</h3>
                <hr/>
                {danhSachDanhGia.length > 0 ? (
                    danhSachDanhGia.map((danhGia, index) => (
                        <div className="row border-bottom py-3" key={index}>
                            <div className="col-2 text-center">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                                     style={{width: '60px', height: '60px'}}>
                                    <h4 className="mb-0">{danhGia.diemXepHang}</h4>
                                </div>
                                <div className="mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`fas fa-star ${i < danhGia.diemXepHang ? 'text-warning' : 'text-muted'}`}></i>
                                    ))}
                                </div>
                            </div>
                            <div className="col-10">
                                <p className="mb-0">{danhGia.nhanXet}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info">
                        Chưa có đánh giá nào cho sản phẩm này.
                    </div>
                )}
            </div>
    );
}
export default DanhGiaSanPham;