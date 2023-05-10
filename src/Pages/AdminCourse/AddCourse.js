import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Select, InputNumber, message } from 'antd';
import { courseService } from '../../service/courseService';
import { localService } from '../../service/localService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoadingOff, setLoadingOn } from '../../toolkit/loadingSlice';
const { Option } = Select;
export default function AddCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [courseMenu, setCourseMenu] = useState([]);
    useEffect(() => {
        courseService.getCourseMenu()
        .then((res) => {
            setCourseMenu(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    
    }, [])

    const validateFile = (isFile) => {
        const type = ['jpg', 'png', 'jpeg'];
        const fileType = isFile.type.split("/")[1];
        const fileSize = isFile.size;
        if(type.includes(fileType)) {
            if(fileSize < 1024*1024) {
                return true;
            }
            else {
                message.error('File không quá 1MB!')
                return false;
            }
        }
        else {
            message.error('File phải là png, jpg, jpeg!')
            return false;
        }
    }

    const onFinish = (values) => {
        let file = document.getElementById('upfile').files[0];
        let toDay = new Date();
        let day = toDay.getDate() + '/' + (toDay.getMonth()+1) + '/' + toDay.getFullYear();
        const data = {
            maKhoaHoc: values.maKhoaHoc,
            biDanh: values.biDanh,
            tenKhoaHoc: values.tenKhoaHoc,
            moTa: values.moTa,
            luotXem: values.luotXem,
            danhGia: values.danhGia,
            hinhAnh: file.name,
            maNhom: values.maNhom,
            ngayTao: day,
            maDanhMucKhoaHoc:values.maDanhMucKhoaHoc,
            taiKhoanNguoiTao: localService.get().taiKhoan
        }

        const upFile = () => {
            let frm = new FormData();
            frm.append('file',file)
            frm.append('tenKhoaHoc',values.tenKhoaHoc)
            dispatch(setLoadingOn());
            courseService.postAddImageCourse(frm)
            .then((res) => {
                dispatch(setLoadingOff());
                message.success(res.data)
                navigate('/admin-course');
            })
            .catch((err) => {
                dispatch(setLoadingOff());
                message.error(err.response.data)
                console.log(err);
            });
        }
        if(validateFile(file)) {
            dispatch(setLoadingOn())
            courseService.postAddCourse(data)
            .then((res) => {
                dispatch(setLoadingOff())
                message.success('Thêm khoá học thành công!')
                upFile();
            })
            .catch((err) => {
                dispatch(setLoadingOff())
                message.error(err.response.data)
            });
        }
        
        
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


  return (
    <div className='h-full flex flex-col items-center '>
        <h1 className="text-xl text-green-500 font-bold leading-tight tracking-tight md:text-2xl">
        Thêm khoá học
        </h1>
        <Form
        className='!mt-4'
        method="post" encType="multipart/form-data"
            name="basic"
            labelCol={{
            span: 6,
            }}
            wrapperCol={{
            span: 24,
            }}
            style={{
            maxWidth: 450,
            width: '100%'
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}

        >
            <Form.Item
            label='Mã khoá học'
            name="maKhoaHoc"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập mã khoá học!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label='Bí danh'
            name="biDanh"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập bí danh!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label='Tên khoá học'
            name="tenKhoaHoc"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập tên khoá học!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label='Mô tả'
            name="moTa"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập mô tả!',
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label='Lượt xem'
            name="luotXem"
            initialValue={0}
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập lượt xem!',
                },
                {
                    pattern: /^[0-9]*$/,
                    message: "Lượt xem phải là số >= 0!",
                },
            ]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item
            label='Đánh giá'
            name="danhGia"
            initialValue={0}
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập đánh giá!',
                },
                {
                    pattern: /^[0-9]*$/,
                    message: "Đánh giá phải là số >= 0!",
                },
            ]}
            >
            <InputNumber />
            </Form.Item>

            <Form.Item
            label='Hình ảnh'
            name="file"
            rules={[
                {
                required: true,
                message: 'Vui lòng chọn file!',
                },
            ]}
            >
            <input 
            style={{
            maxWidth: 500,
            width: '100%'
            }} 
            type="file" name="file" id="upfile"/>
            </Form.Item>

            {/* group code */}
            <Form.Item
            label='Danh mục'
            name="maDanhMucKhoaHoc"
            initialValue="BackEnd"
            rules={[
                {
                required: true,
                message: 'Không được để trống!',
                },
                
            ]}
            >
                <Select
                    allowClear
                >
                    {courseMenu?.map((item, index) => {
                        return <Option key={index} value={item.maDanhMuc}>{item.tenDanhMuc}</Option>
                    })}
                </Select>
            </Form.Item>
            <Form.Item
            label='Mã nhóm'
            name="maNhom"
            initialValue="GP01"
            rules={[
                {
                required: true,
                message: 'Không được để trống!',
                },
                
            ]}
            >
                <Select
                    allowClear
                >
                    <Option value="GP01">GP01</Option>
                    <Option value="GP02">GP02</Option>
                    <Option value="GP03">GP03</Option>
                    <Option value="GP04">GP04</Option>
                    <Option value="GP05">GP05</Option>
                    <Option value="GP06">GP06</Option>
                    <Option value="GP07">GP07</Option>
                    <Option value="GP08">GP08</Option>
                    <Option value="GP09">GP09</Option>
                    <Option value="GP10">GP10</Option>
                    <Option value="GP11">GP11</Option>
                    <Option value="GP12">GP12</Option>
                    <Option value="GP13">GP13</Option>
                    <Option value="GP14">GP14</Option>
                    <Option value="GP15">GP15</Option>
                </Select>
            </Form.Item>



            {/* btn */}
            <Form.Item
            className='text-center'
            wrapperCol={{
                offset: 0,
                span: 24,
            }}
            >
            <Button 
            type="primary" 
            htmlType="submit"
            className='text-white bg-green-500'
            >
                Thêm khoá học
            </Button>
            </Form.Item>
        </Form>
    </div>
  )
}
