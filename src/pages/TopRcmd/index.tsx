import React, { FC } from "react";
import Footer from "../../components/Footer";
import { Grid } from "antd-mobile";
// import styles from "./index.css";

const TopRcmd: FC = () => {
  const style = {
    border: "solid 1px #999999",
    background: "#f5f5f5",
    textAlign: "center",
    color: "#999999",
    height: "100%",
  } as React.CSSProperties;

  return (
    <div>
      <div style={{ textAlign: "center" }}>TopRcmd</div>
      <Grid columns={3} gap={8}>
        <Grid.Item
          onClick={(e) => {
            console.log("e", e);
            console.log(e.target);
            const element = e.currentTarget as HTMLDivElement;
            console.log("element: ", element);
            const value = element.textContent;
            console.log("value: ", value);
          }}
        >
          <div style={style}>A</div>
        </Grid.Item>
        <Grid.Item>
          <div style={style}>B</div>
        </Grid.Item>
        <Grid.Item>
          <div style={style}>C</div>
        </Grid.Item>
        <Grid.Item>
          <div style={style}>D</div>
        </Grid.Item>
        <Grid.Item>
          <div style={style}>E</div>
        </Grid.Item>
      </Grid>
      <Footer />
    </div>
  );
};

export default TopRcmd;
