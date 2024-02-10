import "dotenv/config";

import { connectToMongoDb } from "./config/dbConfig.js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

import cors from "cors";

// middlware
app.use(cors());
app.use(express.json());

// connect to database
connectToMongoDb();

// start the server

app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("server is running");
});
