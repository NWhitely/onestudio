import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createToken } from "./utils/jwt.js";  

// test file for googleapis

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  (() => {
    if (!process.env.GOOGLE_REDIRECT_URI) {
      throw new Error("GOOGLE_REDIRECT_URI is not defined in the environment variables.");
    }
    return process.env.GOOGLE_REDIRECT_URI;
  })()
);

console.log("Google Auth Library loaded successfully!");

const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

const getCalendarEvents = async () => {
  const response = await axios.get("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);
};

getCalendarEvents();