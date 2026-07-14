import express from "express";

import {
  newInternship,
  getInternshipsByStudent,
} from "../controllers/internships.controller.js";
import {
  validateRegister,
  validateLogin,
  validateInternship,
} from "../middleware/validator.middleware.js";

const internshipRoutes = express.Router();

internshipRoutes.post("", validateInternship, newInternship);
// GET /internships?student_id=...  
internshipRoutes.get("", getInternshipsByStudent);

export { internshipRoutes };
