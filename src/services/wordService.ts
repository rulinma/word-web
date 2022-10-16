import httpUtil from "../tools/httpUtil";

/**
 * 获取首页列表
 */
function getWordInfo(key: string) {
  return new Promise((resolve, reject) => {
    httpUtil("get", "/word/basic/" + key).then(
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

function getWordRelative(key: string) {
  return new Promise((resolve, reject) => {
    httpUtil("get", "/word/relatives/" + key).then(
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

function getNextWord() {
  return new Promise((resolve, reject) => {
    httpUtil("get", "/word/recommend").then(
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

export { getWordInfo, getWordRelative, getNextWord };
