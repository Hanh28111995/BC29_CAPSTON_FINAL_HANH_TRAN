import { ConfigContext } from 'antd/lib/config-provider';
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
import { setTaskDetail } from 'store/actions/user.action';
import { fetchProjectTaskTypeAPI } from 'services/project';
import { fetchUpdateAllOfTaskAPI } from 'services/project';
import './index.scss'
import { Editor } from '@tinymce/tinymce-react';

function ModalDetailTask() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_, setLoadingState] = useContext(LoadingContext);
  const { taskDetailModal } = useSelector(state => state.userReducer)

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
  const fetchTypeTaskChange = async (data) => {
    try {
      setLoadingState({ isLoading: true });
      await fetchUpdateAllOfTaskAPI(data);
      setLoadingState({ isLoading: false });
      // dispatch(setTaskDetail(result.data.content));
    }
    catch (error) {
      console.log(error)
    }
  }


  const fetchDetailTask = async (x) => {
    setLoadingState({ isLoading: true });
    const result = await fetchGetTaskDetailAPI(x);
    setLoadingState({ isLoading: false });
    dispatch(setTaskDetail(result.data.content));
  }

  const fetchStatusChange = async (x) => {
    setLoadingState({ isLoading: true });
    await fetchUpdateStatusAPI(x);
    setLoadingState({ isLoading: false });
    fetchDetailTask(taskDetailModal.taskId);
  }
  const fetchPriorityChange = async (x) => {
    setLoadingState({ isLoading: true });
    await fetchUpdatePriorityAPI(x);
    setLoadingState({ isLoading: false });
    fetchDetailTask(taskDetailModal.taskId);
  }

  const fetchUpdateEstimateChange = async (x) => {
    setLoadingState({ isLoading: true });
    await fetchUpdateEstimateAPI(x);
    setLoadingState({ isLoading: false });
    fetchDetailTask(taskDetailModal.taskId);
  }

  const fetchUpdateTimeTrackingChange = async (x) => {
    setLoadingState({ isLoading: true });
    await fetchUpdateTimeTrackingAPI(x);
    setLoadingState({ isLoading: false });
    fetchDetailTask(taskDetailModal.taskId);
  }
  /////////////////////////////////////////////////////////////////

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
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
              <p className="estimate-time">{timeTrackingRemaining}h remaining</p>
            </div>
          </div>
        </div>

        <div className='row' >
          <div className=' col-6'>
            <input className='form-control' />
          </div>
          <div className=' col-6'>
            <input className='form-control' />
          </div>

        </div>
      </div>
    )
  }
  return (
    // <!-- Info Modal -->
    <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title" >
              {(taskDetailModal.taskTypeDetail.id === 2) ? <i className="fa-solid fa-bookmark ml-4"></i> : ((taskDetailModal.taskTypeDetail.id === 1) ? <i className="fa-solid fa-circle-exclamation ml-4" style={{ color: 'red' }}></i> : '')}
              <select className="custom-select" value={taskDetailModal.taskTypeDetail.id}
                onChange={(e) => {
                  let listmem = taskDetailModal.assigness.map((item, index) => {
                    return item.id              
                  })
                  fetchTypeTaskChange({
                    taskId: taskDetailModal.taskId,
                    typeId: e.target.value,
                    listUserAsign: listmem,
                    taskName: taskDetailModal.statusId,
                    description: taskDetailModal.description,
                    statusId: taskDetailModal.statusId,
                    originalEstimate: taskDetailModal.originalEstimate,
                    timeTrackingSpent: taskDetailModal.timeTrackingSpent,
                    timeTrackingRemaining: taskDetailModal.timeTrackingRemaining,
                    projectId: taskDetailModal.projectId,
                    priorityId: taskDetailModal.priorityId,
                  })
                }}
              >
                {arrTaskType.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>{(item.taskType === 'new task') ? 'Task' : 'Bug'}</option>
                  )
                })}
              </select>
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
              <i className="fa fa-trash-alt" style={{ cursor: 'pointer', paddingTop: '2px' }} />
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: {(taskDetailModal.taskTypeDetail.taskType === 'new task') ? 'Task' : 'Bug'}.</p>
                  <div className="description">
                    <p>Description</p>
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
                    // onEditorChange={handleEditorChange}
                    />
                    {/* <section>
                      {parse(` ${taskDetailModal.description} `)}
                    </section> */}
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
                    <div style={{ display: 'flex', flexDirection: 'column ' }}>
                      {
                        taskDetailModal.assigness.map((mem, index) => {
                          return (
                            <div key={index} style={{ display: 'flex' }} className="item justify-content-center mb-1">
                              <div className="avatar">
                                <img src={mem.avatar} />
                              </div>
                              <p className="name mt-1 ml-1 text-center" style={{ fontSize: '14px' }}>
                                {mem.name}&nbsp;
                                <i className="fa fa-times" style={{ marginRight: 5 }} />
                              </p>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <i className="fa fa-plus" style={{ marginRight: 5 }} /><span>Add more</span>
                    </div>
                  </div>

                  {/* <div className="reporter">
                    <h6>REPORTER</h6>
                    <div style={{ display: 'flex' }} className="item">
                      <div className="avatar">
                        <img src={require('../../assets/img/download (1).jfif')} />
                      </div>
                      <p className="name">
                        Pickle Rick
                        <i className="fa fa-times" style={{ marginLeft: 5 }} />
                      </p>
                    </div>
                  </div> */}

                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select className="custom-select" value={taskDetailModal.priorityId} onChange={(e) => {
                      fetchPriorityChange({
                        taskId: taskDetailModal.taskId,
                        priorityId: e.target.value,
                      })
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
                    <input type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                      fetchUpdateEstimateChange({
                        taskId: taskDetailModal.taskId,
                        originalEstimate: e.target.value,
                      })
                    }} />
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
        </div>
      </div>
    </div >

  )
}

export default ModalDetailTask