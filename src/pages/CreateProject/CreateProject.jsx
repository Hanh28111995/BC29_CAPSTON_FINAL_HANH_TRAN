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
    console.log(handleChange)
  }, [CategoryList])

    const handleEditorChange = (content, editor) => {
      setFieldValue('description', content)
    }

    return (
      <div className='container m-5'>
        <h3>CreateProject</h3>
        <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
          <div className='form-group'>
            <p>Name</p>
            <input className='form-control' name='projectName' value={values.projectName}/>
          </div>
          <div className='form-group'>
            <p>Description</p>
            <Editor
              name='Description'
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
      console.log('props', props.ListCategory)
      return {
        projectName: 'x',
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
      catch
      {
        console.log('fail')
      }

      props.navigate('/project-management/project')
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