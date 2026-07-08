import * as authServices from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const createdUser = await authServices.createUser(req.body);

    return res.status(201).json({
      id: createdUser._id,
      identificator: createdUser.dni,
      fullName: `${createdUser.first_name} ${createdUser.last_name}`,
      email: createdUser.email,
      role: createdUser.role,
    });
  } catch (error) {
    console.error("Error en el registro ", error);

    if (error.message == "EXISTING_EMAIL") {
      return res.status(400).json({ message: "El email ya existe" });
    }

    return res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    // Comprueba si existe el email en bbdd.

    const user = await authServices.userLogin(req.body);

    return res.status(200).json({
      id: user.id,
      identificator: user.identificator,
      token: user.token,
    });
  } catch (error) {
    console.error("Se ha producido un error ", error);
    if (error.message == "IDENTIFICATOR_NOT_VALID") {
      return res.status(400).json({ message: "Identificador no válido" });
    }

    if (error.message == "USER_NOT_FOUND") {
      return res.status(400).json({ message: "Usuario no existe" });
    }

    if (error.message == "WRONG_PASSWORD") {
      return res.status(400).json({ message: "Contraseña no valida" });
    }

    return res.status(500).json({ message: "Error en la base de datos" });
  }
};