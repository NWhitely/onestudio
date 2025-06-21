import express from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getAvailability, createAvailability } from "../controllers/availabilityControllers.js";

const router = express.Router();

router.get("/", verifyToken, getAvailability);
router.post("/", verifyToken, createAvailability);

export default router;
