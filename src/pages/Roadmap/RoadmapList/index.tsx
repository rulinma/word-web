import React, { FC, useEffect } from "react";

import "./index.css";

import RoadmapListDetail from "./RoadmapListDetail";

const RoadmapList: FC<any> = ({ ...props }) => {
  const { historys, filter, records, opAction1 } = props;

  useEffect(() => {
    console.log("road page init: ");
    // set details
    // get preferece
  }, [historys, filter]);

  // useEffect(() => {
  //   // console.log("road page show: ");
  //   console.log("historys ", historys, " filter", filter, " records ", records);
  //   // get preferece
  // }, []);

  const opAction2 = (value: any) => {
    console.log("opAction2 ", value);
    opAction1(value);
  };

  const renderDetail = (item: any, index: any) => {
    return (
      <RoadmapListDetail
        detail={item}
        filter={filter}
        opAction={opAction2}
        key={"rd" + Math.random().toString(36).substr(2)}
      ></RoadmapListDetail>
    );

    // return <></>;
  };

  return (
    <>
      {records &&
        records.map((item: any, index: any) => (
          <>{renderDetail(item, index)}</>
        ))}
    </>
  );
};

export default RoadmapList;
