import React, { useEffect, useState } from "react";
import createSocket from "../socket";

const MessageList = ({ currentGroup }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem(`group_${currentGroup}`)) || [];
    setMessages(storedMessages);
  }, [currentGroup]);

  useEffect(() => {
    if (socket) {
      socket.off("message");
    }

    const newSocket = createSocket("http://localhost:1337");
    setSocket(newSocket);

    newSocket.emit("join", currentGroup);

    newSocket.on("message", (message) => {
      if (message.group === currentGroup) {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          localStorage.setItem(
            `group_${currentGroup}`,
            JSON.stringify(updatedMessages)
          );
          return updatedMessages;
        });
      }
    });

    return () => {
      newSocket.close();
    };
  }, [currentGroup]);

  return (
    <div className="flex-1 overflow-y-auto p-1 w-full">
      <h1 className="mb-4 text-3xl font-bold text-center">
        Group {currentGroup}
      </h1>
      {messages.length !== 0 ? (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg sm:max-w-xs  max-w-40 break-words ${
              msg.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-300 mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-8 text-lg font-light ">
          No messages yet
        </div>
      )}
    </div>
  );
};

export default MessageList;
