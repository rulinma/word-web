import React, { FC, useState, useEffect } from "react";
import "./index.css";
import { Button, Input } from "antd-mobile";
import { useNavigate } from "react-router-dom";

import { loginIn } from "services/loginService";
// import { getUserInfoByName } from "services/userInfo";
import { getNextWord } from "services/wordService";

import _ from "lodash";

const Login: FC = () => {
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");

  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("有错误");

  const navigate = useNavigate();

  // 添加回车进行登录event监听，初始化一次
  useEffect(() => {
    console.log("loginin ");
    // event: KeyboardEvent
    // event: { code: string; preventDefault: () => void; type: any }
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        // console.log("event type: ", event.type);
        // console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        login();
      }
    };
    document.addEventListener("keydown", listener, { passive: true });
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  // 进行登录请求
  const loginFunc = async (q: any) => {
    try {
      const logInfo = await loginIn(q);
      var jsObject = JSON.parse(JSON.stringify(logInfo));
      console.log("login func ", jsObject);
      return jsObject;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const checkParams = (): boolean => {
    // clear old
    setErr(false);
    setErrMsg("");

    if (userName.length === 0) {
      setErr(true);
      setErrMsg("用户名不可为空");
      return false;
    }

    if (pwd.length === 0) {
      setErr(true);
      setErrMsg("密码不可为空");
      return false;
    }

    return true;
  };

  const login = () => {
    // console.log("username:", userName, " pwd: ", pwd);
    if (!checkParams()) {
      // console.log("check invalid");
      return false;
    }
    // console.log("start login");
    // service
    (async function anyNameFunction() {
      const result = await loginFunc({
        username: userName,
        pwd: pwd,
      });

      console.log("login result", result);

      if (result == null || result === undefined) {
        return false;
      }

      const { username, token, id } = result.data;
      // console.log("token", token);
      // console.log("username", username);

      if (_.isEmpty(username)) {
        setErr(true);
        setErrMsg("用户名或密码不正确");
        return false;
      }

      if (_.isEmpty(token)) {
        setErr(true);
        setErrMsg("用户名或密码不正确");
        return false;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("userid", id);

      (async function anyNameFunction() {
        const result = await getNextWord();
        console.log("result ", result);

        let jsObject = JSON.parse(JSON.stringify(result));
        const word = jsObject!.data!.word;
        navigate("/word/" + word);

        window.location.reload();
      })();
    })();

    //   // navigate("/", { state: {} });
    //   navigate('/', {replace : true});
  };

  return (
    <div id="login" style={{}}>
      <div
        style={{
          fontSize: "17px",
          textAlign: "center",
          margin: "10px",
        }}
      >
        用户登录
      </div>

      <span style={{ fontSize: "20px" }}>
        <span
          style={{
            fontSize: "17px",
          }}
        >
          用户名：
        </span>
        <Input
          placeholder="请输入用户名"
          value={userName}
          onChange={(userName) => {
            setUserName(userName);
          }}
          style={{
            display: "inline-block",
            width: "60%",
          }}
        ></Input>
        {/* <input placeholder="请输入用户名" value={userName} onChange={(userName) => {
            setUserName(userName);
          }
        }></input> */}
      </span>

      <div></div>
      <span style={{ fontSize: "20px" }}>
        <span
          style={{
            fontSize: "17px",
          }}
        >
          密&nbsp;&nbsp;&nbsp;&nbsp;码：
        </span>
        <Input
          placeholder="请输入密码"
          value={pwd}
          onChange={(pwd) => {
            setPwd(pwd);
          }}
          style={{
            display: "inline-block",
            width: "60%",
          }}
        ></Input>
      </span>

      <div></div>

      <div
        style={{
          height: "20px",
        }}
      >
        {err && <div style={{ color: "red" }}>{errMsg}</div>}
      </div>

      <Button
        onClick={login}
        color="primary"
        size="mini"
        style={{
          marginTop: "10px",
        }}
      >
        登录
      </Button>

      <div id="box" style={{}}>
        <span style={{}}>{/* <a href="/pwd/forget">忘记密码</a> */}</span>
        <span style={{}}>
          <a href="/register/invite">注册</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
