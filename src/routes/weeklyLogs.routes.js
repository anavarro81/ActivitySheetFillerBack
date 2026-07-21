import express from "express";

import { getTaskByWeek, updateWeeklyTasks, completeWeeklyTasks } from "../controllers/weeklyLogs.controller.js";
import { validateToken } from "../middleware/validator.middleware.js";

const weeklyLogsRoutes = express.Router();

weeklyLogsRoutes.get("/:id", validateToken, getTaskByWeek);
weeklyLogsRoutes.put("/:id", validateToken, updateWeeklyTasks);
weeklyLogsRoutes.put("/:id/completed", validateToken, completeWeeklyTasks);

export { weeklyLogsRoutes };
