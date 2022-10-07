import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthGuards() {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  // useEffect(()=>{

  // },[]);

  useEffect(()=>{
    if (!userState.userInfor){
      navigate("/login")          
    }
    // console.log(userState.userInfor, 'hello'); cho register làm con của login thì vào đc ko ta ?
    // em thấy để cùng cấp là đc mà, sao phải cho login là con regítẻ chi, nãy e sửa xong nó cũng vào đc login thôi, nên a ko bik để register vào trong login thì gọi ra đc ko
    // naxy em suwar qua dc register r ma, gio cung qua dc r a
},[]);
if (!userState.userInfor) {
  return null
}
  return (
    <Outlet />
  )
}
