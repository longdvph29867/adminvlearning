import React from 'react'
import { Button, Form, Input } from 'antd';
import { message } from 'antd';
import { localService } from '../../service/localService';
import { userService } from '../../service/userService';
import { NavLink } from 'react-router-dom';

export default function AdminLogin() {
    const onFinish = (values) => {
        console.log('Success:', values);
        userService.postSignin(values)
        .then((res) => {
            localService.set(res.data)
            message.success('Đăng nhập thành công!')
            setTimeout(() => {
                window.location.href = '/'
            }, 2000)
        })
        .catch((err) => {
            message.error(err.response.data)
            console.log(err);
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
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
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
                    label="Tài khoản"
                    name="taiKhoan"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập tài khoản của bạn!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item
                    label="Mật khẩu"
                    name="matKhau"
                    rules={[
                        {
                        required: true,
                        message: 'Vui lòng nhập Mật khẩu của bạn!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>

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
                    className='text-white bg-blue-500'
                    >
                        Đăng nhập
                    </Button>
                    </Form.Item>
                </Form>
                
            <p className="text-sm font-light text-center text-gray-500">
                Bạn chưa có tài khoản? <NavLink to={'/admin-signup'} className="font-medium text-primary-600 hover:underline">Đăng ký</NavLink>
            </p>
            </div>
            </div>
        </div>
    </section>

  )
}
