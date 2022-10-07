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
import { setCategory, setEditDataProject } from 'store/actions/user.action';
import * as Yup from 'yup';


function EditForm(props) {
    const { state: CategoryList = [] } = useAsync({
        dependencies: [],
        service: () => fetchProjectCategoryAPI(),   
      })

    const userState = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const submitForm = (e) => {
        handleSubmit();
        e.preventDefault();
        alert('submit edit');
    }
    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = props;


    useEffect(() => {
        dispatch(setEditDataProject(
            {
                setOpen: true,
                infor: <EditForm />,
                callBackSubmit: submitForm,
                data: userState.detail.data,
            }
        ))
    }, [])
    useEffect(() => {
        if (CategoryList.length) {
          dispatch(setCategory(CategoryList));
        }
      }, [CategoryList])

      const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
      }
      
    const { id, projectName, description, categoryId } = userState.detail.data;
    return (

        <form className='container' onSubmit={submitForm} onChange={handleChange}>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Id</p>
                        <input disabled className='form-control' name='id' value={id} />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Name</p>
                        <input className='form-control' name='projectName' value={projectName} onChange={handleChange}/>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Category</p>
                        <select name="categoryId" className='form-control' defaultValue={categoryId} onChange={handleChange}>
                            {
                                userState?.category.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Description</p>
                        <Editor
                            name='description'
                            initialValue="<p>This is the initial content of the editor.</p>"
                            value={description}
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
            </div>


        </form>
    )
}
const CreateProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        console.log(props.projectEdit)
        return {
            id: props.projectEdit.id,
            projectName: props.projectEdit.projectName,
            creator: props.projectEdit.creator.id,
            description: props.projectEdit.description,
            categoryId: props.projectEdit.categoryId,
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: async (values, { props, setSubmitting }) => {

          try {
            props.setLoadingState(true);
            await fetchUpdateProjectDetailAPI(props.projectEdit.id ,values);
            props.setLoadingState(false);
          }
          catch
          {
            console.log('fail')
          }
          

        // props.navigate('/project-management/project')
        // console.log(props.navigate, "HELLO"); // cho nay goi dc navigate r ne a
    },
    displayName: 'CreateProjectFormit',
})(EditForm)

const CreateProjectWrapper = (props) => {
    const navigate = useNavigate();
    const [_, setLoadingState] = useContext(LoadingContext);

    return <CreateProjectForm navigate={navigate} setLoadingState={setLoadingState} {...props} />
}


const mapStateToProps = (state) => ({
    projectEdit: state.userReducer.detail.data
})

export default connect(mapStateToProps)(CreateProjectWrapper);

