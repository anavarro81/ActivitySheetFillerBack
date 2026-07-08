import express from "express";

import { register, login } from "../controllers/user.controllers.js";
import { validateUserData } from "../middleware/validator.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", validateUserData, register);
userRoutes.post("/login", validateUserData, login);

export { userRoutes };
