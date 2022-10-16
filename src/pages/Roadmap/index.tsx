import React, { FC, useState, useEffect } from "react";
import { Switch, message } from "antd";
import Footer from "../../components/Footer";
import { throttle } from "lodash";
import { getHistorys } from "services/roadmapService";
import RoadmapList from "./RoadmapList";

import "./index.css";

const Roadmap: FC = () => {
  // show not master
  const [filter, setFilter] = useState(false);
  // historys
  //    day | details
  //            detail
  // historys
  const [historys, setHistorys] = useState([] as any);
  // day | details
  const [dayDetails, setDayDetails] = useState<any>();

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  let limit = 25;

  let myHistory: any[] = [];
  let newOffset = 0;
  let myIndex = 0;

  useEffect(() => {
    // 1. Runs after EVERY rendering
    // 2. Runs ONCE after initial rendering []
    // 3. Runs ONCE after initial rendering
    //    and after every rendering ONLY IF `prop` or `state` changes [prop, state]

    // console.log("roadmap init: ");
    // get preferece
    window.addEventListener("scroll", useFn);
    // 组件销毁时移除侦听器
    return () => {
      window.removeEventListener("scroll", useFn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 不需要重复添加和销毁事件，使用空，可以支柱性一次

  useEffect(() => {
    // console.log("roadmap historys");
    // get preferece
    (async function anyNameFunction() {
      // filter === true ? 1 : 0
      const result = await getHistorys({
        offset: offset,
        limit: limit,
        filter: filter === true ? 1 : 0,
      });
      // console.log("history resp", result);
      // comments
      let respData = JSON.parse(JSON.stringify(result));
      // console.log("history result ", respData);
      setHasMore(respData.data?.hasMore === 1 ? true : false);

      let data = respData.data?.records;
      // console.log("history result data", data);
      setHistorys(data);
      // ... 扩展运算符 下面是进行数组的合并
      // 这里使用history不行?，测试后又可以
      // eslint-disable-next-line react-hooks/exhaustive-deps
      myHistory = [...historys, ...data];
      // myHistory = [...myHistory, ...data];
      // add id to myHistory
      // myHistory.map((item: any) => (item.id = myIndex++));
      // console.log("convertData1 data ", myHistory);
      convertData(myHistory);
    })();
  }, [setHistorys]);

  const useFn = throttle((event: any) => {
    // 此处调用 加载更多函数
    // event.stopPropagation();
    // event.stopImmediatePropagation();
    // console.log("useFn event: ", event);
    if (hasMore) {
      isTouchBottom(loadMore);
    } else {
      // message.info("没有更新数据");
    }
  }, 500);

  var lastDate: string = "";

  const dateChange = (item: any): boolean => {
    let result = false;
    if (lastDate !== item.addTime.slice(0, 10)) {
      result = true;
    }
    return result;
  };

  const loadMore = (e: any): void => {
    // console.log("load more historys ", historys, " myHistory ", myHistory);
    // console.log("load more hasMore ", hasMore);
    if (!hasMore) {
      message.info("到底了");
      return;
    }
    newOffset = newOffset + limit;

    (async function anyNameFunction() {
      const result = await getHistorys({
        offset: newOffset,
        limit: limit,
        filter: filter === true ? 1 : 0,
      });

      // 这里必须使用myHistory，使用historys则不行
      let respData = JSON.parse(JSON.stringify(result));
      // console.log("history hasMore ", respData.data?.hasMore);
      setHasMore(respData.data?.hasMore === 1 ? true : false);

      if (respData.data?.hasMore === 0) {
        message.info("数据已经加载完毕!");
      }

      let dataTest = respData.data?.records;
      if (dataTest != null) {
        // console.log("history result dataTest", dataTest);
        const temp = [...myHistory, ...dataTest];
        // temp.map((item) => (item.id = myIndex++));

        myHistory = [...temp];

        setHistorys(myHistory);
        // setHistorys((historys) => [...historys, ...dataTest]);
        convertData(myHistory);
        // console.log("load more convert data 2 ", myHistory);
      }
    })();
  };

  const isTouchBottom = (handler: any) => {
    // 文档显示区域高度
    const showHeight = window.innerHeight;
    // 网页卷曲高度
    const scrollTopHeight =
      document.body.scrollTop || document.documentElement.scrollTop;
    // 所有内容高度
    const allHeight = document.body.scrollHeight;
    // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
    if (allHeight <= showHeight + scrollTopHeight) {
      handler();
    }
  };

  // filter 变化进行处理
  useEffect(() => {
    // console.log("roadmap show filter changed ", filter);
    // console.log("roadmap show filter historys ", historys);
    convertData(historys);
    // if(filter) {
    //   data  = values.filter(value => value.status !== "1");
    // }
    // convert 2 day | details
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, historys]);

  const convertData = (values: any[]) => {
    // console.log("convert filter value ", values);
    let data = values;
    if (filter) {
      data = values.filter((value) => value.master !== 1);
    }
    // iter historys
    let historysMap = {};
    let historysDay = [];
    if (data?.length > 0) {
      historysDay.push(data[0]);
      lastDate = historysDay[0].addTime.slice(0, 10);
      for (let i = 1; i < data?.length; i++) {
        // debugger
        let it = data[i];
        if (dateChange(it)) {
          // console.log("change ", it);
          let historysDayCopy = [...historysDay];
          historysMap[lastDate] = historysDayCopy;
          // reset
          historysDay = [it];
          lastDate = it.addTime.slice(0, 10);
        } else {
          historysDay.push(it);
        }
      }
      // last
      let historysDayCopy = [...historysDay];
      historysMap[lastDate] = historysDayCopy;
    }
    // console.log("historysMap ", historysMap, " data ", data);
    setDayDetails(historysMap);

    // console.log("dayDetails ", dayDetails);
  };

  const setMyFilter = () => {
    setFilter(!filter);
  };

  // 回调使用
  const opAction1 = (value: any) => {
    // console.log("opAction1 ", value);
    // 刷新所有history及historyMap

    // 添加id，相同id的修改内容
    // 修改history & historysMap
    // console.log("opAction1 historys ", historys);
    const temp = [...historys];

    // console.log("temp ", temp);
    // eslint-disable-next-line array-callback-return
    temp.map((item: any) => {
      if (item.id === value.id) {
        if (item.action === "1") {
          item.master = 1;
        } else {
          item.master = -1;
        }
      }
    });

    // console.log("temp ", temp);
    // ... 扩展运算符，进行数组的复制
    myHistory = [...temp];

    setHistorys(myHistory);
    convertData(myHistory);
  };

  return (
    <div>
      <div className="title">时间线</div>
      {/* <div
        style={{
          backgroundColor: "red",
          color: "white",
          fontSize: 40,
          marginTop: "30rem",
          marginBottom: "1rem",
        }}
      >
        历史记录
      </div> */}
      <div className="filter">
        <Switch
          onChange={setMyFilter}
          checked={filter}
          checkedChildren="未会"
          unCheckedChildren="全部"
        />
      </div>

      <div className="roadmap">
        {dayDetails &&
          Object.keys(dayDetails).map((item, index) => (
            <div
              className="record_block"
              id={"div1" + Math.random().toString(36).substr(2)}
              key={"div1" + Math.random().toString(36).substr(2)}
            >
              <span
                className="record_date"
                id={"s" + Math.random().toString(36).substr(2)}
                key={"s" + Math.random().toString(36).substr(2)}
              >
                {" "}
                {item}{" "}
              </span>
              <div
                id={"div" + item}
                key={"div2" + Math.random().toString(36).substr(2)}
              >
                <span className="show_hide">
                  <ul
                    className="record_ul"
                    id={"u" + Math.random().toString(36).substr(2)}
                    key={"u" + Math.random().toString(36).substr(2)}
                  >
                    <RoadmapList
                      filter={filter}
                      records={dayDetails[item]}
                      opAction1={opAction1}
                      key={"r" + Math.random().toString(36).substr(2)}
                    ></RoadmapList>
                  </ul>
                </span>
              </div>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default Roadmap;
