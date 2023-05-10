import { Table, Button, message, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { courseService } from '../../service/courseService'
import { columns } from './utils';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import qs from 'qs';
import { useSearchParams } from 'react-router-dom';
import { localService } from '../../service/localService';
import { useDispatch } from 'react-redux';
import { setLoadingOff, setLoadingOn } from '../../toolkit/loadingSlice';
const { Search } = Input;


export default function AdminCourse() {
  const dispatch = useDispatch();
  const stringQuery = window.location.search.substring(1)
  let paramsObj = qs.parse(stringQuery)

  const [search, setSearch] = useSearchParams();
  const [listCourse, setListCourse] = useState([]);
  const [isGroupCode, setIsGroupCode] = useState(() => {
    if(paramsObj.isGroupCode) {
      return paramsObj.isGroupCode;
    }
    else {
      return 'GP01'
    }
  });

  const fetchListCourse = (isGroupCode) => {
    dispatch(setLoadingOn());
    courseService.getListCourse(isGroupCode)
    .then((res) => {
      dispatch(setLoadingOff());
      setListCourse(res.data)
    })
    .catch((err) => {
      dispatch(setLoadingOff());
      console.log(err);
    });
  }

  useEffect(() => {
    if(paramsObj.search) {
      dispatch(setLoadingOn());
      courseService.getSearchCourse(paramsObj.search, isGroupCode)
      .then((res) => {
        dispatch(setLoadingOff());
        setListCourse(res.data)
      })
      .catch((err) => {
        dispatch(setLoadingOff());
        console.log(err);
      });
    }
    else {
      fetchListCourse(isGroupCode);
    }
  }, [isGroupCode])
  
  const handleDeleteCourse = (id) => {
    if(window.confirm('Bạn có muốn xoá không!')) {
      dispatch(setLoadingOn())
      courseService.deleteCouser(id)
      .then((res) => {
        dispatch(setLoadingOff())
        fetchListCourse(isGroupCode);
        message.success('Xoá thành công!')
      })
      .catch((err) => {
        dispatch(setLoadingOff())
        console.log(err);
        message.error(err.response.data)
      });
    }
  }
  const onSearch = (el) => {
    let value = el.target.value
    setSearch({
      search: value,
      isGroupCode: isGroupCode
    });
    
    if(value) {
      courseService.getSearchCourse(value, isGroupCode)
      .then((res) => {
        setListCourse(res.data)
      })
      .catch((err) => {
        console.log(err);
        setListCourse([])
      });
    }
    else {
      fetchListCourse(isGroupCode);
    }
  };

  const handleChange = (value) => {
    setIsGroupCode(value)
  };

  const dataSource = listCourse?.map((item, index) => {
    return {
      key: index,
      maKhoaHoc: item.maKhoaHoc,
      hinhAnh: item.hinhAnh,
      tenKhoaHoc: item.tenKhoaHoc,
      tenDanhMucKhoaHoc: item.danhMucKhoaHoc.tenDanhMucKhoaHoc,
      moTa: item.moTa.substr(0,70) + '...',
      ngayTao: item.ngayTao,
      luotXem: item.luotXem,
      action: (
        // respon
        <div>
          <div className='flex flex-col space-y-1 items-center justify-center sm:flex-row sm:space-y-0'>
            <NavLink to={`/admin-updatecourse/${item.maKhoaHoc}`}>
              <button className='p-2 text-base text-white bg-amber-400 mx-1 rounded'>
                  <FaPencilAlt/>
              </button>
            </NavLink>
            <button onClick={() => {handleDeleteCourse(item.maKhoaHoc)}} className='p-2 text-base text-white bg-red-500 mx-1 rounded'>
              <FaTrashAlt/>
            </button>
          </div>
          <div className='flex justify-center'>
            <NavLink to={`/admin-detailcourse/${item.maKhoaHoc}`}>
              <button className='p-1 text-sm mt-1 text-white bg-blue-500 mx-1 rounded'>
                Xem thêm
              </button>
            </NavLink>
          </div>
        </div>
      ),
    }
  })

  return (
    <div>
      {localService.get()?.maLoaiNguoiDung === 'GV' ? (
        <div>
          <NavLink to={'/admin-addcourse'}>
            <Button type="primary" className='mb-3 bg-green-500'>Thêm khóa học</Button>
          </NavLink>
        </div>
      ) : <></>}
      {/* respon */}
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
        placeholder="Nhập tên khoá học"
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
