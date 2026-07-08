import User from "../models/user.model.js";
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
      throw new Error("EXISTING_EMAIL");
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

  const { email, name, dni, password } = userData;

  if (email) {
    searchCondition = { email };
    identificator = email;
  } else if (name) {
    searchCondition = { name };
    identificator = name;
  } else if (dni) {
    searchCondition = { dni };
    identificator = dni;
  }

  if (!searchCondition) {
    throw new Error("IDENTIFICATOR_NOT_VALID");
  }

  const user = await User.findOne(searchCondition);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  // Validar contraseñas
  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error("WRONG_PASSWORD");
  }

  // Generar el token
  const token = generateSign(user._id, identificator);

  return {
    id: user._id,
    identificator,
    token,
  };
};