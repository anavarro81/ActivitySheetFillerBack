import express from "express";

import {
  newInternship,
  getInternshipsByStudent,
} from "../controllers/internships.controller.js";
import {
  validateRegister,
  validateLogin,
  validateInternship,
  validateToken,
} from "../middleware/validator.middleware.js";

const internshipRoutes = express.Router();

internshipRoutes.post("", validateInternship, newInternship);
internshipRoutes.get("/my-internship", validateToken, getInternshipsByStudent);

export { internshipRoutes };
