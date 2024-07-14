// src/components/Chat.js
import React from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const Chat = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <MessageList />
      </div>
      <div>
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
