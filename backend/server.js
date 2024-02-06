require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import { passportAuth } from "./config/jwt-middleware.js";
import apiRoutes from "./routes/index.js";
const PORT = process.env.PORT;

connectDB();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);

app.use("/api", apiRoutes);
app.use("/users", require("./routes/userRoutes"));

app.listen(PORT, async () => {
  console.log("Connected to MongoDB");
  console.log("Server started at port", PORT);
});
