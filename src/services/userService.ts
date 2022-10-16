import httpUtil from "../tools/httpUtil";

function userRegister(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/user/register", params).then(
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

function getMemberInfo(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("get", "/word/user/member/info", params).then(
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

export { userRegister, getMemberInfo };
