import { Space, Table, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAsync } from "../../hooks/useAsync";
import { formatDate } from "../../utils/common";
import { useNavigate } from 'react-router-dom';
import { notification, } from 'antd';
import { userListApi } from 'services/user';
import { deleteUserApi } from 'services/user';
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { removeVietnameseTones } from 'constants/common';


const { Search } = Input;


function UserTable() {

  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { state: data = [] } = useAsync({
    dependencies: [toggle],
    service: () => userListApi(),
  })

  useEffect(() => {
    if (data.length !== 0) { setuserlist(data); }

  }, [data]);

  const [userlist, setuserlist] = useState(data);


  const handleDelete = async (x, y) => {
    try {
      await deleteUserApi(x);
      notification.success({
        description: ` ${y} deleted!`,
      });
      setToggle(!toggle);
      // navigate("/admin/user-management");
    }
    catch (err) {
      notification.warning({
        description: `${err.response.data.content}`,
      });
    }
  }

  const columns = [
    { title: 'STT', dataIndex: 'STT', key: 'STT' },
    {
      title: 'Tài Khoản',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/project-management/UserEdit/${record.userId}`)}><EditOutlined /></a>
          <a onClick={() => handleDelete(record.userId, record.name)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

  const onSearch = (value) => {
    const keyword = value;
    let DT = data.filter((ele) => {
      return (
        removeVietnameseTones(ele.email)
          .toLowerCase()
          .trim()
          .indexOf(removeVietnameseTones(keyword).toLowerCase().trim()) !== -1
      );
    });
    // console.log(DT);
    setuserlist(DT);
  }

  return (
    <>
      <div className='text-left mb-3'>
        <Space direction="vertical" className='mb-3' style={{ width: "100%" }}>
          <Search
            placeholder="User's mail search "
            onSearch={onSearch}
          />
        </Space>
        <Button type='primary' onClick={() => navigate('/project-management/UserCreate')}>
          CREATE
        </Button>
      </div>
      <Table rowKey='userId'
        columns={columns} dataSource={userlist.map((item, index) => ({ ...item, STT: index + 1 }))} />
    </>
  )
}

export default UserTable;