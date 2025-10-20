import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import DanhSachSanPham from "../product/DanhSachSanPham";
import { useParams } from "react-router-dom";

interface HomePageProps {
    tuKhoaTimKiem: string;
}

function HomePage(props: HomePageProps) {

    //Lấy tham số từ URL
    const {maTheLoai} = useParams();
    
    let maTheLoaiNumber = 0;

    try {
        maTheLoaiNumber = parseInt(maTheLoai+'');
    } catch (error) {
        maTheLoaiNumber = 0;
        console.log("Error : "+error);
    }

    if(isNaN(maTheLoaiNumber)){
        maTheLoaiNumber = 0;
    }

    return (
        <div>
            <Banner/>
            <Carousel/>
            <DanhSachSanPham tuKhoaTimKiem={props.tuKhoaTimKiem} maTheLoaiNumber = {maTheLoaiNumber}/>
        </div>
    );
}

export default HomePage;