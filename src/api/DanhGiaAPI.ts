import DanhGiaModel from "../models/DanhGiaModel";
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
