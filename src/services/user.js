import {TOKEN_CYBERSOFT,BASE_URL, GROUP_ID} from '../constants/common';
import { request } from "../configs/axios";

const loginAPI = (data) => {
  return request({
    data: data,
    url: '/Users/signin',
    method: "POST",
  });
};

const registerApi = (data) => {
  return request({
    data,
    url: '/Users/signup',
    method: "POST",
  });
};

const userListApi = ()=> {

  return request({
    url: '/Users/getUser',
    method: 'GET',
})
};

const deleteUserApi = (tk) => {
  return request({
    url: `Users/deleteUser?id=${tk}`,
    method: 'DELETE',
  });
}

const updateUserApi = (data) => {
  return request({
    url: 'Users/editUser',
    method: 'PUT',
    data,
  });
}





const userDetailApi = (tk) =>{
  return request({
      url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${tk}`,
      method: 'POST',
      data: tk,
  })
};

const addUserApi = (data) => {
  return request({
    url: '/QuanLyNguoiDung/ThemNguoiDung',
    method: 'POST',
    data,
  });
};


  

export { loginAPI, registerApi , userListApi, userDetailApi, addUserApi, updateUserApi, deleteUserApi};
