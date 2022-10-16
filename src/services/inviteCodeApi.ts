import httpUtil from "../tools/httpUtil";

function getInvite(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("get", "/word/invite/code/get", params).then(
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

export { getInvite };
