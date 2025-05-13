import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";

import router from "./routes/textRoute.js";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import {app, server} from "./socket/socket.js";
import { limiter } from "./middleware/rateLimiter.js";

connectDb();
dotenv.config();

const port = process.env.PORT || 5001;

const allowedOrigins = [
  "share-daddy.vercel.app",
  "sharedaddy.co",
  "www.sharedaddy.co",
  process.env.FRONTEND_BASE_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.sharedaddy.co');

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log(`Blocked CORS request from: ${origin}`);
        callback(new Error("CORS policy does not allow this origin"));
      }
    },
  })
);

app.use(limiter)
app.use(compression());
app.use(express.json( ));
app.use(errorHandler);
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Backend is running");
});


server.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port}`);
});
