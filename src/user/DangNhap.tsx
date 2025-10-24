import { useState } from "react";

const DangNhap = () => {

    const [tenDangNhap, setTenDangNhap] = useState<string>("");
    const [matKhau, setMatKhau] = useState<string>("");
    const [thongBaoDangNhap, setThongBaoDangNhap] = useState<string>("");


    const handleTenDangNhap = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(event.target.value)
    }

    const handleMatKhau = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhau(event.target.value);
    }

    const handleDangNhap = async () => {
        const url = "http://localhost:8080/tai-khoan/dang-nhap";

        const loginRequest = {
            tenDangNhap: tenDangNhap,
            matKhau: matKhau
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                loginRequest
            )
        }).then(
            async (response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error(await response.text())
                }
            }
        ).then(
            (data) => {
                //Xử lý đăng nhập thành công 
                const { jwt } = data;
                //Lưu token vào localStorage hoặc cookie
                localStorage.setItem("token", jwt);
                //Điều hướng đến trang chính hoặc thực hiện các tác vụ khi đăng nhập thành công
                setThongBaoDangNhap("Đăng nhập thành công!");
            }
        ).catch(
            //Xử lý lỗi khi đăng nhập thất bại
            (error) => {
                console.log(error);
                setThongBaoDangNhap("Qua trinh dang nhap that bai");
            }
        )


    }

    return (
        <div>
            <input type="text" onChange={handleTenDangNhap} value={tenDangNhap} />
            <input type="text" onChange={handleMatKhau} value={matKhau} />
            <button onClick={handleDangNhap}>Dang nhap</button>
            <span style={{ color: "red" }}>{thongBaoDangNhap}</span>
        </div>
    )
}

export default DangNhap; 