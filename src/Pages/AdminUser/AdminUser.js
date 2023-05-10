import { Table, message, Button, Select, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { localService } from '../../service/localService';
import { userService } from '../../service/userService'
import { setInfoUserUpdate } from '../../toolkit/userSlice';
import { columns } from './utils'
import qs from 'qs';
import { useSearchParams } from 'react-router-dom';
import { setLoadingOff, setLoadingOn } from '../../toolkit/loadingSlice';
const { Search } = Input;

export default function AdminUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stringQuery = window.location.search.substring(1)
  let paramsObj = qs.parse(stringQuery)

  const [isGroupCode, setIsGroupCode] = useState(() => {
    if(paramsObj.isGroupCode) {
      return paramsObj.isGroupCode;
    }
    else {
      return 'GP01';
    }
  })
  const [search, setSearch] = useSearchParams();
  const [listUser, setListUser] = useState([])

  const fetchListUser = (isGroupCode) => {
    dispatch(setLoadingOn())
    userService.getListUser(isGroupCode)
    .then((res) => {
      dispatch(setLoadingOff())
      setListUser(res.data)
    })
    .catch((err) => {
      dispatch(setLoadingOff())
      console.log(err);
    });
  }

  useEffect(() => {
    if(paramsObj.search) {
      dispatch(setLoadingOn())
      userService.getSearchUser(paramsObj.search, isGroupCode)
      .then((res) => {
        dispatch(setLoadingOff())
        setListUser(res.data);
      })
      .catch((err) => {
        dispatch(setLoadingOff())
        console.log(err);
      });
    }
    else {
      fetchListUser(isGroupCode);
    }
  }, [isGroupCode])
  
  // delete user
  const handleDeleteUser = (id) => {
    if(window.confirm('Bạn có muốn xoá không!')) {
      dispatch(setLoadingOn())
      userService.deleteUser(id)
      .then((res) => {
        dispatch(setLoadingOff())
        fetchListUser();
        message.success('Xoá thành công!')
      })
      .catch((err) => {
        dispatch(setLoadingOff())
        console.log(err);
        message.error(err.response.data)
      });
    }
  }

  // search user
  const onSearch = (el) => {
    let value = el.target.value
    setSearch({
      search: value,
      isGroupCode: isGroupCode
    });
    if(value) {
      userService.getSearchUser(value, isGroupCode)
      .then((res) => {
        setListUser(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else {
      fetchListUser(isGroupCode);
    }
    
  };

  const handleChange = (value) => {
    setIsGroupCode(value)
  };

  const dataSource = listUser?.map((item, index) => {
    return {
      key: index,
      stt: index+1,
      taiKhoan: item.taiKhoan,
      hoTen: item.hoTen,
      email: item.email,
      soDt: item.soDt,
      maLoaiNguoiDung: item.maLoaiNguoiDung,
      action: (
        <div>
          <div className='flex flex-col space-y-1 items-center justify-center sm:flex-row sm:space-y-0'>
            <button onClick={() => {
              dispatch(setInfoUserUpdate({...item, maNhom: isGroupCode}))
              navigate(`/admin-updateuser/${item.taiKhoan}`)
            }} className='p-2 text-base text-white bg-amber-400 mx-1 rounded'>
              <FaPencilAlt/>
            </button>
            <button onClick={() => {handleDeleteUser(item.taiKhoan)}} className='p-2 text-base text-white bg-red-500 mx-1 rounded'>
              <FaTrashAlt/>
              </button>
          </div>
          <div className='flex justify-center'>
              <button onClick={() => {
                dispatch(setInfoUserUpdate({...item, maNhom: isGroupCode}))
                navigate(`/admin-detailuser/${item.taiKhoan}`)
              }}
              className='p-1 text-sm mt-1 text-white bg-blue-500 mx-1 rounded'>
                Xem thêm
              </button>
          </div>
        </div>
      ),
    }
  })
  return (
    <div>{localService.get()?.maLoaiNguoiDung === 'GV' ? (
      <div>
        <NavLink to={'/admin-adduser'}>
          <Button type="primary" className='mb-3 bg-green-500'>Thêm người dùng</Button>
        </NavLink>
      </div>
    ) : <></>}
    <div className='mb-3 flex flex-col items-start justify-between space-y-1 sm:flex-row sm:space-y-0'>
        <Select
          defaultValue={isGroupCode}
          style={{ width: 150 }}
          onChange={handleChange}
          options={[
            { value: 'GP01', label: 'GP01' },
            { value: 'GP02', label: 'GP02' },
            { value: 'GP03', label: 'GP03' },
            { value: 'GP04', label: 'GP04' },
            { value: 'GP05', label: 'GP05' },
            { value: 'GP06', label: 'GP06' },
            { value: 'GP07', label: 'GP07' },
            { value: 'GP08', label: 'GP08' },
            { value: 'GP09', label: 'GP09' },
            { value: 'GP10', label: 'GP10' },
            { value: 'GP11', label: 'GP11' },
            { value: 'GP12', label: 'GP12' },
            { value: 'GP13', label: 'GP13' },
            { value: 'GP14', label: 'GP14' },
            { value: 'GP15', label: 'GP15' },
          ]}
        />
        <Search
        placeholder="Nhập tên nguời dùng"
        onChange={onSearch}
        defaultValue={paramsObj?.search}
        style={{
          width: 250,
          maxWidth: '100%'
        }}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
