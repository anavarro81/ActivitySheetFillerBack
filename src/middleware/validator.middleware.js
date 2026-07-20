import {
  validateDni,
  validateEmail,
  validateName,
  validatePassword,
  validateSurname,
} from "../utils/validator.js";
import Internship from "../models/intenships.model.js";
import { verifySign } from "../utils/jwt.js";

export const validateRegister = (req, res, next) => {
  const { dni, first_name, last_name, email, password, role } = req.body;

  if (!validateDni(dni)) {
    return res.status(400).json({ message: "Dni no valido" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "El email no es valido" });
  }

  if (!validateName(first_name)) {
    return res.status(400).json({ message: "Nombre no valido" });
  }

  if (!validateSurname(last_name)) {
    return res.status(400).json({ message: "Apellido no valido" });
  }

  if (role != "student") {
    return res.status(400).json({ message: "El rol debe ser student" });
  }

  // Validar la password
  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Password no valida" });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { dni, password } = req.body;

  if (!validateDni(dni)) {
    return res.status(400).json({ message: "Dni no valido" });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Password no valida" });
  }

  next();
};

export const validateInternship = (req, res, next) => {
  const { student_id, company_name, start_date, end_date, status } = req.body;

  if (!student_id) {
    return res.status(400).json({ message: "student_id is required" });
  }

  if (!company_name) {
    return res.status(400).json({ message: "company_name is required" });
  }

  if (!start_date) {
    return res.status(400).json({ message: "start_date is required" });
  }

  const start = new Date(start_date);
  const today = new Date();
  // normalize time for comparison
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (isNaN(start.getTime())) {
    return res.status(400).json({ message: "start_date is not a valid date" });
  }

  if (start <= today) {
    return res.status(400).json({ message: "start_date must be after today" });
  }

  if (!end_date) {
    return res.status(400).json({ message: "end_date is required" });
  }

  const end = new Date(end_date);
  if (isNaN(end.getTime())) {
    return res.status(400).json({ message: "end_date is not a valid date" });
  }

  // Normalize date to compare.
  end.setHours(0, 0, 0, 0);

  if (end <= start) {
    return res
      .status(400)
      .json({ message: "end_date must be after start_date" });
  }

  if (status !== "active") {
    return res.status(400).json({ message: "status must be 'active'" });
  }

  next();
};

export const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "no autorizado" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "no autorizado" });
  }

  const token = parts[1];

  console.log("token recibido ", token);

  try {
    let payload;
    try {
      payload = verifySign(token);
    } catch (e) {
      return res.status(401).json({ message: "no autorizado" });
    }

    const studentId = payload._id || payload.id;

    console.log("payload ", payload);

    console.log("studentId ", studentId);

    if (!studentId) {
      return res.status(401).json({ message: "no autorizado" });
    }

    const internship = await Internship.findOne({
      student_id: studentId,
    }).exec();

    if (!internship) {
      console.error("Estudiante sin practicas asociadas");
      return res.status(401).json({ message: "no autorizado" });
    }

    console.log("studentId >> ", studentId);

    // Attach student id to request for controllers
    req.student_id = studentId;
    next();
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
