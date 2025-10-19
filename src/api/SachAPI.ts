import SachModel from "../models/SachModel";
import {my_request} from "./Request";

async function laySach(endpoint : string) : Promise<SachModel[]> {
    const response = await my_request(endpoint);
    
    const responseData = response._embedded.saches;
    
    const ketQua: SachModel[] = responseData.map((sach: SachModel) => 
        new SachModel(
            sach.maSach,
            sach.tenSach,
            sach.tenTacGia,
            sach.ISBN,
            sach.moTa,
            sach.giaNiemYet,
            sach.giaBan,
            sach.soLuong,
            sach.trungBinhXepHang
        )
    );
    
    console.log(ketQua);
    
    return ketQua ;
}

export async function layToanBoSach() : Promise<SachModel[]>{

    //Xac dinh endpoint
    const endpoint :string = "http://localhost:8080/sach";

    return laySach(endpoint);
}

export async function lay3QuyenSachMoiNhat() : Promise<SachModel[]>{
    
    const endpoint :string = "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";

    return laySach(endpoint)
}