import express from "express";

import cors from "cors";

import "dotenv/config";
import { connectToMongoDb } from "./config/dbConfig.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(cors());
app.use(express.json());

// connect to database
connectToMongoDb();

// Routers
import userRouter from "./routers/userRouter.js";
import burrowRouter from "./routers/burrowRouter.js";
import reviewRouter from "./routers/reviewRouter.js";
import bookRouter from "./routers/bookRouter.js";

app.use("/api/user", userRouter);
app.use("/api/burrow", burrowRouter);
app.use("/api/review", reviewRouter);
app.use("/api/book", bookRouter);

// start our server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running");
});
