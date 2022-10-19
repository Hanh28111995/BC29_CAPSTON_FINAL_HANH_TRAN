import { ConfigContext } from 'antd/lib/config-provider';
import { Space, Table, Input, Button, Image, Tag, Modal, Popover, AutoComplete } from 'antd';
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import "../../pages/ProjectDetail/index.scss";
import { useAsync } from 'hooks/useAsync';
import { LoadingContext } from 'contexts/loading.context';
import { fetchProjectStatusIdAPI } from 'services/project';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchProjectPriorityAPI } from 'services/project';
import { fetchUpdateStatusAPI } from 'services/project';
import { fetchUpdatePriorityAPI } from 'services/project';
import { fetchUpdateEstimateAPI } from 'services/project';
import { fetchUpdateTimeTrackingAPI } from 'services/project';
import { useNavigate } from 'react-router-dom';
import { fetchGetTaskDetailAPI } from 'services/project';
import { reRender, setReRenderDetail, setTaskDetail, setTaskModal } from 'store/actions/user.action';
import { fetchProjectTaskTypeAPI } from 'services/project';
import { fetchUpdateAllOfTaskAPI } from 'services/project';
import './index.scss'
import { Editor } from '@tinymce/tinymce-react';
import { fetchDeleteTaskAPI } from 'services/project';
// const { Search } = Input;

function ModalDetailTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_, setLoadingState] = useContext(LoadingContext);
  const { taskDetailModal } = useSelector(state => state.userReducer)
  const userState = useSelector(state => state.userReducer)


  const { state: data1 = [] } = useAsync({
    dependencies: [],
    service: () => fetchProjectTaskTypeAPI(),
  })
  const { state: data2 = [] } = useAsync({
    dependencies: [],
    service: () => fetchProjectPriorityAPI(),
  })
  const { state: data3 = [] } = useAsync({
    dependencies: [],
    service: () => fetchProjectStatusIdAPI(),
  })
  const [arrPriority, setPriority] = useState(data2);
  const [arrStatus, setStatus] = useState(data3);
  const [arrTaskType, setTaskType] = useState(data1);

  useEffect(() => {
    if (data1.length !== 0) {
      setTaskType(data1);
    }
  }, [data1])
  useEffect(() => {
    if (data2.length !== 0) {
      setPriority(data2);
    }
  }, [data2])
  useEffect(() => {
    if (data3.length !== 0) {
      setStatus(data3);
    }
  }, [data3])
  /////////////////////////////////////////////////////////////////
  const fetchDetailTask = async (x) => {
    setLoadingState({ isLoading: true });
    const result = await fetchGetTaskDetailAPI(x);
    setLoadingState({ isLoading: false });
    dispatch(setTaskDetail(result.data.content));
    dispatch(setReRenderDetail(false))
  }

  const fetchTypeTaskChange = async (data) => {
    setLoadingState({ isLoading: true });
    await fetchUpdateAllOfTaskAPI(data);
    setLoadingState({ isLoading: false });
    fetchDetailTask(taskDetailModal.taskId);
  }

  const fetchStatusChange = async (x) => {
    setLoadingState({ isLoading: true });
    await fetchUpdateStatusAPI(x);
    setLoadingState({ isLoading: false });
    fetchDetailTask(taskDetailModal.taskId);
  }

  const fetchUpdateTimeTrackingChange = async (x) => {
    setLoadingState({ isLoading: true });
    await fetchUpdateTimeTrackingAPI(x);
    setLoadingState({ isLoading: false });
    fetchDetailTask(taskDetailModal.taskId);
  }

  const fetchDeleteTask = async (x) => {
    setLoadingState({ isLoading: true });
    await fetchDeleteTaskAPI(x);
    setLoadingState({ isLoading: false });
    dispatch(setReRenderDetail(false));
  }
  /////////////////////////////////////////////////////////////////
  const [value, setValue] = useState('');
  const renderMemList = () => {
    return (

      <div >
        {
          taskDetailModal.assigness.map((mem, index) => {
            return (
              <div key={index} style={{ display: 'flex' }} className="item justify-content-center mb-1">
                <div className="avatar">
                  <img src={mem.avatar} />
                </div>
                <p className="name mt-1 ml-1 text-center" style={{ fontSize: '14px' }}>
                  {mem.name}&nbsp;
                  <button className='delete-btn'><i className="fa fa-times" style={{ marginRight: 5 }}
                    onClick={() => {
                      let listmem = taskDetailModal;
                      let memList = taskDetailModal.assigness?.filter((ele) => {
                        return ele.id !== mem.id
                      })
                      listmem.assigness = memList;
                      console.log(memList, taskDetailModal)
                      fetchTypeTaskChange(listmem);
                    }}
                  />
                  </button>
                </p>
              </div>
            )
          })
        }

        {
          <Popover placement='top' title={'Add User'} content={() => {
            return <AutoComplete
              placeholder="Search with `V`"
              options={userState.projectMemList?.map((user, index) => {
                return { label: user.name, value: user.userId.toString() }
              })}
              value={value}

              onChange={(text) => {
                setValue(text);
                console.log(text)
              }}
              onSelect={(value, option) => {
                setValue(option.label);
                // fetchAddUser({
                //   'projectId': props.id,
                //   'userId': option.value,
                // });
                // setToggle(!toggle);
              }
              }
              style={{ width: '100%' }}
              onSearch={(value) => {
                // if (searchRef.current) {
                //   clearTimeout(searchRef.current);
                // }
                // searchRef.current = setTimeout(() => {
                //   fetchGetUser(value);
                console.log(value);
                // }, 500)
              }}
            />
          }} trigger='click'>
            <Button className='add-btn'>+ Add More</Button>
          </Popover>
        }
      </div>
    )
  }

  const [updateDescription, setUpdateDescription] = useState('');
  const [visibleEditor, setVisibleEditor] = useState(false);
  const renderDescription = () => {
    const jsxDes = parse(` ${taskDetailModal.description} `);
    return (
      <>
        {
          visibleEditor ?
            <div>
              <Editor
                name='description'
                initialValue={taskDetailModal.description}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={(content, edittor) => {
                  setUpdateDescription(content);
                }}
              />
              <button className='btn btn-primary m-2'
                onClick={() => {
                  setVisibleEditor(false);
                  let listmem = taskDetailModal;
                  listmem.description = updateDescription;
                  fetchTypeTaskChange(listmem);
                }}>Save</button>

              <button className='btn btn-primary m-2' onClick={() => { setVisibleEditor(false) }}>Close</button>
            </div>
            : <div onClick={() => { setVisibleEditor(!visibleEditor) }}> {jsxDes}</div>
        }
      </>
    )
  }
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining, originalEstimate } = taskDetailModal;
    const max = Number(originalEstimate);
    const percent = Math.round(Number(timeTrackingSpent) / max * 100)
    return (
      <div className='container'>
        <div className='d-flex' >
          <i className="fa fa-clock" />
          <div style={{ width: '100%' }}>
            <div className="progress">
              <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p className="logged">{timeTrackingSpent}h logged</p>
              <p className="estimate-time">{max - Number(timeTrackingSpent)}h remaining</p>
            </div>
          </div>
        </div>

        <div className='row' >
          <div className=' col-6'>
            <input className='form-control' value={timeTrackingSpent} name='timeTrackingSpent' onChange={(e) => {
              let listmem = taskDetailModal;
              listmem.timeTrackingSpent = e.target.value || 0;
              fetchTypeTaskChange(listmem);
            }}
              onBlur={() => {
                let listmem = taskDetailModal;
                listmem.timeTrackingRemaining = max - Number(timeTrackingSpent);
                fetchTypeTaskChange(listmem);
              }}
            />
          </div>
          <div className=' col-6'>
            <input className='form-control' value={max - Number(timeTrackingSpent)} name='timeTrackingRemaining' disabled />
          </div>

        </div>
      </div>
    )
  }

  const handleCancel = () => {
    dispatch(setTaskModal(false));
  };
  return (

    // <!-- Info Modal -->
    <Modal title="Task Detail" open={userState.setTaskModal} onCancel={handleCancel} footer={true}>

      <div className="modal-header p-0 mb-4" style={{ alignItems: 'center', borderBottom: 'none' }}>
        <div className="task-title" >
          <div className='taskType_boder'>
            {(taskDetailModal.taskTypeDetail.id === 2) ? <i className="fa-solid fa-bookmark ml-4"></i> : ((taskDetailModal.taskTypeDetail.id === 1) ? <i className="fa-solid fa-circle-exclamation ml-4" style={{ color: 'red' }}></i> : '')}
            <select className="custom-select" value={taskDetailModal.taskTypeDetail.id}
              onChange={(e) => {
                let listmem = taskDetailModal;
                listmem.typeId = e.target.value;
                console.log(listmem)
                fetchTypeTaskChange(listmem)
              }}
            >
              {arrTaskType.map((item, index) => {
                return (
                  <option key={index} value={item.id}>{(item.taskType === 'new task') ? 'Task' : 'Bug'}</option>
                )
              })}
            </select>
          </div>
          <h5 className='ml-3 mb-0'>{taskDetailModal.taskName}</h5>
        </div>
        <div style={{ display: 'flex' }} className="task-click">
          <div>
            <i className='fab fa-telegram-plane mr-1' />
            <span style={{ paddingRight: 20 }}>Give feedback</span>
          </div>
          <div>
            <i className="fa fa-link mr-1" />
            <span style={{ paddingRight: 20 }}>Copy link</span>
          </div>
          <button type="button" className="close" style={{ fontSize: '20px' }} onClick={() => { fetchDeleteTask(taskDetailModal.taskId); handleCancel() }}>
            <i className="fa fa-trash-alt" />
          </button>

        </div>
      </div>
      <div className="modal-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <p className="issue">This is an issue of type: {(taskDetailModal.taskTypeDetail.taskType === 'new task') ? 'Task' : 'Bug'}.</p>
              <div className="description" onBlur={() => { setVisibleEditor(false) }} tabIndex='1'>
                <h6>Description</h6>
                {renderDescription()}
              </div>

              <div className="comment">
                <h6>Comment</h6>
                <div className="block-comment" style={{ display: 'flex' }}>
                  <div className="avatar">
                    <img src={require('../../assets/img/download (1).jfif')} />
                  </div>
                  <div className="input-comment">
                    <input type="text" placeholder="Add a comment ..." />
                    <p>
                      <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                      <span>press
                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                        to comment</span>
                    </p>
                  </div>
                </div>
                <div className="lastest-comment">
                  <div className="comment-item">
                    <div className="display-comment" style={{ display: 'flex' }}>
                      <div className="avatar">
                        <img src={require('../../assets/img/download (1).jfif')} />
                      </div>
                      <div>
                        <p style={{ marginBottom: 5 }}>
                          Lord Gaben <span>a month ago</span>
                        </p>
                        <p style={{ marginBottom: 5 }}>
                          Lorem ipsum dolor sit amet, consectetur
                          adipisicing elit. Repellendus tempora ex
                          voluptatum saepe ab officiis alias totam ad
                          accusamus molestiae?
                        </p>
                        <div>
                          <span style={{ color: '#929398' }}>Edit</span>
                          •
                          <span style={{ color: '#929398' }}>Delete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="status">
                <h6>STATUS</h6>
                <select className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {
                  fetchStatusChange({
                    taskId: taskDetailModal.taskId,
                    statusId: e.target.value,
                  })
                }}>
                  {arrStatus.map((item, index) => {
                    return (
                      <option key={index} value={item.statusId}>{item.statusName}</option>
                    )
                  })}
                </select>

              </div>
              <div className="assignees mb-3">
                <h6>ASSIGNEES</h6>
                {renderMemList()}
              </div>

              <div className="priority" style={{ marginBottom: 20 }}>
                <h6>PRIORITY</h6>
                <select className="custom-select" value={taskDetailModal.priorityId} onChange={(e) => {
                  let listmem = taskDetailModal;
                  listmem.priorityId = e.target.value;
                  fetchTypeTaskChange(listmem);
                }}>
                  {arrPriority.map((item, index) => {
                    return (
                      <option key={index} value={item.priorityId}>{item.priority}</option>
                    )
                  })}
                </select>
              </div>

              <div className="estimate">
                <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                <input type="text" className="estimate-hours" value={taskDetailModal.originalEstimate}
                  onChange={(e) => {
                    let listmem = taskDetailModal;
                    listmem.originalEstimate = e.target.value || 0;
                    fetchTypeTaskChange(listmem);
                  }}
                  onBlur={() => {
                    let listmem = taskDetailModal;
                    listmem.timeTrackingRemaining = Number(taskDetailModal.originalEstimate) - Number(taskDetailModal.timeTrackingSpent);
                    fetchTypeTaskChange(listmem);
                  }}
                />
              </div>
              <div className="time-tracking">
                <h6>TIME TRACKING</h6>
                {renderTimeTracking()}

              </div>
              <div style={{ color: '#929398' }}>Create at a month ago</div>
              <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
            </div>
          </div>
        </div>
      </div>

    </Modal>
  )
}

export default ModalDetailTask