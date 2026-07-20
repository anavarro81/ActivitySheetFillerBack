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
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server" });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await authServices.userLogin(req.body);

    return res.status(200).json({
      id: user.id,
      dni: user.dni,
      nombre: user.first_name,
      apellidos: user.last_name,
      email: user.email,
      token: token,
      role: user.role,
    });
  } catch (error) {
    console.error("Login no valido ", error);
    const status = error.status || 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server" });
  }
};
