import React from 'react'
import { Layout, Menu, theme, Dropdown, Button } from 'antd';
import { FaUserAlt, FaBookOpen } from 'react-icons/fa';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { localService } from '../service/localService';
import { RingLoader } from 'react-spinners';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const menu = [
    getItem(<NavLink to={'/admin-user'}>User</NavLink>, '1', <FaUserAlt />),
    getItem(<NavLink to={'/admin-course'}>Course</NavLink>, '2', <FaBookOpen />),
  ];
  const items = [
    {
      key: "1",
      label: 
      <div
      onClick={() => {
        localService.remove();
        window.location.href = '/';
      }}
      >Đăng xuất</div>,
    },
  ];
export default function AdminLayout({Component}) {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();
  const isLoading = useSelector((state) => state.loadingSlice.isLoading)
  const infoUser = useSelector((state) => state.userSlice.infoUserAdmin)

  return (
    <div>
      {isLoading ? (
        <div className='fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-black/40'>
          <RingLoader color="#FFC107" />
        </div>
      ) : <></>}
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider breakpoint="md" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menu} />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              background: colorBgContainer,
              padding: '16px',
              height: 'auto'
            }}
          >
            <div className='flex flex-col sm:flex-row items-center justify-between h-full'>
              <div className='text-lg font-bold text-[#000000e0] sm:text-xl'>Admin Vlearning</div>
              {
                infoUser ? (
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottom"
                >
                  <Button>Hello, {infoUser.hoTen}</Button>
                </Dropdown>
                ) : (<div className='space-x-2 flex'>
                  <NavLink to={'/admin-login'}>
                    <Button>Đăng Nhập</Button>
                  </NavLink>
                  <NavLink to={'/admin-signup'}>
                    <Button>Đăng Ký</Button>
                  </NavLink>
                </div>)
              }
            </div>
          </Header>
          <Content
            style={{
              margin: '16px',
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                height: '100%',
                background: colorBgContainer,
              }}
            >
              <Component/>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}
