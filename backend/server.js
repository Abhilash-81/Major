import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
const app = express();
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import { passportAuth } from "./config/jwt-middleware.js";
import apiRoutes from "./routes/index.js";
import users from "./routes/userRoutes.js";
const PORT = process.env.PORT;

connectDB();

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(passport.initialize());
passportAuth(passport);

app.use("/api", apiRoutes);
app.use("/users", users);

app.listen(PORT, async () => {
  console.log("Connected to MongoDB");
  console.log("Server started at port", PORT);
});
