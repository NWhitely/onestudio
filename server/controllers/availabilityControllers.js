// Import PrismaClient
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Import logging library
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Configure logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "error", // Configurable logging level
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// Get availability for the logged-in user
export const getAvailability = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: "User information is missing." });
    }

    const availability = await prisma.instructorAvailability.findMany({
      where: { userId: req.user.id },
      include: { timeSlots: true },
    });

    return res.status(200).json(availability);
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: "Server error." });
  }
};

// Create availability for the logged-in user
export const createAvailability = async (req, res) => {
  try {
    const Joi = (await import("joi")).default;

    const schema = Joi.object({
      dayOfWeek: Joi.string()
        .valid(
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        )
        .required(),
      startTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // HH:mm format
        .required(),
      endTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // HH:mm format
        .required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { dayOfWeek, startTime, endTime } = value;

    if (!req.user || !req.user.id) {
      return res.status(400).json({ error: "User information is missing." });
    }

    const availability = await prisma.instructorAvailability.create({
      data: {
        dayOfWeek,
        startTime,
        endTime,
        userId: req.user.id,
      },
    });

    return res
      .status(201)
      .json({ message: "Availability created successfully.", availability });
  } catch (error) {
    logger.error(error.message, { stack: error.stack });
    return res.status(500).json({ error: "Server error." });
  }
};