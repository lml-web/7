import axios from "axios"
import { Loading } from 'element-ui';
<<<<<<< HEAD
import { Guid } from '@/plugins/guid.js'
let serve = axios.create({

   //  baseURL:"https://wap.365msmk.com"
   baseURL: "http://120.53.31.103:84",
   timeout:5000

=======
import {Guid} from "@/plugins/guid.js"
let serve=  axios.create({

//  baseURL:"https://wap.365msmk.com",
   baseURL:"http://120.53.31.103:84",
   timeout:5000
>>>>>>> 9b08959d556af362f40c4e9da170f1e497679df4

})

let loadingInstance1;
<<<<<<< HEAD
// 请求拦截
serve.interceptors.request.use((req) => {
   // 如果有token的话就在请求头里面加入token，以判断是哪个用户请求的
   if (localStorage.Token) {
      req.headers.authorization = `Bearer${localStorage.Token}`
   }
   // 再设置id
   if (localStorage.Token) {
      req.headers.deviceid = localStorage.deviceid
   } else {
      // 如果没有的话就把id初始化
      Guid.NewGuid(toString('D'))
      // 初始化后再加入id
      req.headers.deviceid = localStorage.deviceid
   }
   // 设置类型为h5
   req.headers.devicetype = 'H5'



   loadingInstance1 = Loading.service({ background: "rgba(0, 0, 0, 0.8)", text: "拼命加载中", fullscreen: true, spinner: 'el-icon-loading' });
   return req
=======
serve.interceptors.request.use((req)=>{

   if(localStorage.Token){  //把token 放到请求头上
        
      req.headers.authorization=`Beaer ${localStorage.Token}`
   }

   if(localStorage.deviceid){  //设置设备id
      req.headers.deviceid=localStorage.deviceid
   }else{
      Guid.NewGuid(toString("D"))
      req.headers.deviceid=localStorage.deviceid

   }
    req.headers.deviceType="H5"  //设备类型

   loadingInstance1 = Loading.service({background:"rgba(0, 0, 0, 0.8)", text:"拼命加载中", fullscreen: true, spinner:'el-icon-loading'});
  
 return req
>>>>>>> 9b08959d556af362f40c4e9da170f1e497679df4

})

// 响应拦截
serve.interceptors.response.use((res) => {

   loadingInstance1.close()

   return res.data

})

export default serve