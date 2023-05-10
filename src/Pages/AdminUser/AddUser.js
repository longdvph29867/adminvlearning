import React from 'react'
import { Button, Form, Input, Select, message } from 'antd';
import { userService } from '../../service/userService';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

export default function AddUser() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        const data = {
            taiKhoan: values.taiKhoan,
            matKhau: values.matKhau,
            hoTen: values.hoTen,
            soDT: values.soDT,
            maLoaiNguoiDung: values.maLoaiNguoiDung,
            maNhom: values.maNhom,
            email: values.email,
        }

        userService.postAddUser(data)
        .then((res) => {
            message.success('Thêm người dùng thành công!')
            navigate('/admin-user')
        })
        .catch((err) => {
            message.error(err.response.data)
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
  return (
    <div className='h-full flex flex-col items-center '>
        <h1 className="text-xl text-green-500 font-bold leading-tight tracking-tight md:text-2xl">
        Thêm người dùng
        </h1>
        <Form
        className='!mt-4'
        method="post" encType="multipart/form-data"
            name="basic"
            labelCol={{
            span: 8,
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
            label='Tài Khoản'
            name="taiKhoan"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập tài Khoản!',
                },
                {
                    pattern: /^[a-zA-Z0-9]{3,}$/,
                    message: "Tài khoản ít nhất 3 ký tự!",
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label='Mật khẩu'
            name="matKhau"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập mật khẩu!',
                },
                {
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*()-]).{8,}$/,
                    message: "Mật khẩu ít nhất 8 ký tự, ít nhất 1 kí tự, 1 chữ và 1 số!",
                },
                
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            label='Nhập lại mật khẩu'
            name="confirmMatKhau"
            rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("matKhau") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            "Mật khẩu không khớp!"
                        );
                    }
                })
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            label='Họ tên'
            name="hoTen"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập họ tên!',
                },
                {
                    pattern: /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{3,}$/,
                    message: "Tên phải là chữ và ít nhất 3 ký tự!",
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label='Số điện thoại'
            name="soDT"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập số điện thoại!',
                },
                {
                    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: "Số điện thoại không hợp lệ (vd: 84..., 03..., 09...)",
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label='Email'
            name="email"
            rules={[
                {
                required: true,
                message: 'Vui lòng nhập email!',
                },
                {
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email không hợp lệ!",
                },
            ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
            label='Người dùng'
            name="maLoaiNguoiDung"
            initialValue="GV"
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
                    <Option value="GV">Giáo vụ</Option>
                    <Option value="HV">Học viên</Option>
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
                Thêm người dùng
            </Button>
            </Form.Item>
        </Form>
    </div>
  )
}
