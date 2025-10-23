import React, { useState } from "react";

const DangKyNguoiDung = () => {

    const [tenDangNhap, setTenDangNhap] = useState<string>("");
    const [matKhau, setMatKhau] = useState<string>("");
    const [hoDem, setHoDem] = useState<string>("");
    const [ten, setTen] = useState<string>("");
    const [gioiTinh, setGioiTinh] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [soDienThoai, setSoDienThoai] = useState<string>("");
    const [diaChiMuaHang, setDiaChiMuaHang] = useState<string>("");
    const [diaChiGiaoHang, setDiaChiGiaoHang] = useState<string>("");


    // Kiểm tra tên đăng nhập 
    const [loiTenDangNhap , setLoiTenDangNhap] = useState<string>("");


    const kiemTraTenDangNhap = async (tenDangNhap: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`;
        const response = await fetch (url);
        const data = await response.text();
        if(data === "true"){
            setLoiTenDangNhap("Tên đăng nhập đã tồn tại");
            return false;
        }else{
            setLoiTenDangNhap("");
            return true;
        }
    }

    const handleTenDangNhap = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTenDangNhap(event.target.value);
        return kiemTraTenDangNhap(event.target.value);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Kiểm tra email
    const [loiEmail , setLoiEmail] = useState<string>("");

    const kiemTraEmail = async (email: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`;
        const response = await fetch (url);
        const data = await response.text();
        if(data === "true"){
            setLoiEmail("Email đã tồn tại");
            return false;
        }else{
            setLoiEmail("");
            return true;
        }
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        return kiemTraEmail(event.target.value);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Kiểm tra mật khẩu 

    const [loiMatKhau , setLoiMatKhau] = useState<string>("");

    const kiemTraMatKhau = (matKhau: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if(!passwordRegex.test(matKhau)){
            setLoiMatKhau("Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt");
            return false ;
        }else{
            setLoiMatKhau("");
            return true ;
        }
    }

    const handleMatKhau = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhau(event.target.value);
        return kiemTraMatKhau(event.target.value);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Kiểm tra mật khẩu nhập lại

    const [matKhauNhapLai , setMatKhauNhapLai] = useState<string>("");
    const [loiMatKhauNhapLai , setLoiMatKhauNhapLai] = useState<string>("");

    const kiemTraMatKhauNhapLai = (matKhauNhapLai: string) => {
        if(matKhauNhapLai != matKhau){
            setLoiMatKhauNhapLai("Mật khẩu nhập lại không khớp");
            return false ;
        }else{
            setLoiMatKhauNhapLai("");
            return true;
        }
    }
    

    const handleMatKhauNhapLai = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhauNhapLai(event.target.value);
        return kiemTraMatKhauNhapLai(event.target.value);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [thongBaoDangKy , setThongBaoDangKy] = useState<string>("");
    const handleDangKy = async (e: React.FormEvent) => {

        //Xóa tất cả thông báo lỗi 
        setLoiTenDangNhap("");
        setLoiEmail("");
        setLoiMatKhau("");
        setLoiMatKhauNhapLai("");

        //Tránh click liên tục 
        e.preventDefault();

        //Kiểm tra các điều kiện
        const isKiemTraTenDangNhap = await kiemTraTenDangNhap(tenDangNhap);
        const isKiemTraEmail = await kiemTraEmail(email);
        const isKiemTraMatKhau = kiemTraMatKhau(matKhau);
        const isKiemTraMatKhauNhapLai = kiemTraMatKhauNhapLai(matKhauNhapLai);
        
        if(isKiemTraEmail && isKiemTraTenDangNhap && isKiemTraMatKhau && isKiemTraMatKhauNhapLai){
            const url = "http://localhost:8080/tai-khoan/dang-ky";
            try {
                const response = await fetch(url , 
                    {
                        method : 'POST',
                        headers: {
                            'Content-type':'application/json'
                        },
                        body : JSON.stringify({
                            tenDangNhap : tenDangNhap,
                            matKhau : matKhau,
                            hoDem : hoDem,
                            ten : ten,
                            gioiTinh : gioiTinh,
                            email : email,
                            soDienThoai : soDienThoai
                        })
                    }
                );

                if(response.ok){
                    setThongBaoDangKy("Đăng ký thành công");
                }
                else{
                    console.log(response.json());
                    setThongBaoDangKy("Đã xảy ra lỗi trong suốt quá trình đăng ký");
                }
            } catch (error) {
                setThongBaoDangKy("Đã xảy ra lỗi trong suốt quá trình đăng ký");
            }
        
        }
    }

    return (
        <div className="container">
            <div className="mt-5 text-center">
                <h1>Đăng ký người dùng</h1>
            </div>
            <div>
                <label>Tên đăng nhập : </label>
                <input type="text" placeholder="Tên đăng nhập" name="tenDangNhap" id="tenDangNhap" value={tenDangNhap} onChange={handleTenDangNhap}/>
                <span style={{color: "red"}}>{loiTenDangNhap}</span>
            </div>
            <div>
                <label>Email : </label>
                <input type="email" placeholder="Email" name="email" id="email" value={email} onChange={handleEmail}/>
                <span style={{color: "red"}}>{loiEmail}</span>
            </div>
            <div>
                <label>Mật khẩu : </label>
                <input type="password" placeholder="Mật khẩu" name="matKhau" id="matKhau" value={matKhau} onChange={handleMatKhau}/>
                <span style={{color: "red"}}>{loiMatKhau}</span>
            </div>
            <div>
                <label>Nhập lại mật khẩu : </label>
                <input type="password" placeholder="Nhập lại mật khẩu" name="matKhauNhapLai" id="matKhauNhapLai" value={matKhauNhapLai} onChange={handleMatKhauNhapLai}/>
                <span style={{color: "red"}}>{loiMatKhauNhapLai}</span>
            </div>
            <div>
                <label>Họ đệm : </label>
                <input type="text" placeholder="Họ đệm" name="hoDem" id="hoDem" value={hoDem} onChange={(e) => setHoDem(e.target.value)}/>
            </div>
            <div>
                <label>Tên : </label>
                <input type="text" placeholder="Tên" name="ten" id="ten" value={ten} onChange={(e) => setTen(e.target.value)}/>
            </div>
            <div>
                <label>
                    <input type="radio" name="gioiTinh" value="M" onChange={(e) => setGioiTinh(e.target.value)}/>Nam
                </label>
                <label>
                    <input type="radio" name="gioiTinh" value="F" onChange={(e) => setGioiTinh(e.target.value)}/>Nữ
                </label>
            </div>
            <div>
                <label>Số điện thoại : </label>
                <input type="text" placeholder="Số điện thoại" name="soDienThoai" id="soDienThoai" value={soDienThoai} onChange={(e) => setSoDienThoai(e.target.value)}/>
            </div>
            <div>
                <button type="submit" onClick={handleDangKy}>Đăng ký</button>
            </div>
            <div>
                <span style={{color: "green"}}>{thongBaoDangKy}</span>
            </div>
        </div>

    )
}

export default DangKyNguoiDung;
