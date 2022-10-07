import React from 'react'
import ContentMain from './ContentMain'
import InfoMain from './InfoMain'
import "./index.scss";
import ModalEdit from 'pages/Modal/ModalEdit';

function MBoard() {
  return (
      <div className='main'>
        <h3>Cyber Board</h3>
        <InfoMain />
        <ContentMain />
      </div>

  )
}

export default MBoard