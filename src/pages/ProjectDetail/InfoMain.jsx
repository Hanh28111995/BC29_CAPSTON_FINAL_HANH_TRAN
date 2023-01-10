import { useAsync } from 'hooks/useAsync'
import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchProjectDetailAPI } from 'services/project'


function InfoMain(props) {
    const renderAvatar = () => {
        return props.members?.map((user, index) => {
            return (
                <div key={index} className="avatar">
                    <img src={user?.avatar} alt={user?.avatar} />
                </div>
            )
        })
    }

    return (
        <div className="info w-100 row" >
            <div className="search-block" style={{ marginLeft: '15px',display: 'flex' }}>
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ marginLeft: '15px',display: 'flex'  }}>
                {renderAvatar()}
            </div>
            <div  style={{ marginLeft: '15px',display: 'flex' }} className="text notBuild">Only My Issues</div>
            <div  style={{ marginLeft: '15px',display: 'flex' }} className="text notBuild">Recently Updated</div>
        </div>
    )
}

export default InfoMain


