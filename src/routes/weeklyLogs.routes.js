import express from "express";

import { getTaskByWeek } from "../controllers/weeklyLogs.controller.js";
import { validateToken } from "../middleware/validator.middleware.js";

const weeklyLogsRoutes = express.Router();

weeklyLogsRoutes.get("/:id", validateToken, getTaskByWeek);


export { weeklyLogsRoutes };
