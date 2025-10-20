
import { useEffect, useState } from "react";
import DanhGiaModel from "../../../models/DanhGiaModel";
import { layNguoiDungTheoDanhGia } from "../../../api/DanhGiaAPI";
import NguoiDung from "../../../models/NguoiDung";

interface DanhGiaItemProps {
    danhGia : DanhGiaModel;
}

const DanhGiaItem : React.FC<DanhGiaItemProps> = (props) => {
    const [nguoiDung , setNguoiDung] = useState<NguoiDung | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi , setBaoLoi] = useState(null);

    useEffect(()=> {
        layNguoiDungTheoDanhGia(props.danhGia.maDanhGia)
            .then(nguoiDungData => {
                setNguoiDung(nguoiDungData);
                setDangTaiDuLieu(false);
            }
            )
            .catch(error => setBaoLoi(error.message));
    },[props.danhGia.maDanhGia])

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
        <div className="card mb-3 shadow-sm hover-shadow transition">
            <div className="card-body">
                <div className="d-flex">
                    {/* Avatar người dùng - Hình tròn lớn bên trái */}
                    <div className="flex-shrink-0 me-3">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                             style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>
                            <i className="fas fa-user"></i>
                        </div>
                    </div>

                    {/* Phần nội dung đánh giá */}
                    <div className="flex-grow-1">
                        {/* Header: Tên người dùng và điểm */}
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h6 className="mb-0 fw-bold text-primary">
                                    {nguoiDung ? `${nguoiDung.hoDem} ${nguoiDung.ten}` : "Người dùng ẩn danh"}
                                </h6>
                                <small className="text-muted">Khách hàng đã mua sản phẩm</small>
                            </div>
                            
                            {/* Điểm và sao */}
                            <div className="text-end">
                                <div className="d-flex align-items-center">
                                    {/* Hiển thị sao */}
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} 
                                           className={`fas fa-star ${i < props.danhGia.diemXepHang ? 'text-warning' : 'text-muted'}`}
                                           style={{fontSize: '1rem'}}></i>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Nội dung nhận xét */}
                        <div className="mt-2">
                            <p className="mb-2 text-dark" style={{lineHeight: '1.6', fontSize: '0.95rem'}}>
                                <i className="fas fa-quote-left text-muted me-2" style={{fontSize: '0.8rem'}}></i>
                                {props.danhGia.nhanXet}
                                <i className="fas fa-quote-right text-muted ms-2" style={{fontSize: '0.8rem'}}></i>
                            </p>
                        </div>

                        {/* Badge xác minh */}
                        <div className="mt-2">
                            <span className="badge bg-success-subtle text-success border border-success">
                                <i className="fas fa-check-circle me-1"></i>
                                Đánh giá đã xác minh
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DanhGiaItem;