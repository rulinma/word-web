import httpUtil from "../tools/httpUtil";

function getHistorys(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/user/record/roadmap", {
      "offset": params.offset,
      "limit":  params.limit,
      "filter": params.filter
    } ).then(
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

function setWordMaster(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/user/master/status", {
      "word": params.word,
      "master": params.master,
      "masterType": params.masterType
    } ).then(
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

export { getHistorys, setWordMaster };
