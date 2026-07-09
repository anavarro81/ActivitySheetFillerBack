import express from "express";

import { register, login } from "../controllers/user.controllers.js";
import { validateRegister, validateLogin } from "../middleware/validator.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", validateRegister, register);
userRoutes.post("/login", validateLogin, login);

export { userRoutes };
