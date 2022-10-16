import React, { FC } from "react";
import { useEffect, useState } from "react";
import "./index.css";
import { useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";
import { useContext } from "react";
import { WordContext } from "../WordContext";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { getWordRelative, getNextWord } from "services/wordService";
import { isMobile } from "react-device-detect";

import "./index.css";

interface Props {
  // any props that come into the component
  word: string;
  visiable?: boolean;
}

interface RelativesProp {
  id?: number;
  word?: string;
  relativeWord?: string;
  rank?: number;
  chinese?: string;
  pronunciation?: string;
  star?: number;
  translate?: string[];
}

const WordMind: FC<Props> = ({ ...props }) => {
  const wordContext = useContext(WordContext);
  // console.log("wordContext:", wordContext);

  const [xmindShow, setXmindShow] = useState(false);

  const [relativeWord, setRelativeWord] = useState<RelativesProp[]>();

  let navigate = useNavigate();

  useEffect(() => {
    // console.log("xmind get data");
    const xmindShow = window.localStorage.getItem("xmindShow");
    if (xmindShow) {
      setXmindShow(true);
    }
  }, [wordContext]);

  const domNode = useRef<HTMLDivElement>(null);

  // A reference to the vis network instance
  const network = useRef<Network | null>(null);

  useEffect(() => {
    // An array of nodes
    // console.log("relative word: ", wordContext);
    const w = wordContext.word;
    if (w === undefined) {
      return;
    }
    (async function anyNameFunction() {
      //
      const result = await getWordRelative(w);
      // console.log("relatives result ", result);

      let jsObject = JSON.parse(JSON.stringify(result));
      const relatives = jsObject!.data;
      console.log("relatives words ", relatives);
      setRelativeWord(relatives);

      // console.log("relatives ", relatives);
      // set nodes
      var nodes: any[] = [];
      var edges: any[] = [];
      nodes.push({ id: w, label: w, font: "30px", color: "#fff" });
      // console.log("relatives len: ", relatives.length);
      const max = 8;
      if (relatives !== undefined) {
        for (var i = 0; i < relatives.length; i++) {
          if (i >= max) break;
          let temp = relatives[i];
          nodes.push({
            id: temp.relativeWord,
            label: temp.relativeWord,
            font: "20px",
          });
          edges.push({
            from: w,
            to: temp.relativeWord,
            id: temp.id,
            title: "No." + temp.rank === null ? 0 : temp.rank,
          });
        }
      }

      // refract useMemo
      const data = {
        nodes,
        edges,
      };

      // refract useMemo
      const options = {
        // height: "1000px",
        // width: "1000px",
        // textAlign: "center",
        layout: {
          // hierarchical: true,
          randomSeed: 1,
        },
        edges: {
          color: "#000",
          // shadow: true,
          // smooth: true,
          smooth: {
            enabled: true,
            // type: "cubicBezier",
            // roundness: 0.4,
            type: "continuous",
            forceDirection: "none",
            roundness: 0.65,
          },

          arrows: { to: true },
        },
        nodes: {
          color: "#fff",
          font: "16px arial #162FFA",
        },
        // borderWidth: 0,
        // border: "#fff",
        physics: {
          enabled: true,
        },
        interaction: {
          multiselect: true,
          dragView: true,
          // zoomView: false,
          selectConnectedEdges: false,
          hoverConnectedEdges: false,
          tooltipDelay: 200,
          hover: true,
        },
      };

      if (domNode.current) {
        network.current = new Network(domNode.current, data, options);

        // network.current.once("stabilized", function () {
        //   var scaleOption = { scale: 1.5 };
        //   network?.current?.moveTo(scaleOption);
        // });

        network.current.on("click", function (properties) {
          // console.log("properties", properties);
          // console.log("clicked node ", properties.nodes);
          if (properties.nodes.length === 0) {
            return;
          }
          // route到word/:id
          navigate("/word/" + properties.nodes, { replace: true });
          // console.log("nav:", properties.nodes);
        });
      }
    })();
  }, [navigate, wordContext, xmindShow]);

  const leftClick = (e: any) => {
    // console.log("<", e);
    // get from back service
    // navigate("/word/left");
    // window.history.back();
    navigate(-1);
  };

  const rightClick = (e: any) => {
    // console.log(">", e);
    // get from back service
    // get next word and navigate
    (async function anyNameFunction() {
      const result = await getNextWord();
      // console.log("result ", result);

      let jsObject = JSON.parse(JSON.stringify(result));
      const word = jsObject!.data!.word;
      navigate("/word/" + word);
    })();
  };

  const wordClick = (e: any, value: any) => {
    // console.log("wordClick value ", value);
    // console.log("wordClick e.target ", e.target);
    if (e.target.className === "prouncation") {
      console.log("prouncation clicked");
      return;
    }
    navigate("/word/" + value, { replace: true });
  };

  const prouncation = (e: any, value: any) => {
    console.log("prouncation value ", value);
    // console.log("e: ", e);
    if (e.target.className === "prouncation") {
      // "myaudio" + item.relativeWord
      let elem = document.getElementById("myaudio" + value)! as HTMLElement;
      (elem as any).play();
    }
  };

  const setXmindShowFunc = () => {
    if (!xmindShow) {
      localStorage.setItem("xmindShow", "auto");
    } else {
      localStorage.removeItem("xmindShow");
    }

    setXmindShow(!xmindShow);
  };

  return (
    <div className="xmind" id="xmind">
      <div className="xmindShow">
        <Switch
          onChange={setXmindShowFunc}
          checked={xmindShow}
          checkedChildren="图形"
          unCheckedChildren="文字"
        />
      </div>
      <div className="left_xmind" onClick={leftClick}></div>
      <div className="right_xmind" onClick={rightClick}></div>

      {xmindShow && <div id="graph" className="graph" ref={domNode} />}

      {!xmindShow && (
        <div className="relaitve_word" id="relaitve_word">
          <ul>
            {relativeWord &&
              relativeWord.map((item, index) => (
                <li
                  key={item.id}
                  onClick={(e) => wordClick(e, item.relativeWord)}
                >
                  {item.relativeWord}

                  <span className="relaitve_word_rank"> No. {item.rank}</span>
                  <span className="relaitve_word_pronunciation">
                    {item.pronunciation}
                  </span>
                  <span
                    className="prouncation"
                    onClick={(e) => prouncation(e, item.relativeWord)}
                  >
                    <audio
                      src={
                        "https://dict.youdao.com/dictvoice?audio=" +
                        item?.relativeWord +
                        "&type=1"
                      }
                      id={"myaudio" + item.relativeWord}
                      controls
                      hidden
                    ></audio>
                  </span>
                  <span className="relaitve_word_chinese">
                    {item.translate?.map((item, index) => (
                      <span className="relaitve_word_chinese_item">{item}</span>
                    ))}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WordMind;
