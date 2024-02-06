require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
const app = express();
import path from "path";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import connectDB from "./config/dbConnection";
import { passportAuth } from "./config/jwt-middleware.js";
import apiRoutes from "./routes/index.js";
const PORT = process.env.PORT;

connectDB();

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);

app.use("/api", apiRoutes);
app.use("/users", require("./routes/userRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Page Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, async () => {
    console.log("Connected to MongoDB");
    console.log("Server started at port", PORT);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t ${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
