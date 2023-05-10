import { https } from "./config"
export const userService = {
    postSignin: (data) => {
        return https.post('/api/QuanLyNguoiDung/DangNhap', data)
    },
    postRegister: (data) => {
        return https.post('/api/QuanLyNguoiDung/DangKy', data)
    },
    getListUser: (isGroupCode) => {
        return https.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${isGroupCode}`)
    },
    deleteUser: (id) => {
        return https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`)
    },
    postAddUser: (data) => {
        return https.post('/api/QuanLyNguoiDung/ThemNguoiDung', data)
    },
    putUpdateUser: (data) => {
        return https.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', data)
    },
    getSearchUser: (value, isGroupCode) => {
        return https.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${isGroupCode}&tuKhoa=${value}`)
    },
    postListCourseUnregistered: (id) => {
        return https.post(`/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${id}`)
    },
    postListCourseRegistered: (data) => {
        return https.post('/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet', data)
    },
    postListCourseWaiting: (data) => {
        return https.post('/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet', data)
    },

}