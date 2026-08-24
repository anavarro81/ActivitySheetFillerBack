import express from "express";
import rateLimitloginLimiter from '../middleware/loginLimiter.middleware.js'


import { register, login } from "../controllers/user.controllers.js";
import { validateRegister, validateLogin } from "../middleware/validator.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", validateRegister, register);
userRoutes.post("/login", rateLimitloginLimiter, validateLogin, login);

export { userRoutes };
