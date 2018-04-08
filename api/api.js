import axios from 'axios'

let Base ='/api';

export const getStat =(params) =>{
  return axios.request({
    url:`${Base}/statistics/stat`,
    method:'get',
    data:params
  })
};


export const  getBulletin =(params)=>{
  return axios.request({
    url:`${Base}/bulletin/`,
    method:'get',
    params:params
  })
};
export const  getBulletinCategory =(params)=>{
  return axios.request({
    url:`${Base}/statistics/category`,
    method:'get',
    params:params
  })
};

export const  getBulletinStat =(params)=>{
  return axios.request({
    url:`${Base}/statistics/stockstat`,
    method:'get',
    params:params
  })
};
export const  getAccount =(params)=>{
  return axios.request({
    url:`${Base}/statistics/getaccount`,
    method:'get',
    params:params
  })
};


