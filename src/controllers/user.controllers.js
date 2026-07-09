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
    

    const {user, token} = await authServices.userLogin(req.body);

    return res.status(200).json({
      id: user.id,
      dni: user.dni,
      nombre: user.first_name,
      apellidos: user.last_name,
      email: user.email,
      token: user.token,
      role: user.role
    });
  } catch (error) {
    console.error("Login no valido ", error);

    if (error.message == "USER_NOT_FOUND") {
      return res.status(400).json({ message: "Usuario no existe" });
    }

    if (error.message == "WRONG_PASSWORD") {
      return res.status(400).json({ message: "Contraseña no valida" });
    }

    return res.status(500).json({ message: "Error en la base de datos" });
  }
};