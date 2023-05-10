import { Tabs } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CourseWaitingTable from './CourseWaitingTable';
import RegisteredCourseTable from './RegisteredCourseTable';
import UnregisteredCourseTable from './UnregisteredCourseTable';

export default function DetailUser() {
    const params = useParams();
    const infoUser =useSelector((state) => state.userSlice.infoUserUpdate)

    const onChange = (key) => {
        console.log(key)
    };
    const items = [
        {
            key: '1',
            label: `Chưa ghi danh`,
            children: (<UnregisteredCourseTable idUser={params.id}/>),
        },
        {
            key: '2',
            label: `Đã ghi danh`,
            children: (<RegisteredCourseTable idUser={params.id}/>),
        },
        {
            key: '3',
            label: `Chờ xét duyệt`,
            children: (<CourseWaitingTable idUser={params.id}/>),
        },
    ];
  return (
    <div className='flex flex-col xl:flex-row mx-[-16px]'>
        <div className='w-full mb-5 xl:mb-0 xl:w-1/5 xl:min-w-[230px]'>
            <div className='px-2'>
                <div className='shadow-lg flex flex-col md:flex-row xl:flex-col items-center p-2 rounded'>
                    <img className='w-4/5 md:w-1/3 xl:w-full' src='https://demo2.cybersoft.edu.vn/static/media/emoji.6d1b7051.png' alt="" />
                    <div className='w-full ml-0 md:w-2/3 md:ml-4 text-center md:text-left xl:ml-0 xl:w-full xl:text-center'>
                        <h2 className='text-base'><span className='font-semibold'>Tài khoản: </span>{infoUser?.taiKhoan}</h2>
                        <h3><span className='font-semibold'>Họ tên: </span>{infoUser?.hoTen}</h3>
                        <p><span className='font-semibold'>Loại người dùng: </span>{infoUser?.maLoaiNguoiDung === 'GV' ? 'Giáo viên' : 'Học viên'}</p>
                        <p><span className='font-semibold'>SĐT: </span>{infoUser?.soDt}</p>
                        <p><span className='font-semibold'>Email: </span>{infoUser?.email}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full xl:w-4/5'>
            <div className='px-2'>

            <Tabs
                destroyInactiveTabPane={true}
                type="card"
                defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </div>
    </div>
  )
}
