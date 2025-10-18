import SachModel from "../models/SachModel";

async function request(endpoint:string){
    //Truy van den endpoint
    const response = await fetch(endpoint);

    //Neu bi tra ve loi
    if(!response.ok){
        throw new Error(response.statusText);
    }

    //Tra ve Json neu ok
    return response.json();
}

export async function layToanBoSach() : Promise<SachModel[]>{
    const ketQua : SachModel[] = [];

    //Xac dinh endpoint
    const endpoint :string = "http://localhost:8080/sach";

    //Goi phuong thuc request
    const response = await request(endpoint)

    //Lay ra json sach
    const responseData = response._embedded.saches;

    for(const key in responseData){
        const sachModel : SachModel = new SachModel(responseData[key].maSach, responseData[key].tenSach , responseData[key].tenTacGia , responseData[key].ISBN , responseData[key].moTa , responseData[key].giaNiemYet , responseData[key].giaBan , responseData[key].soLuong , responseData[key].trungBinhXepHang) ;
        ketQua.push(sachModel);
    }

    console.log(ketQua);

    return ketQua ;
}