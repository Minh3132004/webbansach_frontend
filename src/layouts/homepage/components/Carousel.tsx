import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { lay3QuyenSachMoiNhat } from "../../../api/SachAPI";
import CarouselItem from "./CarouselItem";

const Carousel : React.FC = () => {

    const [danhSachSach , setDanhSachSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);

    useEffect(()=> {
            lay3QuyenSachMoiNhat()
                .then(danhSachSachData => {setDanhSachSach(danhSachSachData.ketQua) ; setDangTaiDuLieu(false)})
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
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <CarouselItem sach = {danhSachSach[0]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem sach = {danhSachSach[1]} />
                    </div>
                    <div className="carousel-item " data-bs-interval="10000">
                        <CarouselItem sach = {danhSachSach[2]} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carousel;