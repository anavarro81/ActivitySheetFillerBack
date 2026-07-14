import {
  validateDni,
  validateEmail,
  validateName,
  validatePassword,
  validateSurname,
} from "../utils/validator.js";

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
