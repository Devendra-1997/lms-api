import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

// start our server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running");
});
