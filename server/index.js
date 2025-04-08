import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import { gigRoutes } from "./routes/GigRoutes.js";
import { orderRoutes } from "./routes/OrderRoutes.js";
import { messageRoutes } from "./routes/MessageRoutes.js";
import { dashboardRoutes } from "./routes/DashboardRoutes.js";
import { OAuth2Client } from "google-auth-library"; // Import Google APIs

dotenv.config();

const app = express();
const port = process.env.PORT || 8747; // Use 3000 if PORT is not set

// Google OAuth setup
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
  process.env.GOOGLE_CLIENT_SECRET, // Your Google Client Secret
  process.env.GOOGLE_REDIRECT_URI // Redirect URI (e.g., http://localhost:3000/api/auth/google/callback)
);

// Generate Google OAuth login URL
app.get("/api/auth/google/login", (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/calendar"];
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.json({ url: authUrl });
});

// Handle Google OAuth callback
app.get("/api/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Save tokens to the database or session (if needed)
    res.json({ message: "Authentication successful", tokens });
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).json({ error: "Failed to authenticate with Google" });
  }
});

// CORS configuration
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Static file serving
app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Signal handling for graceful shutdown
const handleShutdown = (signal) => {
  console.log(`${signal} signal received. Shutting down server...`);
  // Perform cleanup tasks here (e.g., close database connections)

  // Delay the process exit slightly to ensure the message is logged last
  setTimeout(() => {
    process.exit(0); // Exit with a success code
  }, 800); // 800ms delay
};

process.on("SIGINT", () => handleShutdown("SIGINT")); // Handles Ctrl+C
process.on("SIGHUP", () => handleShutdown("SIGHUP")); // Handles terminal hangup
process.on("SIGTERM", () => handleShutdown("SIGTERM")); // Handles termination signals

console.log("Signal handlers registered.");

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
