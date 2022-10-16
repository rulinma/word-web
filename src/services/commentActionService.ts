import httpUtil from "../tools/httpUtil";

function getComments(params: any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/comments/get", {
      "word": params.word,
      "offset": params.offset,
      "limit": params.limit
    }).then(
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

function thumbComment(params : any) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/comments/action/thumb", {
      "commentId": params.commentId,
      "action": params.action,
      "type": params.type
    }).then(
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

function commentToWord(word : any,  content: string) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/comments/add",
      { "word": word, "content": content }).then(
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

function deleteComment(commentId : string) {
  return new Promise((resolve, reject) => {
    httpUtil("post", "/word/comments/delete/" + commentId).then(
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

export { getComments, thumbComment, commentToWord, deleteComment };
