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

  // (letras y números, de 3 a 10 caracteres, admite espacios (nombres compuestos))
  const regex = /^[a-zA-Z ]{3,10}$/;

  return regex.test(name);


}

const validateSurname = (surname) => { 
  if (!surname) {
    return false;
  }

  // (letras y números, de 3 a 20 caracteres). Admite espacios. 
  const regex = /^[a-zA-Z ]{3,20}$/;

  return regex.test(surname);


}


export { validateEmail, validatePassword, usedEmail, validateDni, validateName, validateSurname };