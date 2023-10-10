import { io } from "socket.io-client";

const socket = io("https://inventory-tracking.onrender.com/");

socket.on("connect", () => {
  console.log("user connected");
  console.log(socket.io.engine.transport.name);
  const transport = socket.io.engine.transport.name;
  socket.io.engine.on("upgrade", () => {
    const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
  });
});

export default socket;
