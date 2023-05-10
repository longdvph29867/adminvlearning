import { message, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { courseService } from '../../../service/courseService';
import { setLoadingOff, setLoadingOn } from '../../../toolkit/loadingSlice';
const { Search } = Input;

export default function UnregisteredTable({idCourse}) {
    const dispatch = useDispatch();
    const [listUserUnregistered, setListUserUnregistered] = useState([])
    const [searchText, setSearchText] = useState('')
    const onSearch = (el) => {
        setSearchText(el.target.value.toLowerCase())
    };
    const columns = [
        {
            title: "Tài khoản",
            dataIndex: "taiKhoan",
            key: "maKhoaHoc",
            width: "25%",
            filteredValue: [searchText],
            onFilter: (value, record) => {
            return record.taiKhoan.toLowerCase().includes(value)
            }
        },
        {
            title: "Họ tên",
            dataIndex: "hoTen",
            key: "hinhAnh",
            width: "25%",
            responsive: ["sm"],
        },
        {
            title: "Bí danh",
            dataIndex: "biDanh",
            key: "hinhAnh",
            width: "25%",
            responsive: ["md"],
        },
        {
            title: "Tuỳ chọn",
            dataIndex: "action",
            key: "hinhAnh",
            width: "25%",
        },
    ];

    const fetchListUser = () => {
        let data = {
            "maKhoaHoc": idCourse
        }
        dispatch(setLoadingOn())
        courseService.postListUserUnregistered(data)
        .then((res) => {
            dispatch(setLoadingOff())
            setListUserUnregistered(res.data)
        })
        .catch((err) => {
            dispatch(setLoadingOff())
            console.log(err);
        });
    }
    useEffect(() => {
        fetchListUser()
        // eslint-disable-next-line
    }, [])
    
    const handleAddUserToCourse = (taiKhoan) => {
        let data = {
            "maKhoaHoc": idCourse,
            "taiKhoan": taiKhoan,
        }
        courseService.postAddUserToCourse(data)
        .then((res) => {
            message.success(res.data)
            fetchListUser()
        })
        .catch((err) => {
            message.error(err.response.data)
            console.log(err);
        });
    }
    const dataSource = listUserUnregistered?.map((item, index) => {
            return {
                key: index,
                taiKhoan: item.taiKhoan,
                hoTen: item.hoTen,
                biDanh: item.biDanh,
                action: (
                    <div>
                        <button
                        onClick={() => {handleAddUserToCourse(item.taiKhoan)}}
                        className='p-2 text-base text-white bg-green-500 rounded'
                        >Ghi danh</button>
                    </div>
                ),
            }
        })
  return (
    <div>
        <Search
        className='mb-1'
        placeholder="Nhập tài khoản"
        onChange={onSearch}
        style={{
            width: 180,
        }}
        />
        <Table dataSource={dataSource} columns={columns} />
    </div>

  )
}
