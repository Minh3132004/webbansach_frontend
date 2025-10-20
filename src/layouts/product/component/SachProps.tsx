import React, {useEffect, useState} from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import {layToanBoAnhCuaMotSach} from "../../../api/HinhAnhAPI";
import { Link } from "react-router-dom";

interface SachPropsInterface{
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {

    const maSach = props.sach.maSach;

    const [danhSachHinhAnh , setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);


    useEffect(()=> {
            layToanBoAnhCuaMotSach(maSach)
                .then(hinhAnhSachData => {setDanhSachHinhAnh(hinhAnhSachData); setDangTaiDuLieu(false)})
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
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/sach/${props.sach.maSach}`}>
                <img
                    src={danhSachHinhAnh[0] ? danhSachHinhAnh[0].duLieuAnh : require("../../../images/books/buongbodehanhphuc.jpg")}
                    className="card-img-top"
                    alt={props.sach.tenSach}
                    style={{ height: '200px' }}
                />
                </Link>
                <div className="card-body">
                <Link to={`/sach/${props.sach.maSach}`} style={{textDecoration:'none' , color:'black'}}>
                    <h5 className="card-title">{props.sach.tenSach}</h5>
                </Link>
                    <p className="card-text">{props.sach.moTa}</p>
                    <div className="price">
                        <span className="original-price">
                            <del>{props.sach.giaNiemYet}</del>
                        </span>
                        <span className="discounted-price">
                            <strong>{props.sach.giaBan}</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SachProps;