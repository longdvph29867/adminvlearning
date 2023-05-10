import { localService } from "../../service/localService";

export const columns = [
    {
    title: "Mã khóa học",
    dataIndex: "maKhoaHoc",
    key: "maKhoaHoc",
    width: "8%",
    responsive: ["sm"],
    },
    {
        title: "Hình ảnh",
        dataIndex: "hinhAnh",
        key: "hinhAnh",
        width: "10%",
        responsive: ["md"],
        render: (url) => {
            return <img src={url} className="w-20" alt="" />
        }
    },
    {
        title: "Tên khóa học",
        dataIndex: "tenKhoaHoc",
        key: "tenKhoaHoc",
        width: "17%",
    },
    {
        title: "Danh mục",
        dataIndex: "tenDanhMucKhoaHoc",
        key: "tenDanhMucKhoaHoc",
        width: "15%",
        responsive: ["lg"],
    },
    {
        title: "Mô tả",
        dataIndex: "moTa",
        key: "moTa",
        width: "20%",
        responsive: ["xl"],
    },
    {
        title: "Ngày tạo",
        dataIndex: "ngayTao",
        key: "ngayTao",
        width: "10%",
        responsive: ["lg"],
    },
    {
        title: "Lượt xem",
        dataIndex: "luotXem",
        key: "luotXem",
        width: "7%",
        responsive: ["md"],
    },
    {
        title: "Tuỳ chọn",
        dataIndex: "action",
        key: "action",
        width: "13%",
        hidden: localService.get()?.maLoaiNguoiDung === 'GV' ? false : true,
    },
].filter((item) => {
    return !item.hidden
});