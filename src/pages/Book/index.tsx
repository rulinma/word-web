import React, { FC, useEffect } from "react";
import Footer from "../../components/Footer";
import "./index.css";

const Book: FC = () => {
  // 由于useEffect使用[]，所以只执行一次
  useEffect(() => {
    // console.log("book");
  }, []);

  return (
    <div>
      <div className="title">
        <span>选择单词书</span>
      </div>

      <Footer />
    </div>
  );
};

export default Book;
