import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/textRoute.js";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler";

connectDb();
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// app.options("*", cors());
// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// };
// app.use(allowCrossDomain);

app.use(express.json());
app.use("/api", router);
app.get(errorHandler);

app.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port}`);
});
