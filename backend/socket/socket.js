import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  socket.on("getCode", (code) => {
    socket.join(code);
  });

  socket.on("disconnect", () => {
    // console.log(`User disconnected: ${socket.id}`);
  });
});


export { app, server, io };