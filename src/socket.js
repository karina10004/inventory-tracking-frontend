import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8080");

socket.on("connect", () => {
  console.log("user connected");
});

export default socket;
