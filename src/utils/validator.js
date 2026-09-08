import User from "../models/user.model.js";

const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
};

const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(String(password));
};

const usedEmail = async (email) => {
  const users = await User.find({ email: email });
  return users.length;
};

const usedDni = async (dni) => {
  const users = await User.find({ dni: dni });
  return users.length;
};

/*
Validacion de DNI.
- Debe contener: Formato: 8 números y 1 letra, sin espacios ni guiones  
- Se debe comprobar que el resto de la división coincide con la letra de control. 
*/
const validateDni = (dni) => {
  if (typeof dni !== "string") return false;
  //
  const regex = /^\d{8}[A-Za-z]$/;
  if (!regex.test(dni)) return false;

  const number = parseInt(dni.slice(0, 8), 10);
  const letter = dni.charAt(8).toUpperCase();
  const control = "TRWAGMYFPDXBNJZSQVHLCKE";
  const expected = control[number % 23];
  return expected === letter;
};

const validateName = (name) => {
  if (!name) {
    return false;
  }

  // acepta letras con tildes y espacios (nombres compuestos)
  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜü ]{3,10}$/;

  return regex.test(name);
};

const validateSurname = (surname) => {
  if (!surname) {
    return false;
  }

  // acepta letras con tildes y espacios
  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜü ]{3,20}$/;

  return regex.test(surname);
};

// Solo puede completar la semana en curso si es el último dia de la seman o en la fecha de fin de prácticas.
export const canCompleteWeek = (
  currentDate,
  weeekEndDate,
  internshipEndDate,
) => {

  const current = new Date(currentDate).setUTCHours(0, 0, 0, 0);
  const weekend = new Date(weeekEndDate).setUTCHours(0, 0, 0, 0);
  const interShipEnd = new Date(internshipEndDate).setUTCHours(0, 0, 0, 0);


  return current === weekend || current === interShipEnd;
};

export {
  validateEmail,
  validatePassword,
  usedEmail,
  validateDni,
  validateName,
  validateSurname,
  usedDni,
};
