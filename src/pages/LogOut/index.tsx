import React, { FC, useEffect } from "react";
import "./index.css";

const LogOut: FC = () => {
  // 由于useEffect使用[]，所以只执行一次
  useEffect(() => {
    console.log("log out");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    window.location.href = "/login";
  }, []);

  return <div></div>;
};

export default LogOut;
