import React, { FC, useState, useEffect } from "react";
import "./index.css";
import { Button, Input } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { userRegister } from "services/userService";
import _ from "lodash";

const RegisterByInvite: FC = () => {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("有错误");

  const navigate = useNavigate();

  // 添加回车进行登录event监听，初始化一次
  useEffect(() => {
    // event: KeyboardEvent
    // event: { code: string; preventDefault: () => void; type: any }
  });

  // 进行注册请求
  // const registService = async (q: any) => {};

  const checkParams = (): boolean => {
    // clear old
    setErr(false);
    setErrMsg("");

    if (username.length === 0) {
      setErr(true);
      setErrMsg("用户名不可为空");
      return false;
    }

    if (inviteCode.length === 0) {
      setErr(true);
      setErrMsg("邀请码不可为空");
      return false;
    }

    if (pwd.length === 0) {
      setErr(true);
      setErrMsg("密码不可为空");
      return false;
    }

    if (repeatPwd.length === 0) {
      setErr(true);
      setErrMsg("重复密码不可为空");
      return false;
    }

    if (repeatPwd !== pwd) {
      setErr(true);
      setErrMsg("两次密码不一样");
      return false;
    }

    return true;
  };

  const doRegister = () => {
    console.log(
      "username:",
      username,
      " pwd: ",
      pwd,
      " inviteCode: ",
      inviteCode
    );

    if (!checkParams()) {
      console.log("check invalid");
      return false;
    }

    console.log("start regiter");

    // return false;

    // service
    (async function anyNameFunction() {
      const result = await userRegister({
        username: username,
        inviteCode: inviteCode,
        pwd: pwd,
      });
      console.log("login result", result);

      if (result != null) {
        let json = JSON.parse(JSON.stringify(result));
        console.log("json", json);
        if (json.code === 0 && json.data != null) {
          navigate("/login", { replace: true });
        }
        return false;
      } else {
        return false;
      }
    })();
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
        用户注册
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
          value={username}
          onChange={(username) => {
            setUsername(username);
          }}
          style={{
            display: "inline-block",
            width: "60%",
          }}
        ></Input>
      </span>

      <div></div>

      <div>
        <span style={{ fontSize: "20px" }}>
          <span
            style={{
              fontSize: "17px",
            }}
          >
            验证码：
          </span>
          <Input
            placeholder="请输入验证密码"
            value={inviteCode}
            onChange={(verifyCode) => {
              setInviteCode(verifyCode);
            }}
            style={{
              display: "inline-block",
              width: "60%",
            }}
          ></Input>
        </span>
      </div>

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

      <span style={{ fontSize: "20px" }}>
        <span
          style={{
            fontSize: "17px",
          }}
        >
          重&nbsp;&nbsp;&nbsp;&nbsp;复：
        </span>
        <Input
          placeholder="请输入密码"
          value={repeatPwd}
          onChange={(repeatPwd) => {
            setRepeatPwd(repeatPwd);
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
        onClick={doRegister}
        color="primary"
        size="mini"
        style={{
          marginTop: "10px",
        }}
      >
        确定
      </Button>
    </div>
  );
};

export default RegisterByInvite;
