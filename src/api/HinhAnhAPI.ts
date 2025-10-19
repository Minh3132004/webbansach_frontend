import {my_request} from "./Request";
import HinhAnhModel from "../models/HinhAnhModel";

async function layAnh(endpoint : string) : Promise<HinhAnhModel[]>{
    //Goi phuong thuc request
    const response = await my_request(endpoint)

    //Lay ra json sach
    const responseData = response._embedded.hinhAnhs;

    const ketQua = responseData.map((hinhAnh : HinhAnhModel) => 
        new HinhAnhModel(
            hinhAnh.maHinhAnh, 
            hinhAnh.tenHinhAnh, 
            hinhAnh.laIcon, 
            hinhAnh.duongDan, 
            hinhAnh.duLieuAnh)
    )

    console.log(ketQua);

    return ketQua ;

}

export async function layToanBoAnhCuaMotSach(maSach : number) : Promise<HinhAnhModel[]>{

    //Xac dinh endpoint
    const endpoint :string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

    return layAnh(endpoint);
}

export async function lay1AnhCuaMotSach(maSach : number) : Promise<HinhAnhModel[]>{
 
    const endpoint :string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1` ;

    return layAnh(endpoint);
}