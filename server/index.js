import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import { gigRoutes } from "./routes/GigRoutes.js";
import { orderRoutes } from "./routes/OrderRoutes.js";
import { messageRoutes } from "./routes/MessageRoutes.js";
import { dashboardRoutes } from "./routes/DashboardRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8747; //Use 3000 if PORT is not set

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));

//Middleware 
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Signal handling for graceful shutdown
const handleShutdown = (signal) => {
  console.log(`${signal} signal received. Shutting down server...`);
  // Perform cleanup tasks here (e.g., close database connections)
  process.exit(0); // Exit with a success code
};

process.on("SIGINT", () => handleShutdown("SIGINT")); // Handles Ctrl+C
process.on("SIGHUP", () => handleShutdown("SIGHUP")); // Handles terminal hangup
process.on("SIGTERM", () => handleShutdown("SIGTERM")); // Handles termination signals

console.log("Signal handlers registered.");

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
