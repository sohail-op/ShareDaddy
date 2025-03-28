import { Server } from "socket.io";
import http from "http";
import express from "express";
import {redis} from "../config/redis.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://sharedaddy.onrender.com",
      "https://share-daddy.vercel.app",
      "http://sharedaddy.co",
      process.env.FRONTEND_BASE_URL || "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("getCode", (code) => {
    socket.join(code);
  });

  socket.on("file:request", async (code) => {
    const fileData = await redis.getBuffer(code);
    if (fileData) {
        socket.emit("file:receive", { code, fileData });
    } else {
        socket.emit("file:error", "File not found!");
    }
});

  socket.on("disconnect", () => {
    // console.log(`User disconnected: ${socket.id}`);
  });
});


export { app, server, io };