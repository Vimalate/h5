import axios from "axios";
// import router from './router'
// import Vue from 'vue'
import { Toast } from "vant";

const http = axios.create({
  baseURL: "http://192.168.4.178:10003/specialInspection",
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
    // if (localStorage.getItem('token') && localStorage.getItem('id')) {

    // }
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true,
      });
    }
    config.headers.Authorization = " ";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response) => {
    Toast.clear()
    const res = response.data
    if (res.status && res.status !== 200) {
        Toast.fail('获取数据失败')
        return Promise.reject(res || 'error')
      } else {
        return Promise.resolve(res)
      }
  },
  (err) => {
    console.dir(err);
    if (err.response.status === 401 || err.response.status === 402) {
      Toast.clear()
      console.log('error' + err)
    }
    Promise.reject(err);
  }
);
export default http;
