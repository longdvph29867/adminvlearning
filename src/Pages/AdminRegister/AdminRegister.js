import React from 'react'
import { Button, Form, Input } from 'antd';
import { Select } from 'antd';
import { userService } from '../../service/userService';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const { Option } = Select;

export default function AdminRegister() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        userService.postRegister(values)
        .then((res) => {
            message.success('Đăng ký thành công!');
            setTimeout(() => {
                navigate('/admin-login');
            }, 1500);
        })
        .catch((err) => {
            console.log(err);
            message.error(err.response.data);
        });

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
  return (
    <section className="
    bg-gray-50 
    h-screen
    bg-[url(https://images.unsplash.com/photo-1625225230517-7426c1be750c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZvcm18ZW58MHx8MHx8&w=1000&q=80)]
    bg-cover
    bg-center
    flex
    items-center
    ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto max-w-[600px] w-full md:h-screen lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img className="w-8 h-8 mr-2" src="https://cdn-icons-png.flaticon.com/512/906/906343.png" alt="logo" />
            Admin Vlearning    
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-2 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x">
                Create your Account
                </h1>
                <Form
                className='!mt-4'
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 24,
                    }}
                    style={{
                    maxWidth: 600,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                    requiredMark={false}
                >
                    <Form.Item
                    name="taiKhoan"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập tài khoản của bạn!',
                        },
                        {
                        pattern: /^[a-zA-Z0-9]{3,}$/,
                        message: "Tài khoản ít nhất 3 ký tự!",
                        },
                    ]}
                    >
                    <Input placeholder='Tài khoản' />
                    </Form.Item>

                    <Form.Item
                    name="hoTen"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập họ tên của bạn!',
                        },
                        {
                            pattern: /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]{3,}$/,
                            message: "Tên phải là chữ và ít nhất 3 ký tự!",
                        },
                    ]}
                    >
                    <Input placeholder='Họ tên' />
                    </Form.Item>

                    <Form.Item
                    name="matKhau"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập Mật khẩu của bạn!',
                        },
                        {
                            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*()-]).{8,}$/,
                            message: "Mật khẩu ít nhất 8 ký tự, ít nhất 1 kí tự, 1 chữ và 1 số!",
                        },
                    ]}
                    >
                    <Input.Password placeholder='Mật khẩu' />
                    </Form.Item>

                    <Form.Item
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập email của bạn!',
                        },
                        {
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Email không hợp lệ!",
                        },
                    ]}
                    >
                    <Input placeholder='Email' />

                    </Form.Item>
                    <Form.Item
                    name="soDT"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại của bạn!',
                        },
                        {
                            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                            message: "Số điện thoại không hợp lệ (vd: 84..., 03..., 09...)",
                        },
                    ]}
                    >
                    <Input placeholder='Số điện thoại' />
                    </Form.Item>

                    <Form.Item
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
                        <Option value="GP0  10">GP010</Option>
                    </Select>
                    </Form.Item>

                    <Form.Item
                    className='text-center mb-1'
                    wrapperCol={{
                        offset: 0,
                        span: 24,
                    }}
                    >
                    <Button 
                    type="primary" 
                    htmlType="submit"
                    className='text-white bg-blue-500'
                    >
                        Đăng ký
                    </Button>
                    </Form.Item>
                </Form>
                
            <p className="text-sm font-light text-center text-gray-500">
                Bạn đã có tài khoản? <NavLink to={'/admin-login'} className="font-medium text-primary-600 hover:underline">Đăng nhập</NavLink>
            </p>
            </div>
            </div>
        </div>
    </section>
  )
}
