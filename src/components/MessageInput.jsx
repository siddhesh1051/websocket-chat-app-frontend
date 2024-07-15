import React, { useState, useEffect } from "react";
import createSocket from "../socket";

const MessageInput = ({ currentGroup }) => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = createSocket(`${process.env.REACT_APP_STRAPI_URL}`);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [currentGroup]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const newMessage = {
        content: message,
        sender: "user",
        group: currentGroup,
      };
      socket.emit("message", newMessage);
      setMessage(""); // Clear input after sending message

      // Save the message to localStorage
      const storedMessages =
        JSON.parse(localStorage.getItem(`group_${currentGroup}`)) || [];
      localStorage.setItem(
        `group_${currentGroup}`,
        JSON.stringify([...storedMessages, newMessage])
      );
    }
  };

  return (
    <form
      onSubmit={sendMessage}
      className="flex items-center p-4 bg-white border-t rounded-xl"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border p-2 rounded-lg mr-2"
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
      >
        <p>Send</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-send"
        >
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;
