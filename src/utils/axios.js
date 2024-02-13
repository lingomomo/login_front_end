//引入axios 用于封装我们的axios
import axios from "axios";
//引入element-ui 用于弹窗提示
import Element from 'element-ui'
//1.通用url请求地址
axios.defaults.baseURL = "http://localhost:8081";
// 2.配置通用的连接超时 50秒
const request = axios.create({
    timeout: 50000,
})
// 3.配置一个通用的响应拦截
//页面会在Login.vue组件里面发送axios请求 java一定会响应，响应的数据会先来到这里再去Login.vue
request.interceptors.response.use(res => {
    if (res.data.code == 200) {
        return res;
    }
}, err => {
    if (err.response == undefined) {
        Element.Message.error("ネットワーク接続がタイムアウトしました");
    } else {
        // 提示java的什么情况失败
        Element.Message.error(err.response.data.message);
    }
    //我们不能终止代码 不让他继续往下传递到Login.vue组件里面的axios里面去
    return Promise.reject("错误");
})
    
// 把js文件的对象导出去
export default request;