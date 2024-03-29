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
export const  getProbability =(params)=>{
  return axios.request({
    url:`${Base}/bulletin/warning/probability`,
    method:'get',
    params:params
  })
};
export const  getWarningList =(params)=>{
  return axios.request({
    url:`${Base}/bulletin/warning/list`,
    method:'get',
    params:params
  })
};
export const  getNBM =(params)=>{
  return axios.request({
    url:`${Base}/analysis/nbm`,
    method:'get',
    params:params
  })
};
