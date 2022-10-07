import axios from "axios";
import { request } from "../configs/axios";


const fetchMovieDetailAPI = (movieId) =>{
    return request({
        url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
        method: 'GET',
    })
}

const addMovieUploadImage = (data) => {
    return request({
      url: '/QuanLyPhim/ThemPhimUploadHinh',
      method: 'POST',
      data,
    });
  };
  
  const updateMovieUploadImage = (data) => {
    return request({
      url: '/QuanLyPhim/CapNhatPhimUpload',
      method: 'POST',
      data,
    });
  }
  const deleteMovieAPI = (movieId) => {
    return request({
      url: `/QuanLyPhim/XP?MaPhim=${movieId}`,
      method: 'DELETE',
    });
  }

  const bannerMovieApi = () => {
    return request({
      url: '/QuanLyPhim/LayDanhSachBanner',
      method: 'GET',
  })
  }

export { fetchMovieDetailAPI, addMovieUploadImage, updateMovieUploadImage, deleteMovieAPI, bannerMovieApi};