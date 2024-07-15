import { io } from "socket.io-client";

const createSocket = (serverUrl) => {
  const socket = io(serverUrl, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://ayna-full-stack-assignment-websocket.vercel.app/",
      ],
      methods: ["GET", "POST"],
    },
  });

  socket.on("connect", () => {
    console.log(`connected to server: ${serverUrl}`);
  });

  return socket;
};

export default createSocket;
