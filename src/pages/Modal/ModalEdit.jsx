import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditDataProject } from 'store/actions/user.action';
import "./index.scss";
const { Option } = Select;

function ModalEdit() {
    const userState = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    // const [open, setOpen] = useState(false);

    // const showDrawer = () => {
    //     setOpen(true);
    //     console.log('click')
    // };

    const onClose = () => {
        dispatch(setEditDataProject(
      {
      setOpen: false,
      infor:<hr/>,
    }));
    };

    return (
        <>
            {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                New account
            </Button> */}
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={userState.detail.setOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                footer={
                    <Space style={{justifyContent: 'right', width:'100%'}}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={userState.detail.callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {userState.detail.infor}
            </Drawer>
        </>
    )
}

export default ModalEdit