import React, {useEffect, useState} from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import {layToanBoAnhCuaMotSach} from "../../../api/HinhAnhAPI";
import { Carousel } from "react-responsive-carousel";

interface HinhAnhSanPham{
    maSach : number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {

    const maSach = props.maSach;


    const [danhSachHinhAnh , setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);

    const [hinhAnhDangChon , setHinhAnhDangChon] = useState<HinhAnhModel | null>(null);

    const chonAnh=(hinhAnh : HinhAnhModel) => {
        setHinhAnhDangChon(hinhAnh);
    }

    useEffect(()=> {
            layToanBoAnhCuaMotSach(maSach)
                .then(hinhAnhSachData => {
                    setDanhSachHinhAnh(hinhAnhSachData);
                    setDangTaiDuLieu(false);
                    if(hinhAnhSachData.length > 0){
                        setHinhAnhDangChon(hinhAnhSachData[0]);
                    }
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
        <div>
            <div className="text-center border rounded p-3 mb-3 bg-white shadow-sm" style={{minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img 
                    src={hinhAnhDangChon ? hinhAnhDangChon.duLieuAnh : require("../../../images/books/buongbodehanhphuc.jpg")} 
                    alt="Ảnh sản phẩm chính" 
                    className="img-fluid"
                    style={{maxHeight: '450px', maxWidth: '100%', objectFit: 'contain'}}
                />
            </div>
            <div className="row g-2">
                {danhSachHinhAnh.map((hinhAnh, index) => (
                    <div className="col-3" key={index}>
                        <div 
                            className={`border rounded overflow-hidden ${hinhAnhDangChon?.duLieuAnh === hinhAnh.duLieuAnh ? 'border-primary border-3' : ''}`}
                            style={{cursor: 'pointer'}}
                            onClick={() => chonAnh(hinhAnh)}
                        >
                            <img 
                                src={hinhAnh.duLieuAnh} 
                                alt={`Thumbnail ${index + 1}`}
                                className="img-fluid"
                                style={{width: '100%', height: '80px', objectFit: 'cover'}}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default HinhAnhSanPham;