import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo)

  return (
    <div style={{ height: "90vh" }}>
      <PrettyChatWindow
        projectId="62473f79-e6d1-4edc-b491-cce29f68da41"
        username={userInfo.name} // adam
        secret={userInfo.secret} // pass1234
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatScreen;
