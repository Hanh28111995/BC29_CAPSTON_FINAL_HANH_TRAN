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
        <div className="info" style={{ display: 'flex' }}>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderAvatar()}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div>
    )
}

export default InfoMain


