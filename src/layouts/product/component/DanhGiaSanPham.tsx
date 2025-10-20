import React, {useEffect, useState} from "react";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGiaModel";
import DanhGiaItem from "./DanhGiaItem";


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
                    danhSachDanhGia.map((danhGia) => (
                        <DanhGiaItem key={danhGia.maDanhGia} danhGia={danhGia} />
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