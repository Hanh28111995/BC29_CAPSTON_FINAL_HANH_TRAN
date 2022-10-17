import React from 'react'
import ContentMain from './ContentMain'
import InfoMain from './InfoMain'
import "./index.scss";
import ModalEdit from 'pages/Modal/ModalEdit';
import { useParams } from 'react-router-dom';
import { useAsync } from 'hooks/useAsync';
import { fetchProjectDetailAPI } from 'services/project';
import { useEffect } from 'react';
import { useState } from 'react';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectListAPI } from 'services/project';
import { setMyProject } from 'store/actions/user.action';

function MBoard() {
  const param = useParams();

  const [projectDetail, setProjectDetail] = useState({})
  const userState = useSelector((state) => state.userReducer);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const { state: dataS = [] } = useAsync({
    dependencies: [toggle],
    service: () => fetchProjectListAPI(),
  })

  useEffect(() => {
    if (dataS.length !== 0) {
      let DATA = dataS.filter((ele) => {
        return ele.creator.id === userState.userInfor.id
      })
      dispatch(setMyProject(DATA));
    }
    
  }, [dataS]);


  const { state: data = [] } = useAsync({
    dependencies: [],
    service: () => fetchProjectDetailAPI(userState.myProject[0]?.id),
  })

  useEffect(() => {
    if (data.length !== 0) {
      console.log(data);
      setProjectDetail(data)
      console.log(data)
    }

  }, [data])
  return (
    <div className='main'>
      <h3>{projectDetail?.projectName}</h3>
      <section>
        {
          parse(` ${projectDetail?.description} `)
        }
      </section>
      <InfoMain members={projectDetail?.members} />
      <ContentMain projectDetail={projectDetail} />
    </div>

  )
}

export default MBoard