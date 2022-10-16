import React, { FC } from "react";
import { Divider } from "antd-mobile";
import { Grid } from "antd-mobile";
import "./index.css";

const MemberIntroduce: FC = () => {
  return (
    <div>
      <div className="member_info_title">
        您的会员试用已到期，继续请加入会员。
        <Divider />
      </div>

      <div className="member_info">
        <span className="member_basic">会员信息：</span>

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
        <div className="home">
          <a href="/">主页</a>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default MemberIntroduce;
