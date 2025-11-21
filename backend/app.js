import express from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import * as authMiddleware from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import projectRoutes from "./routes/project.routes.js";
import cors from "cors";

connect();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // <-- MUST COME BEFORE ROUTES
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

console.log("📌 Setting up routes...");
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

app.get("/", (req, res) => {
  console.log("📌 GET / hit");
  res.send("Hello World");
});

export default app;
