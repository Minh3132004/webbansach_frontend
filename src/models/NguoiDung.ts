class NguoiDung {
    maNguoiDung : number;
    hoDem : string;
    ten : string;
    tenDangNhap : string;
    gioiTinh : string;
    email : string;
    soDienThoai : string;
    diaChiMuaHang : string;
    diaChiGiaoHang : string;
    matKhau : string;

    constructor(maNguoiDung : number, hoDem : string, ten : string, tenDangNhap : string, gioiTinh : string, email : string, soDienThoai : string, diaChiMuaHang : string, diaChiGiaoHang : string, matKhau : string){
        this.maNguoiDung = maNguoiDung;
        this.hoDem = hoDem;
        this.ten = ten;
        this.tenDangNhap = tenDangNhap;
        this.gioiTinh = gioiTinh;
        this.email = email;
        this.soDienThoai = soDienThoai;
        this.diaChiMuaHang = diaChiMuaHang;
        this.diaChiGiaoHang = diaChiGiaoHang;
        this.matKhau = matKhau;
    }

}

export default NguoiDung;