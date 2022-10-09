import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditDataProject, setEditSubmit } from 'store/actions/user.action';
import "./index.scss";
const { Option } = Select;

function ModalEdit() {
    const userState = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [open, setOpen] = useState(false);

    // const showDrawer = () => {
    //     setOpen(true);
    //     console.log('click')
    // };
    const onSave = () => {
        userState.callBackSubmit();
        onClose();
        navigate(0);
    }
    const onClose = () => {
        console.log('ssss')
        dispatch(setEditDataProject(
            {
                detail: {
                    setOpen: false,
                    infor: <hr />,
                    data: {
                        id: 0,
                        projectName: "string",
                        creator: 0,
                        description: "string",
                        categoryId: "string"
                    },
                },
            }));
        dispatch(setEditSubmit((propsValue) => { alert('click demo') },
        ));
    };

    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={userState.detail.setOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                footer={
                    <Space style={{ justifyContent: 'right', width: '100%' }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSave} type="primary">
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