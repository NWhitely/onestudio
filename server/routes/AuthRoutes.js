import { Router } from "express";
import {
  getUserInfo,
  login,
  setUserImage,
  setUserInfo,
  signup,
  googleLogin,
  googleCallback,
} from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import jwt from "jsonwebtoken";
import { getTokens, refreshAccessToken } from "./googleAuth.js";
import { prisma } from "../prisma/client.js";
import axios from "axios";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", (req, res) => {
  login(req, res);

  const user = req.user; // Assuming `req.user` is set after login
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m", // Short-lived access token
  });

  const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d", // Long-lived refresh token
  });

  // Send tokens to the client
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ accessToken });
});
authRoutes.post("/get-user-info", verifyToken, getUserInfo);
authRoutes.post("/set-user-info", verifyToken, setUserInfo);

authRoutes.post(
  "/set-user-image",
  verifyToken,
  upload.single("images"),
  setUserImage
);

authRoutes.post("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token not provided" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Short-lived access token
    });

    res.json({ accessToken }); // Send the new access token to the client
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
});

authRoutes.post("/logout", (req, res) => {
  res.clearCookie("refreshToken"); // Clear the refresh token cookie
  res.json({ message: "Logged out successfully" });
});

authRoutes.get("/google/login", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });
  res.json({ url: authUrl });
});

authRoutes.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange the authorization code for tokens
    const tokens = await getTokens(code);

    // Save tokens to the database
    const userId = 1; // Replace with logic to identify the logged-in user
    await prisma.userTokens.upsert({
      where: { userId },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      },
      create: {
        userId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      },
    });

    res.json({ message: "Authentication successful", tokens });
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).json({ error: "Failed to authenticate with Google" });
  }
});

authRoutes.get("/google/calendar/events", async (req, res) => {
  try {
    const userId = 1; // Replace with logic to identify the logged-in user
    const userTokens = await prisma.userTokens.findUnique({ where: { userId } });

    if (!userTokens) {
      return res.status(404).json({ error: "No tokens found for the user" });
    }

    // Check if the access token has expired
    if (Date.now() > userTokens.expiryDate) {
      console.log("Access token expired. Refreshing...");
      const newTokens = await refreshAccessToken(userTokens.refreshToken);

      // Update the database with the new tokens
      await prisma.userTokens.update({
        where: { userId },
        data: {
          accessToken: newTokens.access_token,
          expiryDate: newTokens.expiry_date,
        },
      });

      userTokens.accessToken = newTokens.access_token; // Use the new access token
    }

    const response = await axios.get("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      headers: {
        Authorization: `Bearer ${userTokens.accessToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.status(500).json({ error: "Failed to fetch calendar events" });
  }
});

export default authRoutes;
