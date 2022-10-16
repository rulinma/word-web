import React, { FC, useEffect } from "react";

import { Switch } from "antd";

import { setWordMaster } from "services/roadmapService";

import "./index.css";

const RoadmapListDetail: FC<any> = ({ ...props }) => {
  const { detail, filter, opAction } = props;

  useEffect(() => {
    // console.log("roadmap list detail init: ", detail, filter);
    // get preferece
    // set records
  }, [detail, filter]);

  const renderMasterStatus = (master: Number) => {
    // console.log("master is ", master);
    if (master === 1) {
      return (
        <span className="ok status">
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
        </span>
      );
    }

    if (master === -1) {
      return (
        <span className="fail status">
          <i className="fa fa-thumbs-down" aria-hidden="true"></i>
        </span>
      );
    }

    return (
      <span className="unknow status">
        {/* <i className="fa fa-question" aria-hidden="true"></i> */}
        <i className="fa fa-adjust" aria-hidden="true"></i>
      </span>
    );
  };

  const renderType = (type: Number) => {
    if (type === 0) {
      return (
        <span className="record_detail_word_prefix">
          <i className="fa fa-eye" aria-hidden="true"></i>
        </span>
      );
    }

    return (
      <span className="record_detail_word_prefix">
        <i className="fa fa-newspaper-o" aria-hidden="true"></i>
      </span>
    );
  };
  const doAction = (e: any) => {
    if (e) {
      detail.action = "1";
    } else {
      detail.action = "-1";
    }

    opAction(detail);

    // service record
    const result = setWordMaster({
      word: detail.word,
      master: detail.action,
      masterType: 2, // 2 表示来源于roadmap
    });

    console.log("end");
  };

  const renderAction = () => {
    return (
      <span className="record_detail_action">
        {
          <Switch
            onChange={doAction}
            checked={detail.master === 1 ? true : false}
            checkedChildren="会"
            unCheckedChildren="会"
          />
        }
      </span>
    );
  };

  return (
    <li
      className="record_detail"
      id={"l" + Math.random().toString(36).substr(2)}
      key={"l" + Math.random().toString(36).substr(2)}
    >
      <span className="record_detail_date">
        {detail.addTime.toString().slice(11, 16)}
      </span>
      <span className="record_detail_word">
        {renderType(detail.type)}
        <span className="record_detail_word_suffix">{detail.word}</span>
      </span>
      <span className="record_detail_status">
        {renderMasterStatus(detail.master)}
        {renderAction()}
      </span>
    </li>
  );
};

export default RoadmapListDetail;
