import User from "../models/user.model.js";
import createError from "http-errors";

import {
  validateEmail,
  validatePassword,
  usedEmail,
  validateDni,
} from "../utils/validator.js";

import bcrypt from "bcrypt";

import { generateSign } from "../utils/jwt.js";

export const createUser = async (userData) => {
  const { email, password } = userData;

  const newUser = new User(userData);

  if (email) {
    const existingEmail = await usedEmail(email);

    if (existingEmail) {
      throw createError(400, "Existing email");
    }
  }

  // Se encripta la password antes de guardarla en la bbdd.
  newUser.password = bcrypt.hashSync(password, 10);

  // Guardar el usuario
  const createdUser = await newUser.save();

  return createdUser;
};

export const userLogin = async (userData) => {
  let searchCondition = null;
  let identificator = null;

  try {
    const { dni, password } = userData;

    const user = await User.findOne({ dni: dni });

    if (!user) {
      throw createError(404, "user not found");
    }

    // Validar contraseñas
    if (!bcrypt.compareSync(password, user.password)) {
      throw createError(400, "wrong password");
    }

    // Generar el token
    const token = generateSign(user._id, dni);

    return {
      user,
      token,
    };
  } catch (error) {
    console.error("Error en el login ", error);
    throw error;
  }
};
