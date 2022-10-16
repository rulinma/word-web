import React, { FC, useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { Spin } from "antd";

import "./index.css";
// import { useLocation } from "react-router-dom";
import {
  getTestTotal,
  getTestWord,
  recordTestWord,
} from "services/wordTestService";
import moment from "moment";

const Test: FC = () => {
  // let location = useLocation();
  // console.log(location);
  // console.log(location.pathname);

  // var data = ["a", "b", "c", "d"];
  const [accCount, setAccCount] = useState(0);
  const [totlaCount, setTotlaCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [unknowCount, setUnknowCount] = useState(0);

  const [word, setWord] = useState<string>();
  const [choice, setChoice] = useState<string[]>([]);
  // 存储正确答案
  const [correct, setCorrect] = useState<string>();
  const [correctNum, setCorrectNum] = useState<string>("");
  const [testId, setTestId] = useState<string>("");

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // console.log("word test init start");
    // get init word test
    setAccCount(0);
    setTotlaCount(0);
    setCorrectCount(0);
    setFailCount(0);
    setUnknowCount(0);

    (async function anyNameFunction() {
      const result = await getTestTotal({});
      let respData = JSON.parse(JSON.stringify(result));
      const totlaCount = respData.data;
      // setAccCount(totlaCount);
      setAccCount(0);
    })();

    (async function anyNameFunction() {
      // filter === true ? 1 : 0
      const username = localStorage.getItem("username");
      var date = moment(new Date()).format("YYYYMMDDHHmmss");
      console.log("testId ", username + "-" + date);
      setTestId(username + "-" + date);
      const result = await getTestWord({
        testId: testId,
      });
      let respData = JSON.parse(JSON.stringify(result));
      const { testWord, list, correct } = respData.data;
      setWord(testWord);
      setChoice(list);
      setCorrect(correct);
      //
      let num = list.indexOf(correct) + "";
      // console.log("num ", num);
      setCorrectNum(num);
    })();

    // console.log("word test init end");
  }, []);

  useEffect(() => {
    // console.log("word test data cal changed");
    // get data
  }, [accCount, totlaCount, correctCount, failCount, unknowCount]);

  useEffect(() => {
    // console.log("word test update");
  }, []);

  const cal = (value: number) => {
    // 1 正确 2 错误 3 不知道
    if (value === 1) {
      setCorrectCount(correctCount + 1);
    } else if (value === 2) {
      setFailCount(failCount + 1);
    } else {
      setUnknowCount(unknowCount + 1);
    }

    setAccCount(accCount + 1);
    setTotlaCount(totlaCount + 1);
  };

  function delayJump(time: any) {
    var delay = setTimeout(() => {
      // console.log("delay1 : " + delay + " " + Date());
      // const t = ["aa", "bb", "cc", "dd"];
      // t.push("x" + new Date());
      clearStyle();

      (async function anyNameFunction() {
        // filter === true ? 1 : 0
        const result = await getTestWord({
          testId: testId,
        });
        let respData = JSON.parse(JSON.stringify(result));
        const { testWord, list, correct } = respData.data;
        setWord(testWord);
        setChoice(list);
        setCorrect(correct);

        let num = list.indexOf(correct);
        // console.log("num ", num);
        setCorrectNum(num);
        // 重置点击
        setClicked(false);
      })();
    }, time);
    // console.log("delay2: " + delay + " " + Date());
  }

  const answer = (event: any) => {
    setTotlaCount(totlaCount + 1);
    // console.log("waiting to jump 1 ", clicked);
    if (clicked) {
      // console.log("waiting to jump 2", clicked);
      return;
    }

    setClicked(true);
    // event.preventDefault();

    // 显示加载，并禁止点击
    // console.log("waiting to jump 3", clicked);
    let mockAns = correctNum + "";
    if (event.target.id === "notknow") {
      // 显示正确答案
      document
        .getElementById(mockAns)!
        .setAttribute("style", "border: 2px solid #28C99D");
      // console.log("core: ", document.getElementById(mockAns)!.childNodes[2]);
      delayJump(2000);
      cal(3);

      recordTestWord({
        word: word,
        master: -1,
        type: 1,
        model: 0,
      });
      return;
    }

    if (event.target.nodeName !== "UL") {
      // console.log("not ul");
      // 1-righticon, 2-add_num, 3-sub_num
      // console.log("1" , document.getElementById(mockAns).childNodes[1]);
      // console.log("2 ", document.getElementById(mockAns).childNodes[2]);
      // console.log("3 ", document.getElementById(mockAns).childNodes[3]);
      // mockAns = 2;
      if (event.target.id !== mockAns) {
        event.target.style = "border: .2rem solid red";
        // 不正确的需要自己的-1
        // console.log("not correct");
        let elem = document.getElementById(event.target.id)!
          .childNodes[3] as HTMLElement;
        elem.setAttribute("style", "display: block");
        cal(2);
        recordTestWord({
          word: word,
          master: -1,
          type: 1,
          model: 0,
        });
      } else {
        // console.log("correct");
        // 正确的同时+1显示
        // document.getElementById(mockAns)!.childNodes[2].style =
        //   "display: block";
        let elem = document.getElementById(event.target.id)!
          .childNodes[2] as HTMLElement;
        elem.setAttribute("style", "display: block");

        cal(1);

        recordTestWord({
          word: word,
          master: 1,
          type: 1,
          model: 0,
        });
      }

      // 显示正确的
      // document.getElementById(mockAns)!.style = "border: .2rem solid #28C99D";
      // document.getElementById(mockAns)!.childNodes[1].style = "display: block";

      document
        .getElementById(mockAns)!
        .setAttribute("style", "border: 2px solid #28C99D");
      let elemx = document.getElementById(event.target.id)!
        .childNodes[1] as HTMLElement;
      elemx.setAttribute("style", "display: block");

      delayJump(2000);
    }

    // console.log("end");
  };

  const clearById = (value: string) => {
    document.getElementById(value)?.setAttribute("style", "");
    let elem1 = document.getElementById(value)!.childNodes[1] as HTMLElement;
    elem1.setAttribute("style", "display: none");
    let elem2 = document.getElementById(value)!.childNodes[2] as HTMLElement;
    elem2.setAttribute("style", "display: none");
    let elem3 = document.getElementById(value)!.childNodes[3] as HTMLElement;
    elem3.setAttribute("style", "display: none");
  };

  const clearStyle = () => {
    // console.log("1:", document!.getElementById(0).childNodes[1]);
    // console.log("2:", document!.getElementById(0).childNodes[2]);
    // console.log("3:", document!.getElementById(0).childNodes[3]);
    clearById("0");
    clearById("1");
    clearById("2");
    clearById("3");
  };

  return (
    <div>
      <div className="title">词汇测试</div>
      <div className="set">{/* <a href="/test/pic">图像</a> */}</div>
      <div className="set">{/* <a href="/test/ce">中英</a> */}</div>
      <div className="content">
        <div className="score">
          <div className="sum_count">
            <span className="sum">累计</span>
            <span className="sum_num">{accCount}</span>
          </div>
          <div className="total_count">
            <span className="total">总计</span>
            <span className="total_num">{totlaCount}</span>
          </div>
          <div className="correct_count">
            <span className="correct">正确</span>
            <span className="correct_num">{correctCount}</span>
          </div>
          <div className="error_count">
            <span className="error">错误</span>
            <span className="error_num">{failCount}</span>
          </div>
          <div className="notknow_count">
            <span className="notknow">不认识</span>
            <span className="notknow_num">{unknowCount}</span>
          </div>
        </div>

        <div className="word">{word}</div>

        {/* 显示list */}
        <div className="answer">
          <ul onClick={answer}>
            {choice.map((item, i) => (
              <li key={i} id={i + ""}>
                {item}
                <div className="righticon"></div>
                <div className="add_num">&nbsp;+1</div>
                <div className="sub_num">&nbsp;-1</div>
              </li>
            ))}

            <li id="notknow">
              不认识
              <div className="righticon"></div>
              <div className="add_num">&nbsp;+1</div>
              <div className="sub_num">&nbsp;-1</div>
            </li>
          </ul>
        </div>
        <Spin
          spinning={clicked}
          tip="处理中......"
          size="default"
          className="spin"
        ></Spin>
      </div>
      <Footer />
    </div>
  );
};

export default Test;
