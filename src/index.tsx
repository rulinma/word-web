import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import moment from "moment";

import Welcome from "./pages/Welcome";
import Word from "./pages/Word";
import Test from "./pages/Test";
import TestPic from "./pages/TestPic";
import Roadmap from "./pages/Roadmap";
import TopRcmd from "./pages/TopRcmd";
import My from "./pages/My";
import Login from "./pages/Login";
import LogOut from "./pages/LogOut";
import Book from "./pages/Book";
import MemberIntroduce from "./pages/Member/Introduce";

import PwdForget from "./pages/PwdForget";
import RegisterByInvite from "./pages/Register/RegisterByInvite";

import { Navigate } from "react-router-dom";

import { getMemberInfo } from "services/userService";

function AppLayout() {
  const [token, setToken] = useState("");
  useEffect(() => {
    console.log("useEffect token local check");
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
    }
    console.log("token ", token);
  }, []);

  // useEffect(() => {
  //   console.log("useEffect token service check and token: ", token);
  //   if (token) {
  //     // check
  //   }
  // }, [token]);

  // console.log("token:", token);

  // 排除几个前缀
  // register pwd/forget
  const checkTokenUrl = () => {
    let result = true;
    // console.log("window.location.href" + window.location.pathname);
    let pathname = window.location.pathname;
    if (pathname === "/register") {
      result = false;
    }
    if (pathname === "/register/invite") {
      result = false;
    }
    if (pathname === "/pwd/forget") {
      result = false;
    }
    if (pathname === "/member/introduce") {
      result = false;
    }

    return result;
  };

  const notPassMemberCheck = () => {
    //
    console.log("window.location.href ", window.location.pathname);
    if (window.location.pathname === "/member/introduce") {
      return;
    }
    (async function anyNameFunction() {
      const result = await getMemberInfo({});
      // console.log("member result", result);
      var jsObject = JSON.parse(JSON.stringify(result));
      const { endDate, newUser } = jsObject.data;
      // console.log("endDate", endDate, " newUser", newUser);
      if (endDate == null && newUser == null) {
        window.location.href = "/member/introduce";
      }
      // console.log("moment(endDate) ", moment(endDate));
      if (moment(endDate).isBefore(moment(new Date()))) {
        console.log("member is out of date");
        window.location.href = "/member/introduce";
      }
    })();
  };

  if (checkTokenUrl() && !token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (token && notPassMemberCheck()) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MemberIntroduce />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    // <React.StrictMode>
    // <HashRouter>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        {/* <Route path="/register" element={<Register />} /> */}

        <Route path="/register/invite" element={<RegisterByInvite />} />
        <Route path="/pwd/forget" element={<PwdForget />} />
        {/* <Route path="/" element={<Welcome />} /> */}
        <Route path="/" element={<Word />} />
        <Route path="/word/" element={<Word />} />
        {/* <Route path="/word/:id" element={<Word />} /> */}
        {/* <Route path="/word/:id" element={token ? <Navigate to="/test"/>: <Login/> } /> */}
        {/* <Route path="/word/:id" element={token ? <Word/>: <Login/> } /> */}
        <Route
          path="/word/:id"
          element={token ? <Word /> : <Navigate to="/login" replace={true} />}
        />
        <Route path="/test" element={<Test />} />
        <Route path="/test/pic" element={<TestPic />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/toprcmd" element={<TopRcmd />} />
        <Route path="/my" element={<My />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/member/introduce" element={<MemberIntroduce />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </BrowserRouter>
    // </HashRouter>
    // </React.StrictMode>
  );
}
ReactDOM.render(<AppLayout />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
