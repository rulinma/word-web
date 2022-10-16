import React, { FC, useEffect, useState } from "react";
import "./index.css";
import * as myconst from "../../common/common.js";
import { getInvite } from "services/inviteCodeApi";

const InviteCode: FC = () => {
  // 由于useEffect使用[]，所以只执行一次
  const [inviteCode, setInviteCode] = useState("");
  const [visualInviteCode, setVisualInviteCode] = useState(false);

  useEffect(() => {
    // console.log("invite code");
    // 根据token获取invite code
  }, []);

  const opCode = (e: any) => {
    // console.log("copy invite code");
    let code = document.getElementById("invite_code")?.innerText;
    // console.log("copy invite code ", code?.trim());
    // 复制到黏贴板
    let content =
      window.location.protocol +
      "//" +
      window.location.host +
      "/" +
      myconst.CONTEXT_PATH +
      "/" +
      code?.trim();
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("Text copied to clipboard...");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  const lookCode = () => {
    // console.log("look code");
    (async function anyNameFunction() {
      const result = await getInvite({});
      // console.log("comment getInvite resp", result);
      let json = JSON.parse(JSON.stringify(result));
      const { inviteCode } = json.data;
      // inviteCode可能不存在
      setInviteCode(inviteCode);
      setVisualInviteCode(true);
    })();
  };

  return (
    <>
      {
        <div className="invite_code">
          邀请码：
          <span className="look" onClick={lookCode}>
            [点我查看]
          </span>
          {visualInviteCode && (
            <span onClick={opCode} className="code" id="invite_code">
              {inviteCode} <span></span>
              <i className="fa fa-files-o" aria-hidden="true"></i>
            </span>
          )}
        </div>
      }
    </>
  );
};

export default InviteCode;
