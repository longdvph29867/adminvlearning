import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs } from 'antd';
import { courseService } from '../../../service/courseService';
import UnregisteredTable from './UnregisteredTable';
import RegisteredTable from './RegisteredTable';
import UserWaitingTable from './UserWaitingTable';
export default function DetailCourse() {
    const params = useParams();
    const [infoCourse, setinfoCourse] = useState({})
    const onChange = (key) => {
        console.log(key)
    };
    const items = [
        {
            key: '1',
            label: `Chưa ghi danh`,
            children: (<UnregisteredTable idCourse={params.id}/>),
        },
        {
            key: '2',
            label: `Đã ghi danh`,
            children: (<RegisteredTable idCourse={params.id}/>),
        },
        {
            key: '3',
            label: `Chờ xét duyệt`,
            children: (<UserWaitingTable idCourse={params.id}/>),
        },
    ];
    useEffect(() => {
        courseService.getInfoCourse(params.id)
        .then((res) => {
            setinfoCourse(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])
    

  return (
    <div className='flex flex-col xl:flex-row mx-[-16px]'>
        <div className='w-full mb-5 xl:mb-0 xl:w-1/5 xl:min-w-[230px]'>
            <div className='px-2'>
                <div className='shadow-lg flex flex-col md:flex-row xl:flex-col items-center p-2 rounded'>
                    <img className='w-4/5 md:w-1/3 xl:w-full' src={infoCourse?.hinhAnh} alt="" />
                    <div className='w-full ml-0 md:w-2/3 md:ml-4 text-center md:text-left xl:ml-0 xl:w-full xl:text-center'>
                        <h2 className='text-lg'><span className='font-semibold'>Khóa học:</span>{infoCourse?.tenKhoaHoc}</h2>
                        <h3><span className='font-semibold'>Danh mục:</span>{infoCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</h3>
                        <p><span className='font-semibold'>Người tạo:</span>{infoCourse?.nguoiTao?.hoTen}</p>
                        <p><span className='font-semibold'>Mô tả:</span>{infoCourse?.moTa?.slice(0,45) + '...'}</p>
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
