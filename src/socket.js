import { io } from "socket.io-client";

const socket = io.connect("https://talented-panama-hat-toad.cyclic.cloud");

socket.on("connect", () => {
  console.log("user connected");
});

export default socket;
