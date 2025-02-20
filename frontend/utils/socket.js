import { io } from "socket.io-client";

// const socket = io("https://tshare-14h1.onrender.com/");
const socket = io("http://localhost:5000", {
  reconnectionAttempts: 5,
  transports: ["websocket"],
});

export default socket;
