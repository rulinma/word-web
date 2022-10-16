import React, { FC, useEffect, useState } from "react";
import { List, Button, Divider } from "antd-mobile";
import { Grid } from "antd-mobile";
import Footer from "../../components/Footer";
import InviteCode from "../InviteCode";
import { loginOut } from "services/loginService";
// import MemberIntroduce from "../Member/Introduce";
import { useNavigate } from "react-router-dom";
import "./index.css";

const My: FC = () => {
  const [userName, setUserName] = useState("");

  const [member, setMember] = useState(false);

  // 进行登录请求
  const logOutFunc = async (q: any) => {
    let token = localStorage.getItem("token");
    // console.log("read token:", token);
    try {
      const logOutInfo = await loginOut(q);
      var result = JSON.parse(JSON.stringify(logOutInfo));
      // console.log("logOut func ", result);
      // debugger;
      if (result.code === 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
        window.location.href = "/login";

        return result;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logOut = () => {
    // 调用统一服务
    // console.log("log out");
    logOutFunc("");
  };

  useEffect(() => {
    // console.log("init profile: ");
    const username = localStorage.getItem("username");
    setUserName(username === null ? "" : username.toString());

    // get member info from service
    if (true) {
      setMember(true);
    }
  }, []);

  // const join = () => {
  //   console.log("join member")
  // }

  const tryMember = () => {
    // console.log("try member");
  };
  const navigate = useNavigate();

  const bookChoose = () => {
    // console.log(" book choose");
    navigate("/book");
  };

  return (
    <div>
      <List mode="card">
        <List.Item key="享乐诵英语" description={"昵称：" + userName}>
          享乐诵英语
        </List.Item>

        <List.Item>版本： 0.0.1</List.Item>
        <List.Item></List.Item>
      </List>

      {userName && <InviteCode></InviteCode>}
      {/* <Divider /> */}

      {
        <div className="book_choose">
          <span className="book_basic" onClick={bookChoose}>
            <i className="fa fa-book" aria-hidden="true"></i> 单词书选择
          </span>
        </div>
      }

      <div className="member_info">
        <span className="member_basic">会员信息：</span>
        {member && (
          <span className="is_member"> {"[会员] 有效期： 2020-05-06"}</span>
        )}
        {!member && <span className="is_not_member"> {"[非会员]"}</span>}
        {!member && (
          <span className="try_member" onClick={tryMember}>
            {" "}
            {"[新用户试用7天会员]"}
          </span>
        )}
        <div className="member_compare">
          <Grid columns={2} gap={2}>
            <Grid.Item>
              {/* <div style={{fontWeight: "bold"}}>[非会员功能]</div> */}
              <div>[非会员功能]</div>
            </Grid.Item>
            <Grid.Item>
              {/* <div style={{fontWeight: "bold"}}>[会员功能]</div> */}
              <div>[会员功能]</div>
            </Grid.Item>
            <Grid.Item>
              <div>每天最多查看3个单词</div>
            </Grid.Item>
            <Grid.Item>
              <div>无限制</div>
            </Grid.Item>
            <Grid.Item>
              <div>每天最多检测3个单词</div>
            </Grid.Item>
            <Grid.Item>
              <div>无限制</div>
            </Grid.Item>
            <Grid.Item>
              <div>历程最多只能查看3天</div>
            </Grid.Item>
            <Grid.Item>
              <div>无限制</div>
            </Grid.Item>
          </Grid>
          {/* <Divider /> */}
        </div>

        {
          <div className="is_not_member_exp">
            {" "}
            {"通过以下方式转账298元/年，即可开通。"}
          </div>
        }
        <Divider />
        {<div className="is_not_member_name"> {"姓名：马如林"}</div>}
        {<div className="is_not_member_wechat"> {"微信：15026906099 "}</div>}
        {
          <div className="is_not_member_alipay">
            {" "}
            {"支付宝：rulinma@qq.com "}
          </div>
        }
        <Divider />
      </div>

      {userName && (
        <div className="logout">
          <Button onClick={logOut}>退出登录</Button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default My;
