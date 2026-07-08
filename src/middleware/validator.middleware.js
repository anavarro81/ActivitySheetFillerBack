import {
  validateDni,
  validateEmail,
  validateName,
  validatePassword,
  validateSurname,
} from "../utils/validator.js";

export const validateUserData = (req, res, next) => {
  
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
}
  
