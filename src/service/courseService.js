import { https } from "./config"

export const courseService = {
    getListCourse: (groupCode) => {
        return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${groupCode}`);
    },
    deleteCouser: (id) => {
        return https.delete(`/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${id}`)
    },
    getCourseMenu: () => {
        return https.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc')
    },
    postAddCourse: (data) => {
        return https.post('/api/QuanLyKhoaHoc/ThemKhoaHoc', data)
    },
    postAddImageCourse: (data) => {
        return https.post('/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc', data)
    },
    getInfoCourse: (id) => {
        return https.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`)
    },
    putUpdateCourse: (data) => {
        return https.put('/api/QuanLyKhoaHoc/CapNhatKhoaHoc', data)
    },
    getSearchCourse: (value, groupCode) => {
        return https.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${value}&MaNhom=${groupCode}`)
    },
    postListUserUnregistered: (data) => {
        return https.post('/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh', data)
    },
    postListUserRegistered: (data) => {
        return https.post('/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc', data)
    },
    postListUserWaiting: (data) => {
        return https.post('/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet', data)
    },
    postAddUserToCourse: (data) => {
        return https.post('/api/QuanLyKhoaHoc/GhiDanhKhoaHoc', data)
    },
    postDeleteUserFromCourse: (data) => {
        return https.post('/api/QuanLyKhoaHoc/HuyGhiDanh', data)
    },

}