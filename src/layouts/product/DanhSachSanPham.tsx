import React, {useEffect, useState} from "react";
import SachModel from "../../models/SachModel";
import {layToanBoSach} from "../../api/SachAPI";
import SachProps from "./component/SachProps";

const DanhSachSanPham : React.FC = () => {

    const [danhSachQuyenSach , setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);


    useEffect(()=> {
        layToanBoSach()
            .then(sachData => {setDanhSachQuyenSach(sachData); setDangTaiDuLieu(false)})
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
        <div className="container">
            <div className="row mt-4">
                {
                    danhSachQuyenSach.map((sach) => (
                        <SachProps key = {sach.maSach} sach = {sach} />
                    ))
                }
            </div>
        </div>
    );

}

export default DanhSachSanPham;