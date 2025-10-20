import DanhGiaModel from "../models/DanhGiaModel";
import NguoiDung from "../models/NguoiDung";
import { my_request } from "./Request";

async function layDanhGia(endpoint : string) : Promise<DanhGiaModel[]>{
    //Goi phuong thuc request
    const response = await my_request(endpoint)

    //Lay ra json sach
    const responseData = response._embedded.danhGias;

    const ketQua = responseData.map((danhGia : DanhGiaModel) => 
        new DanhGiaModel(
            danhGia.maDanhGia, 
            danhGia.diemXepHang, 
            danhGia.nhanXet)
    )

    console.log(ketQua);

    return ketQua ;

}

export async function layToanBoDanhGiaCuaMotSach(maSach : number) : Promise<DanhGiaModel[]>{

    //Xac dinh endpoint
    const endpoint :string = `http://localhost:8080/sach/${maSach}/danhSachDanhGia`;

    return layDanhGia(endpoint);
}

export async function layNguoiDungTheoDanhGia(maDanhGia : number) : Promise<NguoiDung> {
    const endpoint :string = `http://localhost:8080/danh-gia/${maDanhGia}/nguoiDung`;

    const response = await my_request(endpoint);

    const ketQua : NguoiDung = new NguoiDung(
        response.maNguoiDung,
        response.hoDem,
        response.ten,
        response.tenDangNhap,
        response.gioiTinh,
        response.email,
        response.soDienThoai,
        response.diaChiMuaHang,
        response.diaChiGiaoHang,
        response.matKhau
    )

    return ketQua;

}