import { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { lay1AnhCuaMotSach } from "../../../api/HinhAnhAPI";
import HinhAnhModel from "../../../models/HinhAnhModel";

interface CarouselItemProps {
    sach : SachModel;
}

const CarouselItem : React.FC<CarouselItemProps> = (props) => {

    const maSach = props.sach.maSach;

    const [danhSachHinhAnh , setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);

    useEffect(()=> {
            lay1AnhCuaMotSach(maSach)
                .then(anhData => {setDanhSachHinhAnh(anhData) ; setDangTaiDuLieu(false)})
                .catch(error => setBaoLoi(error.message));
            },[] //Chỉ gọi một lần
    )

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    return (
        <div className="row align-items-center">
                            <div className="col-5 text-center">
                                <img src={danhSachHinhAnh[0] ? danhSachHinhAnh[0].duLieuAnh : require("../../../images/books/buongbodehanhphuc.jpg")} className="float-end" style={{width:'150px'}} />
                            </div>
                            <div className="col-7">
                                <h5>{props.sach.tenSach}</h5>
                                <p>{props.sach.moTa}</p>
                            </div>
        </div>
    );
}

export default CarouselItem;
