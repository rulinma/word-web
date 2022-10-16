import React, { FC } from "react";
import { useState, useEffect, useRef } from "react";
// import { useLocation , useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import WordBasic from "../../components/WordBasic";
import WordMind from "../../components/WordMind";
import WordComment from "../../components/WordComment";
import MemberTip from "../../components/MemberTip";

import { useNavigate } from "react-router-dom";

import { WordContext } from "../../components/WordContext";
// import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getNextWord } from "services/wordService";

import { Input } from "antd";

import "./index.css";

interface IProps {}

const Word: FC<IProps> = ({ ...props }) => {
  // console.log("params: ", props);

  const [memberValid, setMemberValid] = useState(false);
  const [searchVis, setSearchVis] = useState(false);
  // let navigate = useNavigate();
  let params = useParams();

  // console.log("navigate: ", navigate);
  // console.log("params: ", params);
  let queryWord: string = params.id!;
  // console.log("queryWord: ", queryWord);
  const navigate = useNavigate();
  // no queryWord get queryWord By service
  if (queryWord === undefined) {
    // queryWord = "china";
    // navigate("/word/" + queryWord);
    (async function anyNameFunction() {
      const result = await getNextWord();
      // console.log("result ", result);
      let jsObject = JSON.parse(JSON.stringify(result));
      const word = jsObject!.data!.word;
      navigate("/word/" + word);
    })();
  }

  const [w, setW] = useState<string>("");

  useEffect(() => {
    setW(queryWord);

    // TODO: 检查会员信息
    setMemberValid(false);
  }, [w, queryWord]);

  const wordInfo = {
    word: queryWord,
  };

  const search = () => {
    console.log("search");
    setSearchVis(true);
  };

  const onSearch = (value: any) => {
    console.log("search", value);
    setSearchVis(false);
    navigate("/word/" + value);
  };

  return (
    <WordContext.Provider value={wordInfo}>
      <div>
        <div className="title">
          <span>AI记单词</span>
          <span onClick={search} className="word_search">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>

        {searchVis && (
          <div className="search_word">
            <Input.Search
              placeholder="请输入单词"
              onSearch={onSearch}
              enterButton
              allowClear
            ></Input.Search>
          </div>
        )}

        <WordBasic children={wordInfo} word={w} rank={0} />
        <WordMind word={w} />
        <WordComment word={w} />
        {memberValid && <MemberTip title="提示信息" />}
        <Footer />
      </div>
    </WordContext.Provider>
  );
};

export default Word;
