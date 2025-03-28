import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";

import router from "./routes/textRoute.js";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import {app, server} from "./socket/socket.js";

connectDb();
dotenv.config();

const port = process.env.PORT || 5001;

const allowedOrigins = [
  "https://sharedaddy.onrender.com",
  "https://share-daddy.vercel.app",
  "http://sharedaddy.co",
  process.env.FRONTEND_BASE_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`Blocked CORS request from: ${origin}`);
        callback(new Error("CORS policy does not allow this origin"));
      }
    }
  })
);

app.use(compression());

app.use(express.json({ limit: '100mb' } ));

app.use(errorHandler);

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Backend is running");
});


server.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port}`);
});
