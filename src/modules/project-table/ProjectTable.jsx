import { Space, Table, Input, Button, Image, Tag, Avatar, Popover, AutoComplete } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAsync } from "../../hooks/useAsync";
import { NavLink, useNavigate } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleTwoTone,
  CarryOutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { removeVietnameseTones } from 'constants/common';
import { fetchProjectListAPI } from 'services/project';
import { LoadingContext } from 'contexts/loading.context';
import { fetchGetUserAPI } from 'services/project';
import { setEditDataProject, userSearch } from 'store/actions/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddUserAPI } from 'services/project';
import { fetchDeleteProjectAPI } from 'services/project';
import { notification } from 'antd';
import { fetchRemoveUserFromProjectAPI } from 'services/project';
import EditForm from 'EditProject/EditForm';
import { fetchProjectDetailAPI } from 'services/project';

const { Search } = Input;


function ProjectTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const userState = useSelector((state) => state.userReducer);
  const { state: data = [] } = useAsync({
    dependencies: [toggle],
    service: () => fetchProjectListAPI(),
  })

  const [ProjectList, setProjectList] = useState(data);
  const [value, setValue] = useState('');
  const [_, setLoadingState] = useContext(LoadingContext);

  const fetchGetUser = async (x) => {
    if (x) {
      setLoadingState({ isLoading: true });
      const result = await fetchGetUserAPI(x);
      setLoadingState({ isLoading: false });
      dispatch(userSearch(result.data.content));
    }
    else {
      dispatch(userSearch([]));
    }
  }
  const fetchAddUser = async (x) => {
    setLoadingState({ isLoading: true });
    const result = await fetchAddUserAPI(x);
    setLoadingState({ isLoading: false });
    // dispatch(userSearch(result.data.content));
  }
  const handleDeleteProject = async (x) => {
    setLoadingState({ isLoading: true });
    await fetchDeleteProjectAPI(x);
    setLoadingState({ isLoading: false });
    notification.success({
      description: " Delete Successfully !",
    });
    setToggle(!toggle);
    navigate("/project-management/project");
  }

  const handleEditProject = async (x) => {
    setLoadingState({ isLoading: true });
    const result = await fetchProjectDetailAPI(x);
    console.log(result.data.content)
    dispatch(setEditDataProject(
      {
        setOpen: true,
        infor: <EditForm />,
        callBackSubmit: (propsValue) => { alert('click demo') },
        data: {
          id: result.data.content.id,
          projectName: result.data.content.projectName,
          creator: result.data.content.creator.name,
          description: result.data.content.description,
          categoryId: result.data.content.projectCategory.id
        },
      }));
    setLoadingState({ isLoading: false });
  }

  const handdleRemoveUser = async (x, y) => {
    setLoadingState({ isLoading: true });
    await fetchRemoveUserFromProjectAPI({ projectId: x, userId: y })
    setLoadingState({ isLoading: false });
    setToggle(!toggle);
  }

  const searchRef = useRef(null);

  useEffect(() => {
    if (data) {
      // data.map(item => { 
      // chỗ này qua mỗi prọect thì fetch lại mems, vậy thì khi mà lặp qua item thứ 2 thì cái setMems ở trên nó update lại thành mems của project thứ 2 rồi, mất mems của project 1
      // nếu muốn xử lý theo đề ghi thì phải setMemsLít mà theo kiểu [...memsLít, ...result.data.content] với mỗi phần tử trong mảng này phải lưu lại id của project nữa
      // nên nó hơi phức tạp hơn xíu, nếu mà gọi api ban đầu đuwọc rồi thì chắc ưu tiên đơn giản, khỏi call lại api nữa r a
      //phần hover đó làm ntn?
      // có phần hướng dẫn trên hệ thống á anh, video 
      // có gì a tham khảo thử nha a ok, bye bye oki a, bye a,
      // console.log(item);
      // fetchMemsList(item.id);
      // do cái này mình lặp qua mảng rồi fetch mems theo từng project => nó sẽ ra nhiều list khác nhau
      // à , nhưng còn mấy chỗ bị rỗng thì sao
      // thì chắc không rendẻ ra thôi anh vậy 2 cái đó nếu mình add hoác delete mem thì cả 2 thay đổi hết phải ko
      // nếu backend đúng thì nó sẽ thay đổi cả hai, em thì không biết do em ko có code backend , do phần hướng dẫn nói là call api kia nên a làm theo
      // vậy nếu anh call api theo cũng được á, data 2 apí đều trả về giống nhau mà, hoặc là để code hiện tại, khỏi call api theo cũng đc
      // còn nếu call thêm api thì có vẻ như code hiện giờ chưa có lưu được hết tất cả các mems của tất cả project
      // item.members = MemsList;
      // console.log(item.members , item.id)
      // console.log(ProjectList)
      setProjectList(data)

    }
  }, [data]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ProjectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (_, { projectName, ...props }) => {
        return <NavLink to={`/project-detail/${props.id}`}>{projectName}</NavLink>
      }
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (_, { creator }) => {
        return <Tag color='green' key={creator.id}>{creator.name}</Tag>
      }
    },
    {
      title: 'Member',
      dataIndex: 'members',
      key: 'members',
      render: (_, { members, ...props }) => {
        // console.log(members, props.id); // vậy chắc lấy data này đi, cái kia thì vô detail mới lấy cái kia, mà 2 cái nó khác nhau, hồi đầu a log ra cho e thấy đó
        // em nghĩ là nó giống á, hồi đầu khác là a log ra 1 cái ở useEffect, 1 cái ở hàm fetch nên nó mới chưa update data trong useEfecgt á
        // ở đây thì data nó giống nhau, trừ cái data ở trong đây nó ít hơn cái kia 2 field email với phoneNumbẻ thô
        // hông phải chỗ này renders ra rồi hả a ? thì PrọectList = data mà
        return (
          <>
            {
              members?.slice(0, 3).map((item, index) => {
                return (
                  <Popover key={index} placement='top' title='member' content={() => {
                    return (
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td><Image src={item.avatar} height={20} preview={false} style={{ borderRadius: '50%' }} /></td>
                                <td>{item.name}</td>
                                <td>
                                  <Button shape='circle' style={{ border: 'none', }} size='small' icon={<CloseCircleTwoTone twoToneColor='red' />} onClick={() => handdleRemoveUser(props.id, item.userId)}></Button>
                                </td>
                              </tr>
                            )
                          }
                          )}
                        </tbody>
                      </table>
                    )
                  }}>
                    <Image key={item.userId} src={item.avatar} height={30} preview={false} style={{ borderRadius: '50%' }} />
                  </Popover>
                )
              })
            }
            {
              members?.length > 3 ? <Avatar>...</Avatar> : ''
            }
            {
              <Popover placement='topLeft' title={'Add User'} content={() => {
                return <AutoComplete
                  options={userState.list?.map((user, index) => {
                    return { label: user.name, value: user.userId.toString() }
                  })}
                  value={value}

                  onChange={(text) => {
                    setValue(text);
                  }}
                  onSelect={(value, option) => {
                    setValue(option.label);
                    fetchAddUser({
                      'projectId': props.id,
                      'userId': option.value,
                    });
                    setToggle(!toggle);
                  }
                  }
                  style={{ width: '100%' }} onSearch={(value) => {
                    if (searchRef.current) {
                      clearTimeout(searchRef.current);
                    }
                    searchRef.current = setTimeout(() => {
                      fetchGetUser(value);
                      console.log(userState.list);
                    }, 500)
                  }}
                />
              }} trigger='click'>
                <Button shape='circle'>+</Button>
              </Popover>
            }
          </>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditProject(record.id)}><EditOutlined /></a>
          <a onClick={() => handleDeleteProject(record.id)}><DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

  const onSearch = (value) => {
    const keyword = value;
    let DT = data.filter((ele) => {
      return (
        removeVietnameseTones(ele.tenPhim)
          .toLowerCase()
          .trim()
          .indexOf(removeVietnameseTones(keyword).toLowerCase().trim()) !== -1
      );
    });
    setProjectList(DT);
  }

  return (
    <>
      <Space direction="vertical" className='mb-3' style={{ width: "100%" }}>
        <Search
          placeholder="Movie search "
          onSearch={onSearch}
        />
      </Space>
      <div className='text-left mb-3'>
        <Button type='primary' onClick={() => navigate('/project-management/create-project')}>
          CREATE
        </Button>
      </div>
      <Table rowKey='id' columns={columns}
        dataSource={ProjectList} />
    </>
  )
}

export default ProjectTable;