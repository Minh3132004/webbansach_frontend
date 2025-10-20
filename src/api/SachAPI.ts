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

export async function timKiemSach(tenSach : string , maTheLoaiNumber : number) : Promise<KetQuaInterface>{

    let endpoint :string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=0`;

    if(tenSach !== ""){
        endpoint = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach,desc&size=8&page=0&tenSach=${tenSach}`;
    }
    if (tenSach === '' && maTheLoaiNumber > 0){
        endpoint = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&maTheLoai=${maTheLoaiNumber}`;
    }
    if (tenSach !== '' && maTheLoaiNumber > 0){
        endpoint = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach,desc&size=8&page=0&tenSach=${tenSach}&maTheLoai=${maTheLoaiNumber}`;
    }

    return laySach(endpoint);
    
}

export async function laySachTheoMaSach(maSach : number) : Promise<SachModel | null>{

    const endpoint :string = `http://localhost:8080/sach/${maSach}`;

    let ketQua : SachModel;

    try {
        const response = await my_request(endpoint);

        if(!response || !response.maSach){
            throw new Error("Không tìm thấy sách");
        }

        ketQua = new SachModel(
            response.maSach,
            response.tenSach,
            response.tenTacGia,
            response.ISBN,
            response.moTa,
            response.giaNiemYet,
            response.giaBan,
            response.soLuong,
            response.trungBinhXepHang
        );
    
        return ketQua;
    } catch (error) {
        console.log(error);
        return null;
    }
}