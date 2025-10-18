
class HinhAnhModel{
    private maHinhAnh : number;
    private tenHinhAnh ?: string;
    private laIcon ?: boolean;
    private duongDan ?: string;
    private duLieuAnh ?: string;

    constructor(
         maHinhAnh : number,
     tenHinhAnh ?: string,
     laIcon ?: boolean,
     duongDan ?: string,
     duLieuAnh ?: string
    ) {
        this.maHinhAnh = maHinhAnh;
        this.tenHinhAnh = tenHinhAnh;
        this.laIcon = laIcon;
        this.duongDan = duongDan;
        this.duLieuAnh = duLieuAnh;
    }
}

export default  HinhAnhModel;