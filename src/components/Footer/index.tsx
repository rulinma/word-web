import React, { useState } from "react";
import { Badge, TabBar } from "antd-mobile";
import HomeImg from "images/home.png";
import HomeImg1 from "images/home1.png";
import TestImg from "images/test.png";
import TestImg1 from "images/test1.png";
import RoadMapImg from "images/roadmap.png";
import RoadMapImg1 from "images/roadmap1.png";
import MyImg from "images/my.png";
import MyImg1 from "images/my1.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Footer: React.FC = () => {
  let location = useLocation();
  // console.log(location);
  // console.log(location.pathname);

  const tabs = [
    {
      key: "word",
      title: "首页",
      icon: (active: boolean) =>
        active ? (
          <img src={HomeImg1} alt="首页" width="20px"></img>
        ) : (
          <img src={HomeImg} alt="首页" width="20px"></img>
        ),
      badge: Badge.dot,
    },
    {
      key: "test",
      title: "检测",
      icon: (active: boolean) =>
        active ? (
          <img src={TestImg1} alt="检测" width="20px"></img>
        ) : (
          <img src={TestImg} alt="检测" width="20px"></img>
        ),
      badge: "5",
    },
    // {
    //   key: "toprcmd",
    //   title: "推荐",
    //   icon: (active: boolean) =>
    //     active ? (
    //       <img src={RoadMapImg1} alt="推荐" width="20px"></img>
    //     ) : (
    //       <img src={RoadMapImg} alt="推荐" width="20px"></img>
    //     ),
    //   badge: "99+",
    // },
    {
      key: "roadmap",
      title: "历程",
      icon: (active: boolean) =>
        active ? (
          <img src={RoadMapImg1} alt="历程" width="20px"></img>
        ) : (
          <img src={RoadMapImg} alt="历程" width="20px"></img>
        ),
      badge: "99+",
    },
    {
      key: "my",
      title: "我的",
      icon: (active: boolean) =>
        active ? (
          <img src={MyImg1} alt="我的" width="20px"></img>
        ) : (
          <img src={MyImg} alt="我的" width="20px"></img>
        ),
    },
  ];

  const choose = () => {
    // console.log(location.pathname);
    if (location.pathname.startsWith("/word")) {
      return "word";
    }

    if (location.pathname.startsWith("/test")) {
      return "test";
    }

    if (location.pathname.startsWith("/roadmap")) {
      return "roadmap";
    }

    if (location.pathname.startsWith("/toprcmd")) {
      return "toprcmd";
    }

    if (location.pathname.startsWith("/my")) {
      return "my";
    }

    if (location.pathname.startsWith("/book")) {
      return "book";
    }

    return "word";
  };

  let choosed = choose();
  // console.log("choose: ", choosed);

  const [activeKey, setActiveKey] = useState(choosed);
  const navigate = useNavigate();
  const setRouteActive = (value: string) => {
    console.log("onChange: ", value);
    setActiveKey(value);
    // 设置路由
    if (value === "word") {
      navigate("/word", { state: {} });
    } else if (value === "test") {
      navigate("/test", { state: {} });
    } else if (value === "roadmap") {
      navigate("/roadmap", { state: {} });
    } else if (value === "toprcmd") {
      navigate("/toprcmd", { state: {} });
    } else if (value === "my") {
      navigate("/my", { state: {} });
    } else if (value === "book") {
      navigate("/book", { state: {} });
    }
  };

  const style = {
    position: "fixed",
    bottom: "0px",
    width: "100%",
    backgroundColor: "#0ff",
    // backgroundColor: "#fff",
    heigh: "50px",
  } as React.CSSProperties;

  return (
    // <div className={styles.bottom}>
    // <div className="footer">
    <div className="footer">
      {/* <div style={{ backgroundColor: "red", color: "white", fontSize: 30 }}>
        看背景颜色和文字颜色
      </div> */}
      <TabBar activeKey={activeKey} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default Footer;
