import { io } from "socket.io-client";

const socket = io("wss://talented-panama-hat-toad.cyclic.cloud");

socket.on("connect", () => {
  console.log("user connected");
});

export default socket;
