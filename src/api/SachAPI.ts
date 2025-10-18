import SachModel from "../models/SachModel";
import {my_request} from "./Request";

export async function layToanBoSach() : Promise<SachModel[]>{
    const ketQua : SachModel[] = [];

    //Xac dinh endpoint
    const endpoint :string = "http://localhost:8080/sach";

    //Goi phuong thuc request
    const response = await my_request(endpoint)

    //Lay ra json sach
    const responseData = response._embedded.saches;

    for(const key in responseData){
        const sachModel : SachModel = new SachModel(responseData[key].maSach, responseData[key].tenSach , responseData[key].tenTacGia , responseData[key].ISBN , responseData[key].moTa , responseData[key].giaNiemYet , responseData[key].giaBan , responseData[key].soLuong , responseData[key].trungBinhXepHang) ;
        ketQua.push(sachModel);
    }

    console.log(ketQua);

    return ketQua ;
}