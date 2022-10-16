import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";

import "./index.css";

interface Props {
  // any props that come into the component
  title?: string;
}

const MemberTip: React.FC<Props> = ({ ...props }) => {
  console.log("params: ", props);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleCancel = () => {
    console.log("cancel ");
    setVisible(false);
  };

  const handleJump = () => {
    console.log("jump ");
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    console.log("use effect member tip: ");
  }, []);

  return (
    <>
      <Modal
        title={props.title}
        // style={{ top: 20 }}
        centered
        visible={visible}
        onOk={handleJump}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} loading={loading}>
            关闭
          </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   onClick={handleJump}
          // >
          //   Submit
          // </Button>,
          // <Button
          //   key="link"
          //   href="/my"
          //   // type="primary"
          //   loading={loading}
          //   onClick={handleJump}
          // >
          //   会员信息
          // </Button>,
        ]}
      >
        <p>
          开通会员，解除限制：
          <span>
            <a href="/my" style={{ color: "#0000f3" }}>
              [会员详情]
            </a>
          </span>
        </p>
      </Modal>
    </>
  );
};

export default MemberTip;
