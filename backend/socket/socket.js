import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://tshare-frontend.vercel.app/",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on('getCode', (code)=>{
    console.log(code);
  }
)

socket.on('disconnect', () => {
  console.log(`User disconnected: ${socket.id}`);
});

});

export { app, server, io };