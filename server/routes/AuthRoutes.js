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

authRoutes.get("/google/callback", googleCallback);

export default authRoutes;
