import React, {useEffect, useState} from "react";
import SachModel from "../../models/SachModel";
import {layToanBoSach, timKiemSach} from "../../api/SachAPI";
import SachProps from "./component/SachProps";
import { PhanTrang } from "../utils/PhanTrang";

interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoaiNumber : number;
}

const DanhSachSanPham : React.FC<DanhSachSanPhamProps> = (props) => {

    const [danhSachQuyenSach , setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setSoSach] = useState(0);

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

    useEffect(()=> {
        if(props.tuKhoaTimKiem === '' && props.maTheLoaiNumber == 0){
        layToanBoSach(trangHienTai-1)
            .then(sachData => {setDanhSachQuyenSach(sachData.ketQua); setDangTaiDuLieu(false);setTongSoTrang(sachData.tongSoTrang)})
            .catch(error => setBaoLoi(error.message));
        }
        else{
            timKiemSach(props.tuKhoaTimKiem , props.maTheLoaiNumber)
                .then(sachData => {setDanhSachQuyenSach(sachData.ketQua); setDangTaiDuLieu(false);setTongSoTrang(sachData.tongSoTrang)})
                .catch(error => setBaoLoi(error.message));
        }
    },[trangHienTai , props.tuKhoaTimKiem , props.maTheLoaiNumber] //Chỉ gọi một lần
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

    if(danhSachQuyenSach.length === 0){
        return (
            <div>
                <h1>Không tìm thấy sách theo yêu cầu</h1>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {
                    danhSachQuyenSach.map((sach) => (
                        <SachProps key = {sach.maSach} sach = {sach} />
                    ))
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
        </div>
    );

}

export default DanhSachSanPham;