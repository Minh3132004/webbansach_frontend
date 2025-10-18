import {my_request} from "./Request";
import HinhAnhModel from "../models/HinhAnhModel";


export async function layToanBoAnhCuaMotSach(maSach : number) : Promise<HinhAnhModel[]>{
    const ketQua : HinhAnhModel[] = [];

    //Xac dinh endpoint
    const endpoint :string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

    //Goi phuong thuc request
    const response = await my_request(endpoint)

    //Lay ra json sach
    const responseData = response._embedded.hinhAnhs;

    for(const key in responseData){
        const hinhAnhModel : HinhAnhModel = new HinhAnhModel(responseData[key].maHinhAnh, responseData[key].tenHinhAnh , responseData[key].laIcon , responseData[key].duongDan , responseData[key].duLieuAnh) ;
        ketQua.push(hinhAnhModel);
    }

    console.log(ketQua);

    return ketQua ;
}