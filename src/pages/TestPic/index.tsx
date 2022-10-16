import React, { FC, useState, useEffect } from "react";
import Footer from "../../components/Footer";
import "./index.css";
// import { useLocation } from "react-router-dom";
import DataPic from "images/data.png";

const TestPic: FC = () => {
  // 打印会获取history对象, 然后just do it就完事了.
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

  useEffect(() => {
    console.log("word test init start");
    // get init word test
    setAccCount(10000);
    setTotlaCount(100);
    setCorrectCount(80);
    setFailCount(10);
    setUnknowCount(Math.floor(Math.random() * 100));
    // get test list
    // TODO: get from service
    const wordTest = "测试";
    const wordList = ["aa", "bb", "cc", "dd"];
    const wordCorrect = "cc";

    setWord(wordTest);
    setChoice(wordList);
    setCorrect(wordCorrect);

    console.log("word test init end");
  }, []);

  useEffect(() => {
    console.log("word test data cal changed");
    // get data
  }, [accCount, totlaCount, correctCount, failCount, unknowCount]);

  useEffect(() => {
    console.log("word test update");
    setWord("word");
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
      clearStyle();

      const wordTest = "w" + Math.random().toString(36).substr(2);
      const wordList = [
        "aa1" + Math.random().toString(36).substr(2),
        "bb2",
        "cc3",
        "dd4",
      ];
      const wordCorrect = "cc4";

      setWord(wordTest);
      setChoice(wordList);
      setCorrect(wordCorrect);
    }, time);

    console.log("delay: " + delay + " " + Date());
  }

  const answer = (event: any) => {
    console.log("answer");
    // setWord("word:" + Math.floor(Math.random() * (100)));
    // check answer and jump
    setTotlaCount(totlaCount + 1);

    let mockAns = Math.floor(Math.random() * 4) + "";
    console.log("mockAns ", mockAns);

    // img的向上传递
    var ov = event.target;
    if (event.target.nodeName === "IMG") {
      console.log(event.target.parentNode);
      ov = event.target.parentNode;
    }

    if (event.target.id === "notknowpic") {
      // 显示正确答案
      // document.getElementById(mockAns)!.style = "border: 2px solid #28C99D";
      document
        .getElementById(mockAns)!
        .setAttribute("style", "border: 2px solid #28C99D");
      // console.log("core: ", document.getElementById(mockAns).childNodes[2]);
      delayJump(2000);
      cal(3);
      return;
    }

    if (ov.nodeName !== "UL" && ov.nodeName === "LI") {
      console.log("not ul");
      // 1-righticon, 2-add_num, 3-sub_num
      // console.log("1" , document.getElementById(mockAns).childNodes[1]);
      // console.log("2 ", document.getElementById(mockAns).childNodes[2]);
      // console.log("3 ", document.getElementById(mockAns).childNodes[3]);
      // mockAns = 2;
      if (ov.id !== mockAns) {
        ov.style = "border: 2px solid red";
        // 不正确的需要自己的-1
        console.log("not correct");
        // document.getElementById(ov.id).childNodes[3].style = "display: block";
        let elem = document.getElementById(ov.id)!.childNodes[3] as HTMLElement;
        elem.setAttribute("style", "display: block");
        cal(2);
      } else {
        console.log("correct");
        // 正确的同时+1显示
        // document.getElementById(mockAns).childNodes[2].style = "display: block";
        let elem = document.getElementById(mockAns)!
          .childNodes[2] as HTMLElement;
        elem.setAttribute("style", "display: block");
        cal(1);
      }

      // 显示正确的
      // document.getElementById(mockAns).style = "border: 2px solid #28C99D";
      // document.getElementById(mockAns).childNodes[1].style = "display: block";
      document
        .getElementById(mockAns)!
        .setAttribute("style", "border: 2px solid #28C99D");
      let elemx = document.getElementById(mockAns)!
        .childNodes[1] as HTMLElement;
      elemx.setAttribute("style", "display: block");

      delayJump(2000);
    }

    // console.log("end")
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
    // console.log("1:", document.getElementById(0).childNodes[1]);
    // console.log("2:", document.getElementById(0).childNodes[2]);
    // console.log("3:", document.getElementById(0).childNodes[3]);
    clearById("0");
    clearById("1");
    clearById("2");
    clearById("3");
    // document.getElementById(0).style = "";
    // document.getElementById(0).childNodes[1].style = "display: none";
    // document.getElementById(0).childNodes[2].style = "display: none";
    // document.getElementById(0).childNodes[3].style = "display: none";
    // document.getElementById(1).style = "";
    // document.getElementById(1).childNodes[1].style = "display: none";
    // document.getElementById(1).childNodes[2].style = "display: none";
    // document.getElementById(1).childNodes[3].style = "display: none";
    // document.getElementById(2).style = "";
    // document.getElementById(2).childNodes[1].style = "display: none";
    // document.getElementById(2).childNodes[2].style = "display: none";
    // document.getElementById(2).childNodes[3].style = "display: none";
    // document.getElementById(3).style = "";
    // document.getElementById(3).childNodes[1].style = "display: none";
    // document.getElementById(3).childNodes[2].style = "display: none";
    // document.getElementById(3).childNodes[3].style = "display: none";
    // document.getElementById("notknowpic").style = "";
    // document.getElementById("notknowpic").childNodes[1].style = "display: none";
    // document.getElementById("notknowpic").childNodes[2].style = "display: none";
    // document.getElementById("notknowpic").childNodes[3].style = "display: none";
  };

  return (
    <div>
      <div className="title">词汇测试</div>
      <div className="set">
        <a href="/test">文字</a>
      </div>
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
        <div className="answer_pic">
          <ul onClick={answer}>
            {choice.map((item, i) => (
              <li key={i} id={i + ""}>
                {/* { item } */}
                <img src={DataPic} width="100px" height="100px" alt="图像" />
                <div className="righticon"></div>
                <div className="add_num">&nbsp;+1</div>
                <div className="sub_num">&nbsp;-1</div>
              </li>
            ))}

            <li id="notknowpic">
              不认识
              <div className="righticon"></div>
              <div className="add_num">&nbsp;+1</div>
              <div className="sub_num">&nbsp;-1</div>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestPic;
