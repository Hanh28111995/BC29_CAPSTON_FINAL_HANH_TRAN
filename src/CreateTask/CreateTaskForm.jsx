import "./index.scss";
import { Editor } from '@tinymce/tinymce-react'
import { LoadingContext } from 'contexts/loading.context';
import { withFormik } from 'formik';
import { useAsync } from 'hooks/useAsync';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchUpdateProjectDetailAPI } from 'services/project';
import { fetchProjectCategoryAPI } from 'services/project';
import { setCategory, setEditDataProject, setEditSubmit, setMyProject, userSearch } from 'store/actions/user.action';
import * as Yup from 'yup';
import { Input, Radio, Select, Slider } from 'antd';
import { useState } from 'react';
import { fetchProjectListAPI } from "services/project";
import { fetchProjectTaskTypeAPI } from "services/project";
import { fetchProjectPriorityAPI } from "services/project";
import { useRef } from "react";
import { fetchGetUserAPI } from "services/project";
import { fetchCreateTaskAPI } from "services/project";
import { fetchProjectStatusIdAPI } from "services/project";
import { fetchMembersListAPI } from "services/project";
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
// const handleCHange = (value) => {
//     console.log(`Selected: ${value}`);
// };


function CreateTaskForm(props) {
    const [_, setLoadingState] = useContext(LoadingContext);

    const fetchGetUser = async (x) => {
        setLoadingState({ isLoading: true });

        try {
            const result = await fetchMembersListAPI(x);
            dispatch(userSearch(result.data.content));
            console.log(result.data.content)

        } catch (error) {
            if (error.response?.data.statusCode === 404) {
                dispatch(userSearch([]));
            }
        }
        setLoadingState({ isLoading: false });
    }

    const { state: data = [] } = useAsync({
        dependencies: [],
        service: () => fetchProjectListAPI(),
    })

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

    const [arrProject, setProjectList] = useState(data);
    const [arrTaskType, setProjectTaskType] = useState(data1);
    const [arrPriority, setProjectPriority] = useState(data2);
    const [arrStatusId, setStatusId] = useState(data3);




    const [TimeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

    const [size, setSize] = useState('middle');

    const dispatch = useDispatch();

    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = props;

    const userState = useSelector((state) => state.userReducer);
    const listOption = userState.list.map((item, index) => {
        { return { value: item.userId, label: item.name } }
    })

    const searchRef = useRef(null);

    const submitForm = () => {
        // e.preventDefault();
        handleSubmit();
    }

    useEffect(() => {
        if (data.length !== 0) {
            let DATA = data.filter((ele) => {
                return ele.creator.id === userState.userInfor.id
            })
            setProjectList(DATA);
            dispatch(setMyProject(DATA));
            dispatch(userSearch(DATA[0]?.members));
        }
        
        if (data1.length !== 0) {
            setProjectTaskType(data1);
        }
        if (data2.length !== 0) {
            setProjectPriority(data2);
        }
        if (data3.length !== 0) {
            setStatusId(data3);
        }
    }, [data]);

    useEffect(() => {

        dispatch(setEditSubmit(submitForm))
    }, [])

    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }


    // const { id, projectName, description, categoryId } = values.;
    return (
        <form className='container' onSubmit={submitForm}>

            <div className='form-group'>
                <p className='font-weight-bold'>Project </p>
                <select name="projectId" className='form-control' onChange={(e) => {
                    let { value } = e.target;
                    fetchGetUser(value);
                    setFieldValue('projectId', e.target.value);
                }}>
                    {arrProject.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Task Name </p>
                <input name="taskName" className='form-control' onChange={handleChange} />
            </div>
            <div className='form-group'>
                <p className='font-weight-bold'>Status </p>
                <select name="statusId" className='form-control' onChange={handleChange}>
                    {arrStatusId.map((item, index) => {
                        return <option key={index} value={item.statusId}>{item.statusName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p className='font-weight-bold'>Priority</p>
                        <select name="priorityId" className='form-control' onChange={handleChange}>
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p className='font-weight-bold'>Task Type</p>
                        <select name="typeId" className='form-control' onChange={handleChange} >
                            {arrTaskType.map((taskType, index) => {
                                return <option key={index} value={taskType.id}> {taskType.taskType}  </option>
                            })}
                        </select>
                    </div>
                </div>
                {/* {(taskType==='task')? (<i className="fa fa-bookmark" aria-hidden="true"></i>) : (<i className="fa-solid fa-circle-exclamation text-red"></i>)} */}
            </div>

            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p className='font-weight-bold'>Asignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            placeholder="Please select"
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values);
                            }}
                            style={{
                                width: '100%',
                            }
                            }
                            optionFilterProp="label"
                            options={listOption}
                            // onSearch={(value) => {
                            //     if (searchRef.current) {
                            //         clearTimeout(searchRef.current);
                            //     }
                            //     searchRef.current = setTimeout(() => {
                            //         fetchGetUser(value);
                            //     }, 500)
                            // }}
                            onSelect={(value) => {
                                console.log(value)
                            }
                            }
                        >
                            {children}
                        </Select>
                        <div className="row">
                            <div className="col-12" style={{ marginTop: '27px' }}>
                                <p className='font-weight-bold'>Original Estimate</p>
                                <input className="form-control" type='number' min='0' defaultValue='0' name="originalEstimate" onChange={handleChange} />

                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <p className='font-weight-bold'>Time Tracking</p>
                        <Slider defaultValue={30} value={TimeTracking.timeTrackingSpent} max={Number(TimeTracking.timeTrackingSpent) + Number(TimeTracking.timeTrackingRemaining)} />
                        <div className="row">
                            <div className="col-6 text-left note-font">{TimeTracking.timeTrackingSpent || '0'}h logged</div>
                            <div className="col-6 text-right note-font">{TimeTracking.timeTrackingRemaining || '0'}h remaining</div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <p className='font-weight-bold'>Time spent </p>
                                <input className="form-control" type='number' name="timeTrackingSpent" onChange={(e) => {
                                    setTimeTracking({
                                        ...TimeTracking,
                                        timeTrackingSpent: e.target.value,
                                    });
                                    setFieldValue('timeTrackingSpent', e.target.value);

                                }} />
                            </div>
                            <div className="col-6">
                                <p className='font-weight-bold'>Time remain </p>
                                <input className="form-control" type='number' name="timeTrackingRemaining" onChange={(e) => {
                                    setTimeTracking({
                                        ...TimeTracking,
                                        timeTrackingRemaining: e.target.value,
                                    });
                                    setFieldValue('timeTrackingRemaining', e.target.value);
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-12'>
                <div className='form-group'>
                    <p className='font-weight-bold'>Description</p>
                    <Editor
                        name='description'
                        initialValue={'string'}
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
                        onEditorChange={handleEditorChange}
                    />
                </div>
            </div>

        </form>
    )




}
const CreateTaskFormFormik = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            taskName: '',
            description: '',
            statusId: 1,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: props.myProject[0]?.id,
            typeId: 1,
            priorityId: 1,
            listUserAsign: [],
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: async (values, { props, setSubmitting }) => {
        console.log(values)
        try {
            props.setLoadingState(true);
            await fetchCreateTaskAPI(values);
            console.log(values);
            props.setLoadingState(false);
        }
        catch
        {
            console.log("HELLO");
        }
    },
    displayName: 'CreateTaskFormit',
})(CreateTaskForm)

const CreateTaskWrapper = (props) => {
    const navigate = useNavigate();
    const [_, setLoadingState] = useContext(LoadingContext);

    return <CreateTaskFormFormik navigate={navigate} setLoadingState={setLoadingState} {...props} />
}


const mapStateToProps = (state) => ({
    myProject: state.userReducer.myProject
})

export default connect(mapStateToProps)(CreateTaskWrapper);

