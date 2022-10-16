import React, { FC, useState, useEffect } from "react";
import "./index.css";
import { Button, Input } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const Register: FC = () => {
  const [emailUser, setEmailUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

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

    if (emailUser.length === 0) {
      setErr(true);
      setErrMsg("电子邮箱不可为空");
      return false;
    }

    if (pwd.length === 0) {
      setErr(true);
      setErrMsg("密码不可为空");
      return false;
    }

    if (verifyCode.length === 0) {
      setErr(true);
      setErrMsg("验证码不可为空");
      return false;
    }

    return true;
  };

  const doRegister = () => {
    console.log("email:", emailUser, " pwd: ", pwd);

    if (!checkParams()) {
      console.log("check invalid");
      return false;
    }
    console.log("start regiter");
    // service
    // (async function anyNameFunction() {
    //   const result = await registService({
    //     email: emailUser,
    //     pwd: pwd,
    //   });

    //   console.log("login result", result);

    //   // jump page
    //   // navigate('/word/the', {replace : true});
    //   // another await service
    //   // debugger
    // })();

    navigate("/login", { replace: true });
  };

  const sendVerifyCode = () => {
    console.log("email: ", emailUser);
    if (emailUser.length === 0) {
      setErr(true);
      setErrMsg("电子邮箱不可为空");
      return false;
    }
    //
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
          邮&nbsp;&nbsp;&nbsp;&nbsp;箱：
        </span>
        <Input
          placeholder="请输入电子邮箱"
          value={emailUser}
          onChange={(emailUser) => {
            setEmailUser(emailUser);
          }}
          style={{
            display: "inline-block",
            width: "60%",
          }}
        ></Input>
      </span>

      <div className="verify_code" onClick={sendVerifyCode}>
        获取验证码
      </div>

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
            value={verifyCode}
            onChange={(verifyCode) => {
              setVerifyCode(verifyCode);
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

export default Register;
