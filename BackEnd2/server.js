const express = require("express");
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import gigRoutes from "./routes/gig.route.js";
import messageRoutes from "./routes/message.route.js";
import orderRoutes from "./routes/order.route.js";
import reviewRoutes from "./routes/review.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect success!");
  })
  .catch((error) => {
    console.log("Connect error!", error);
  });
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
