import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const KichHoatTaiKhoan = () => {
    const [daKichHoat , setDaKichHoat] = useState<boolean>(false);
    const [loi , setLoi] = useState<string>("");
    const {email} = useParams();
    const {maKichHoat} = useParams();
    
    useEffect(() => {
        if(email && maKichHoat){
            ThucHienKichHoat();
        }
    }, []);

    const ThucHienKichHoat = async () => {
        const url = `http://localhost:8080/tai-khoan/kich-hoat?email=${email}&maKichHoat=${maKichHoat}`;

        try {
            const response = await fetch(url , { method: "GET" });
            if(response.ok){
                setDaKichHoat(true);
            }
            else{
                setLoi(await response.text() || "");
            }
        } catch (error) {
                console.log(error);
        }
    }

    return (
        <div>
            <h1>Kích hoạt tài khoản</h1>
            {
                daKichHoat ? (
                    <p>Tài khoản đã được kích hoạt thành công</p>
                ) : (
                    <p>{loi}</p>
                )
            }
        </div>
    )
}

export default KichHoatTaiKhoan;
