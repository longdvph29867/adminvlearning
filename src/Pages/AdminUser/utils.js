import { Tag } from "antd";
import { localService } from "../../service/localService";
// {
//     "taiKhoan": "090131959488",
//     "hoTen": "binhabc",
//     "email": "ctd123132@gmail.com",
//     "soDt": "1231231",
//     "maLoaiNguoiDung": "HV"
// }
export const columns = [
    {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: "5%",
    responsive: ["xl"],
    },
    {
        title: "Tài Khoản",
        dataIndex: "taiKhoan",
        key: "taiKhoan",
        width: "15%",
    },
    {
        title: "Họ tên",
        dataIndex: "hoTen",
        key: "hoTen",
        width: "15%",
        responsive: ["md"],
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "20%",
        responsive: ["xl"],
    },
    {
        title: "SĐT",
        dataIndex: "soDt",
        key: "soDt",
        width: "15%",
        responsive: ["lg"],
    },
    {
        title: "Loại người dùng",
        dataIndex: "maLoaiNguoiDung",
        key: "maLoaiNguoiDung",
        width: "15%",
        responsive: ["sm"],
        render: (hv) => {
            if (hv === "HV") {
                return <Tag className="font-medium" color="green">Học viên</Tag>
            }
            else {
                return <Tag className="font-meidum" color="red">Giáo viên</Tag>
            }
        }
    },
    {
        title: "Tuỳ chọn",
        dataIndex: "action",
        key: "action",
        width: "15%",
        hidden: localService.get()?.maLoaiNguoiDung === 'GV' ? false : true,
    },
].filter((item) => {
    return !item.hidden
});