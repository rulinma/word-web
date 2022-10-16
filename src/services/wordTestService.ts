import httpUtil from "../tools/httpUtil";

function getTestTotal(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("get", "word/user/test/total", {
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

function getTestWord(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "word/user/test/get", {
      "testId": params.testId
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

function recordTestWord(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/user/test/record", {
      "word": params.word,
      "master": params.master,
      "type": params.type,
      "model": params.model
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

export { getTestTotal, getTestWord, recordTestWord };
