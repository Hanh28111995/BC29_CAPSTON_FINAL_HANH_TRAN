import { Editor } from '@tinymce/tinymce-react';
import { withInfo } from 'antd/lib/modal/confirm';
import { withFormik, yupToFormErrors } from 'formik';
import { useAsync } from 'hooks/useAsync';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchCreateProjectAPI } from 'services/project';
import { fetchProjectCategoryAPI } from 'services/project';
import { setCategory } from 'store/actions/user.action';
import { LoadingContext } from 'contexts/loading.context';
import * as Yup from 'yup';
import { useContext } from 'react';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss'


function CreateProjectTable(props) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userReducer);
  const { state: CategoryList = [] } = useAsync({
    dependencies: [],
    service: () => fetchProjectCategoryAPI(),
  })


  const dispatch = useDispatch();

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = props;

  useEffect(() => {
    if (CategoryList.length) {
      dispatch(setCategory(CategoryList));
    }
  }, [CategoryList])

  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content)
  }

  return (
    <div className=''>
      <h3>Create Project</h3>
      <form className='form_createProject w-100' onSubmit={handleSubmit} onChange={handleChange}>
        <div className='form-group'>
          <p>Name</p>
          <input className='form-control' name='projectName' />
        </div>
        <div className='form-group w-100'>
          <p>Description</p>
          <Editor
            name='description'
            initialValue="<p>This is the initial content of the editor.</p>"
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
        <div className='form-group'>
          <select name="categoryId" className='form-control' onChange={handleChange}>
            {
              userState?.category.map((item, index) => {
                return <option value={item.id} key={index}>{item.projectCategoryName}</option>
              })
            }
          </select>
        </div>
        <button className='btn btn-outline-primary' type='submit'>Create Project</button>
      </form>
    </div>
  )
}


const CreateProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    // console.log('props', props.ListCategory)
    return {
      projectName: '',
      description: '',
      categoryId: props.ListCategory[0]?.id,
    }
  },
  validationSchema: Yup.object().shape({

  }),
  handleSubmit: async (values, { props, setSubmitting }) => {

    try {
      props.setLoadingState(true);
      await fetchCreateProjectAPI(values);
      props.setLoadingState(false);
    }
    catch (err) {
      notification.warning({
        description: `${err.response.data.content}`,
      });
    }

    props.navigate('/project-management/board')
    // console.log(props.navigate, "HELLO"); // cho nay goi dc navigate r ne a
  },
  displayName: 'CreateProjectFormit',
})(CreateProjectTable)

const CreateProjectWrapper = (props) => {
  const navigate = useNavigate();
  const [_, setLoadingState] = useContext(LoadingContext);

  return <CreateProjectForm navigate={navigate} setLoadingState={setLoadingState} {...props} />
}


const mapStateToProps = (state) => ({
  ListCategory: state.userReducer.category
})

export default connect(mapStateToProps)(CreateProjectWrapper);