import express from "express";
import users from "./api/users";

// Initilise the app

const app = express();

// Router configuration

app.use("/api/users", users);

export default app;
