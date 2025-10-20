import SachModel from "../models/SachModel";
import {my_request} from "./Request";

interface KetQuaInterface{
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}

async function laySach(endpoint : string) : Promise<KetQuaInterface> {
    const response = await my_request(endpoint);
    
    const responseData = response._embedded.saches;

    // lấy thông tin trang
    const tongSoTrang:number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;
    
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
    
    return {ketQua , tongSoTrang , tongSoSach} ;
}

export async function layToanBoSach(trang : number) : Promise<KetQuaInterface>{

    //Xac dinh endpoint
    const endpoint :string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trang}`;

    return laySach(endpoint);
}

export async function lay3QuyenSachMoiNhat() : Promise<KetQuaInterface>{
    
    const endpoint :string = "http://localhost:8080/sach?sort=maSach,desc&page=0&size=3";

    return laySach(endpoint)
}

export async function timKiemSach(tenSach : string) : Promise<KetQuaInterface>{

    let endpoint :string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;

    if(tenSach !== ""){
        endpoint = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=0&tenSach=${tenSach}`;
    }

    return laySach(endpoint);
    
}