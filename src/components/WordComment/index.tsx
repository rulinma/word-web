import React, { FC, useEffect, useState } from "react";
import { Button, Space, TextArea } from "antd-mobile";
import { throttle } from "lodash";
import { getComments } from "services/commentActionService";
import { commentToWord } from "services/commentActionService";
import CommentAction from "../CommentAction";
import { message } from "antd";
import moment from "moment";
import "./index.css";
interface Props {
  // any props that come into the component
  word: string;
  visiable?: boolean;
  currentIndex?: number;
  size?: number;
  total?: number;
}

interface CommentProp {
  id?: any;
  content?: string;
  count?: number;
  thumb?: number;
  addTime?: string;
  userId?: number;
}

const WordComment: FC<Props> = ({ ...props }) => {
  // console.log(props);
  // 解析构

  const userid = localStorage.getItem("userid");

  // const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const { word, visiable } = props;

  const [commentText, setCommentText] = useState("");
  const [commentWord, setCommentWord] = useState("");
  const [comments, setComments] = useState<CommentProp[]>();

  useEffect(() => {
    // console.log("init comment: ");
    window.addEventListener("scroll", useFn);

    // 组件销毁时移除侦听器
    return () => {
      window.removeEventListener("scroll", useFn);
      // 删除
      localStorage.removeItem("offset");
      localStorage.removeItem("word");
      localStorage.removeItem("more");
    };
  }, []);

  const isTouchBottom = (handler: any) => {
    // 文档显示区域高度
    const showHeight = window.innerHeight;
    // 网页卷曲高度
    const scrollTopHeight =
      document.body.scrollTop || document.documentElement.scrollTop;
    // 所有内容高度
    const allHeight = document.body.scrollHeight;
    // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
    if (allHeight <= showHeight + scrollTopHeight) {
      handler();
    }
  };

  /**
   * 节流 判断是否触底
   * 将是否触底函数进行 节流 处理
   * @returns  function
   */
  const useFn = throttle(() => {
    // 此处调用 加载更多函数
    // console.log("has more ", hasMore);

    const more = localStorage.getItem("more");

    if (more) {
      isTouchBottom(loadMore);
    } else {
      // message.info("没有更多评论数据");
    }
  }, 500);

  useEffect(() => {
    setCommentWord(word!);
  }, [word]);

  useEffect(() => {
    (async function anyNameFunction() {
      localStorage.setItem("word", commentWord);
      localStorage.setItem("offset", "5");

      if (!commentWord) {
        return;
      }

      const result = await getComments({
        word: commentWord,
        offset: 0,
        limit: 5,
      });

      let commentsData = JSON.parse(JSON.stringify(result));

      let data = commentsData.data.records;
      setComments(data);
      // 是否有更多评论
      let hasMore = commentsData.data.hasMore;
      // setHasMore(hasMore === 1 ? true : false);
      // console.log("has more ", hasMore === 1 ? true : false);
      if (hasMore === 1) {
        localStorage.setItem("more", "1");
      } else {
        localStorage.removeItem("more");
      }
    })();

    // console.log("comment get end ", commentWord);
  }, [commentWord, setComments]);

  const addWordComment = () => {
    // console.log("comment: ", commentText);
    if (commentText === "") return;

    if (commentText.length < 10) {
      message.config({ top: 400, duration: 2, maxCount: 3 });
      message.error("评论长度 长度至少10");
      message.destroy("评论长度 长度至少10");
    }

    (async function anyNameFunction() {
      const result = await commentToWord(word, commentText);
      console.log("comment resp", result);
      let commentsData = JSON.parse(JSON.stringify(result));
      console.log("comments result ", commentsData);
      let commentAdd = [
        {
          id: commentsData.data.id,
          content: commentText,
          count: 0,
          action: 1,
          userId: Number(userid),
          addTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
      ];

      if (
        comments === undefined ||
        comments === null ||
        comments.length === 0
      ) {
        setComments((comments: any) => [...commentAdd]);
      } else {
        setComments((comments: any) => [...comments, ...commentAdd]);
      }

      // console.log("append comment ", comments);
    })();
  };

  const handleCommentChange = (value: string) => {
    // console.log("commet content ", value);
    setCommentText(value);
  };

  const deletedComment = (value: number): void => {
    // console.log("deleteComment ", value);
    // hide comment sync
  };

  const loadMore = (e: any): void => {
    const more = localStorage.getItem("more");
    if (!more) {
      return;
    }

    (async function anyNameFunction() {
      let offset = localStorage.getItem("offset");
      const word = localStorage.getItem("word");
      if (offset == null) {
        offset = "0";
      } else {
        let newOffset = parseInt(offset) + 5;
        localStorage.setItem("offset", newOffset.toString());
      }
      console.log("offset  word ", offset, word);
      const result = await getComments({
        word: word,
        offset: offset,
        limit: 5,
      });
      // console.log("comment resp", result);
      let commentsData = JSON.parse(JSON.stringify(result));
      // console.log("comments result ", commentsData);

      let newComments = commentsData.data.records;
      if (newComments != null && newComments !== undefined) {
        setComments((comments: any) => [...comments, ...newComments]);
        // 是否有更多评论
        let hasMore = commentsData.data.hasMore;
        // setHasMore(hasMore === 1 ? true : false);
        // console.log("has more ", hasMore);
        if (hasMore === 1) {
          localStorage.setItem("more", "1");
        } else {
          localStorage.removeItem("more");
        }
      }
    })();
  };

  return (
    <div className="comments">
      <div className="word_comment">
        <div className="word_comment_txt">
          <TextArea value={commentText} onChange={handleCommentChange} />
        </div>

        <div className="comment_submit">
          <Space wrap>
            <Button fill="outline" onClick={addWordComment}>
              提交
            </Button>
          </Space>
        </div>
      </div>

      <div className="word_comments">
        <ul>
          {comments &&
            comments.map((item) => (
              <CommentAction
                id={item?.id}
                count={item?.count}
                word={word}
                thumb={item?.thumb === 1 ? true : false}
                userId={item?.userId}
                content={item?.content}
                addTime={item.addTime}
                deletedComment={deletedComment}
                key={item?.id}
              ></CommentAction>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WordComment;
