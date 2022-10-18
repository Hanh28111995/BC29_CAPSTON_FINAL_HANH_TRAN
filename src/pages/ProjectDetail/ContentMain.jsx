import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchGetTaskDetailAPI } from 'services/project';
import { setTaskDetail } from 'store/actions/user.action';
import { LoadingContext } from 'contexts/loading.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function ContentMain(props) {
  const dispatch = useDispatch();
  const [_, setLoadingState] = useContext(LoadingContext);
  const { projectDetail } = props
  const fetchDetailTask = async (x) => {
    setLoadingState({ isLoading: true });
    const result = await fetchGetTaskDetailAPI(x);
    setLoadingState({ isLoading: false });
    console.log(result.data.content)
    dispatch(setTaskDetail(result.data.content));
  }

  const renderCard = () => {
    return projectDetail?.lstTask?.map((taskListDetail, index) => {
      return (
        <div key={index} className="card pb-2" style={{ width: '17rem', height: 'auto' }}>
          <div className="card-header">
            {taskListDetail.statusName}
          </div>
          <ul className="list-group list-group-flush">
            {taskListDetail.lstTaskDeTail.map((task, index) => {
              return (
                //////VI TRI LAY DETAIL TASK
                <li  key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}
                  onClick={() => {
                    fetchDetailTask(task.taskId)
                  }}>
                  <p className='font-weight-300'>
                    {(task.taskTypeDetail.id === 2) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-solid fa-circle-exclamation" style={{ color: 'red' }}></i>)}
                    &nbsp;
                    {task.taskName}
                  </p>
                  <div className="block" style={{ display: 'flex' }}>
                    <div className="block-left">
                      <p className='text-danger'>{task.priorityTask.priority}</p>
                      {/* <i className="fa fa-bookmark" />
                      <i className="fa fa-arrow-up" /> */}
                    </div>
                    <div className="block-right">
                      <div className="avatar-group" style={{ display: 'flex' }}>
                        {
                          task.assigness?.map((mem, index) => {
                            return (
                              <div className="avatar" key={index}>
                                <img src={mem.avatar} alt={mem.avatar} />
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}

          </ul>
        </div>
      )
    })
  }
  return (
    <div className="content" style={{ display: 'flex' }}>
      {renderCard()}
    </div>
  )
}

export default ContentMain