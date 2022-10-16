import React, { FC } from "react";
import { useState, useEffect, useRef } from "react";
import "./index.css";
import { Rate } from "antd-mobile";
import { Switch } from "antd";

import { getWordInfo } from "services/wordService";

const WordBasic: FC<API.WordInfo> = ({ ...props }) => {
  // console.log("word basic ", props);
  const { word } = props;
  const myrefAudio = useRef(null);

  const [wordInfo, setWordInfo] = useState<API.WordInfo>();

  const [autoSay, setAutoSay] = useState(false);

  const getWordInfoByWord = async (q: any) => {
    if (!q) return;

    try {
      const wordInfo = await getWordInfo(q);
      // console.log("word basic json data wordInfo: ", wordInfo, q);
      // console.log("json ", JSON.stringify(wordInfo));
      var jsObject = JSON.parse(JSON.stringify(wordInfo));
      // console.log("word basic json data jsObject: ", jsObject);
      // console.log("word basic json data: ", jsObject.data);
      jsObject.data.say =
        "https://dict.youdao.com/dictvoice?audio=" + q + "&type=1";
      // jsObject.data.image = "http://***"
      setWordInfo(jsObject.data);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    // console.log("word basic init");
    // get word info
    getWordInfoByWord(word);
    // console.log("word basic end");
  }, [word]);

  useEffect(() => {
    // 加载后执行
    const autoProuncation = window.localStorage.getItem("auto");
    if (autoProuncation) {
      setAutoSay(true);
    }
    if (autoSay) {
      (myrefAudio.current as any).play();
    }
  });

  const setAutoSayFunc = () => {
    if (!autoSay) {
      localStorage.setItem("auto", "auto");
    } else {
      localStorage.removeItem("auto");
    }

    setAutoSay(!autoSay);
  };

  return (
    <div>
      <div className="recommend">
        {/* <div className="leftrec"></div> */}
        {/* <div className="rightrec"></div> */}
        <div className="corerec">
          <div className="word_title">
            <span className="word_txt">{wordInfo?.word}</span>
            <span className="word_rank">
              <span className="rank">No. {wordInfo?.rank}</span>
            </span>
            <span className="auto">
              <Switch
                onChange={setAutoSayFunc}
                checked={autoSay}
                checkedChildren="发音"
                unCheckedChildren="关闭"
              />
            </span>
          </div>

          <div className="word_prouncation">
            <span className="text_prouncation">{wordInfo?.pronunciation}</span>
            <span
              className="prouncation"
              onClick={() => {
                // console.log("mouse click", wordInfo?.say);
                (myrefAudio.current as any).play();
              }}
            >
              <audio
                src={wordInfo?.say}
                id="myaudio"
                controls
                ref={myrefAudio}
                hidden
              ></audio>
              {/* <audio preload={"auto"} src={wordInfo?.say}></audio> */}
            </span>
            <span className="star">
              <Rate
                readOnly
                value={wordInfo?.star}
                style={{
                  // "--star-size": "32px",
                  "--active-color": "#548FFC",
                }}
              />
            </span>
          </div>
          <div className="word_pic">
            {/* <img src={Picture} width="100px" height="100px" alt="aiword" /> */}
            {wordInfo?.image && (
              <img
                src={wordInfo?.image}
                width="90px"
                height="90px"
                alt="aiword"
              />
            )}
          </div>
          <div className="word_explain" id="word_explain">
            {wordInfo?.translate?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordBasic;
