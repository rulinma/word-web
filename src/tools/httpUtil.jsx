/**
 * 网络请求配置
 */
import axios from "axios";

function getLocalToken() {
  const token = window.localStorage.getItem("token");
  return token;
}

var axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8081/api',
  // 设置proxy
  // 1. package.json 设置 "proxy": "http://127.0.0.1:8081"
  // 2. 这里使用前端的地址 "http://127.0.0.1:3000"
  // 3. 代理跨域设置成功
  // baseURL: 'http://127.0.0.1:3000/api',
  // ngrok 代理时使用下面的地址，url每次会变，需要调整
  // baseURL: 'https://d85a-2409-8a1e-911e-ba70-49d4-e009-8b69-2913.jp.ngrok.io/api',
  baseURL: 'https://a2a28f59-0107-46c8-8399-39c2608671de.mock.pstmn.io/api',
  timeout: 100000,
  headers: {'X-Custom-Header': 'aiword'}
});

/**
 * http request 拦截器
 */
 axiosInstance.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
      "token": getLocalToken(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
 axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log("过期");
    }
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data);
        if(response) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axiosInstance.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axiosInstance.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        msag(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function deleted(url, data) {
  return new Promise((resolve, reject) => {
    axiosInstance.delete(url, {data: data}).then(
      (response) => {
        // 关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

// 后端统一接口处理，返回数据
export default function backend(fecth, url, param) {
  // let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        console.log("begin a get request,and url:", url);
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request GET failed.", error);
            reject(error);
          });
        break;
      case "post":
        console.log("begin a get post,and url:", url);
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.log("get request POST failed.", error);
            reject(error);
          });
        break;
        case "delete":
          console.log("begin a get delete, and url:", url , param);
          deleted(url, param)
            .then(function (response) {
              resolve(response);
            })
            .catch(function (error) {
              console.log("get request delete failed.", error);
              reject(error);
            });
          break;
      default:
        break;
    }
  });
}

// 失败提示
function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
    }
  }
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url, params, data) {
  if (data.code === -1) {
  }
}
