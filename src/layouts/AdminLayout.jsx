import {
  TeamOutlined,
  SearchOutlined,
  FolderAddOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Navigate, NavLink, Route, useLocation, } from 'react-router-dom';
import { USER_KEY } from "constants/common";
import { setEditDataProject, setMyProject, setUserInfoAction } from "store/actions/user.action";

import { Breadcrumb, Layout, Menu, Image, Space, notification } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import CreateTaskForm from "CreateTask/CreateTaskForm";
import { fetchProjectListAPI } from "services/project";
import { useAsync } from "hooks/useAsync";
import { useEffect } from "react";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('User Management', '/project-management/user', <TeamOutlined />),
  getItem('Project Management', '/project-management/project', <SearchOutlined />),
  getItem('Create Project', '/project-management/create-project', <FolderAddOutlined />),
  getItem('Create Task', 'callCreateTask', <FileAddOutlined />),
  getItem('Log Out', 'logOut', <LogoutOutlined />),
]

function AdminLayout() {
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const MenuClick = (value) => {
    navigate(value.key);
  }
  const { state: data = [] } = useAsync({
    dependencies: [],
    service: () => fetchProjectListAPI(),
  })
  useEffect(() => {
    if (data.length !== 0) {
      let DATA = data.filter((ele) => {
        return ele.creator.id === userState.userInfor.id
      })
      dispatch(setMyProject(DATA));
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    dispatch(setUserInfoAction(null));
    navigate('/login');
  }
  const breadcrumb = pathname.split('/');
  // console.log(userState)

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ backgroundColor: '#05357e' }} >
        <div className="logo" >
          <a href="/">
            <div className="sideBar-icon">
              <i className="fa-brands fa-jira fa-lg"></i>
            </div>
          </a>
        </div>
        <Menu
          defaultSelectedKeys={['/admin/movie-management']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={collapsed}
          style={{ backgroundColor: 'transparent' }}
          items={items}
          selectedKeys={[pathname]}
          onClick={({ key }) => {
            if (key === 'callCreateTask') {
              if (userState.myProject.length !== 0) {
                dispatch(setEditDataProject(
                  {
                    title: 'Create Task',
                    setOpen: true,
                    infor: <CreateTaskForm />,
                    data: {
                      id: 'hanh',
                      projectName: 'hanh',
                      creator: 'hanh',
                      description: 'hanh',
                      categoryId: 'hanh'
                    },
                  }));
              }
              else {
                notification.warning({
                  description: 'Please create your project !',
                })
              }
            }
            else {
              if (key === 'logOut') {
                handleLogout();
              }
              else {
                navigate(key);
              }
            }
          }}
        />
      </Sider>
      <Layout className="site-layout" >

        <Space
        >
          <Menu
            selectedKeys={pathname}
            mode="inline"
            style={{
              marginLeft: '50px', backgroundColor: '#f4f5f7', width: 200,
            }}
            onClick={({ key }) => {
              navigate(key)
            }}
            items={[
              {
                label: <Image src="https://cybersoft.edu.vn/wp-content/uploads/2021/03/logo-cyber-nav.svg" width={100} preview={false} />, disabled: true,
              },
              { label: <hr />, disabled: true },
              { label: 'Cyber Board', key: '/project-management/board', icon: <i className="fa-solid fa-credit-card"></i> },
              { label: 'Project Settings', icon: <i className="fa-solid fa-gear"></i> },
              { label: <hr />, disabled: true },
              { label: 'Releases', icon: <i className="fa-solid fa-truck"></i> },
              { label: 'Issues and Filters', icon: <i className="fa-solid fa-equals"></i> },
              { label: 'Pages', icon: <i className="fa-solid fa-paste"></i> },
              { label: 'Reports', icon: <i className="fa-solid fa-location-arrow"></i> },
              { label: 'Components', icon: <i className="fa-solid fa-box"></i> },
            ]}
          >

            {/* <Menu.Item className=" d-flex align-items-center justify-content-between pl-2" >
              <div className="ml-auto">
                <p className="my-0 text-white d-inline-block pr-2">Xin chào! {userState.userInfor.name} </p>
                <button
                  onClick={handleLogout}
                  className="btn btn-signup d-inline-block"
                  type="sumit"
                >
                  Đăng xuất
                </button>
              </div>
            </Menu.Item> */}

          </Menu>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>{breadcrumb[1]}</Breadcrumb.Item>
              <Breadcrumb.Item>{breadcrumb[2]}</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Content>
        </Space>

      </Layout>
    </Layout>
  );
}

export default AdminLayout;
