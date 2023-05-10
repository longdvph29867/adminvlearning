import { message, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { courseService } from '../../../service/courseService';
import { userService } from '../../../service/userService';
import { setLoadingOff, setLoadingOn } from '../../../toolkit/loadingSlice';
const { Search } = Input;

export default function RegisteredCourseTable({idUser}) {
    const dispatch = useDispatch();
    const [listCourseRegistered, setListCourseRegistered] = useState([])
    const [searchText, setSearchText] = useState('')
    const onSearch = (el) => {
        setSearchText(el.target.value.toLowerCase())
    };
    const columns = [
        {
            title: "Mã khoá học",
            dataIndex: "maKhoaHoc",
            key: "maKhoaHoc",
            width: "25%",
            responsive: ["sm"],
        },
        {
            title: "Tên khoá học",
            dataIndex: "tenKhoaHoc",
            key: "tenKhoaHoc",
            width: "25%",
            filteredValue: [searchText],
            onFilter: (value, record) => {
            return record.tenKhoaHoc.toLowerCase().includes(value)
            }
        },
        {
            title: "Bí danh",
            dataIndex: "biDanh",
            key: "biDanh",
            width: "25%",
            responsive: ["md"],
        },
        {
            title: "Tuỳ chọn",
            dataIndex: "action",
            key: "action",
            width: "25%",
        },
    ];

    const fetchListCouser = () => {
        const data = {
            "taiKhoan": idUser
        }
        dispatch(setLoadingOn())
        userService.postListCourseRegistered(data)
        .then((res) => {
            console.log("🚀 ~ file: UnregisteredCourseTable.js:56 ~ .then ~ res:", res)
            dispatch(setLoadingOff())
            setListCourseRegistered(res.data)
        })
        .catch((err) => {
            dispatch(setLoadingOff())
            console.log(err);
        });
    }
    useEffect(() => {
        fetchListCouser()
        // eslint-disable-next-line
    }, [])
    
    const handleDeleteUserFromCourse = (maKhoaHoc) => {
        let data = {
            "maKhoaHoc": maKhoaHoc,
            "taiKhoan": idUser,
        }
        courseService.postDeleteUserFromCourse(data)
        .then((res) => {
            message.success(res.data)
            fetchListCouser()
        })
        .catch((err) => {
            message.error(err.response.data)
            console.log(err);
        });
    }
    const dataSource = listCourseRegistered?.map((item, index) => {
            return {
                key: index,
                maKhoaHoc: item.maKhoaHoc,
                tenKhoaHoc: item.tenKhoaHoc,
                biDanh: item.biDanh,
                action: (
                    <div>
                        <button
                        onClick={() => {handleDeleteUserFromCourse(item.maKhoaHoc)}}
                        className='p-2 text-base text-white bg-red-500 rounded'
                        >Huỷ ghi danh</button>
                    </div>
                ),
            }
        })
  return (
    <div>
        <Search
        className='mb-1'
        placeholder="Nhập tên khóa học"
        onChange={onSearch}
        style={{
            width: 180,
        }}
        />
        <Table dataSource={dataSource} columns={columns} />
    </div>

  )
}
