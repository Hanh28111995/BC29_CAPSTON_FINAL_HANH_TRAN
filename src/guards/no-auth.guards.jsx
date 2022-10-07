import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NoAuthGuards() {
    const userState = useSelector((state)=> state.userReducer);
    const navigate = useNavigate();
    // const [pathname] = useLocation();

    useEffect(()=>{
        if (userState.userInfor){
          navigate("/project-management" )          
        }
        // console.log(userState.userInfor, 'hello');
    },[]);
  return (
    <Outlet />
  )
}
