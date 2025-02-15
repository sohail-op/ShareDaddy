import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/textRoute.js";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import {app, server} from "./socket/socket.js";

connectDb();
dotenv.config();

const port = process.env.PORT || 5001;

const allowedOrigins = [
  "https://tshare-frontend.onrender.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow this origin"));
      }
    }
  })
);

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to the Text API");
});

app.use(errorHandler);

server.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port}`);
});
