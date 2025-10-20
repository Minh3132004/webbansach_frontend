import React, {useEffect, useState} from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import {layToanBoAnhCuaMotSach} from "../../../api/HinhAnhAPI";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS cho carousel
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
        <div className="row">
            <div className="col-12">
                <Carousel showArrows={true} showIndicators={true} >
                    {
                        danhSachHinhAnh.map((hinhAnh, index)=>(
                            <div key={index}>
                                <img src={hinhAnh ? hinhAnh.duLieuAnh : require("../../../images/books/buongbodehanhphuc.jpg")} alt={`${hinhAnh.tenHinhAnh}`} style={{maxWidth:"1000px" , maxHeight:"1000px"}} />
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    );
}
export default HinhAnhSanPham;