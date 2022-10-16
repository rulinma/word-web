import httpUtil from "../tools/httpUtil";

function loginIn(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/user/login", params).then(
      (res) => {
        resolve(res);
      },
      (error) => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

function loginOut(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/user/logout").then(
      (res) => {
        resolve(res);
      },
      (error) => {
        console.log("网络异常~", error);
        reject(error);
      }
    );
  });
}

export { loginIn, loginOut };
