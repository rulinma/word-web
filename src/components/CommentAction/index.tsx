import React, { FC, useEffect, useState } from "react";

import { thumbComment, deleteComment } from "services/commentActionService";

import "./index.css";

interface Props {
  // any props that come into the component
  id?: string;
  count?: number;
  word?: string;
  thumb?: boolean;
  userId?: number;
  content?: string;
  addTime?: string;
  deletedComment: (commentId: number) => void;
}

const CommentAction: FC<Props> = ({ ...props }) => {
  const { id, count, word, thumb, userId, content, addTime } = props;
  console.log("id:", id, "count", count, "word", word, "userId", userId);
  const [activeThumb, setActiveThumb] = useState(thumb);
  const [thumbCount, setThumbCount] = useState(count);
  const [deleted, setDeleted] = useState(false);
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    console.log("use effect comment: ");
  }, []);

  const thumbCommit = (e: any) => {
    // console.log("thumb up", this);
    // console.log("word thumb comments: ", word);
    // console.log("e: ", e);
    // console.log("e key: ", e.target.id, " text " + e.target.innerText);
    let flag = 0;
    if (activeThumb) {
      setThumbCount((thumbCount === undefined ? 0 : thumbCount) - 1);
    } else {
      setThumbCount((thumbCount === undefined ? 0 : thumbCount) + 1);
      flag = 1;
    }
    setActiveThumb(!activeThumb);

    // 发送点赞
    const commentId = id === undefined ? 0 : id;
    (async function anyNameFunction() {
      const result = await thumbComment({
        commentId: commentId,
        action: 1,
        type: flag,
      });
      console.log("comment thumb resp", result);
    })();
  };

  const deleteCommentById = (e: any) => {
    // console.log("thumb up", this);
    const commentId = id === undefined ? "" : id;
    console.log("delete comment ", commentId);

    (async function anyNameFunction() {
      const result = await deleteComment(commentId);
      console.log("comment delete resp", result);
    })();

    // remove this comment
    // pass to parent remove comment
    setDeleted(true);
    console.log("deleteCommentById end");
  };

  const setOwn = (userId: any): boolean => {
    console.log("userId : ", userId);
    console.log("userId username : ", userid);
    if (userid === userId + "") {
      console.log("userId usernamex : ", userid);
      return true;
    }
    return false;
  };

  return (
    <li key={id} className="comment_li">
      <div>
        {!deleted && (
          <div>
            {/* <span className="comment_author">id:{id}</span> */}
            <span className="comment_extra">
              {addTime?.replace("T", " ").substring(2, 16)}
            </span>
          </div>
        )}

        {!deleted && (
          <div className="comment">
            <span className="word_comment_content">{content}</span>
          </div>
        )}

        <div className="comment_action">
          {/* 是自己的则显示 */}
          {setOwn(userId) && !deleted && (
            <span
              className="comments_delete"
              id={id?.toString()}
              onClick={deleteCommentById}
            >
              删除
            </span>
          )}

          {!deleted && (
            <span
              className={`${activeThumb ? "comment_like" : "comment_notlike"}`}
              onClick={thumbCommit}
            >
              <i className="fa fa-thumbs-up">{thumbCount}</i>
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default CommentAction;
