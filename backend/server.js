import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import path from "path";

import router from "./routes/textRoute.js";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler";

connectDb();
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// const __dirname = path.resolve();

app.use(cors());

app.use(express.json());

app.use("/api", router);
app.use("/", (res, req) => {
  res.send("Welcome to Home");
});

app.get(errorHandler);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

app.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port}`);
});
