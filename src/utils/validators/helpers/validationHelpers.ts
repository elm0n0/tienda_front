import {
  isValidApellidos,
  isValidEmail,
  isValidNombre,
  isValidPassword,
  isValidUsuario,
} from "../formsValidators";

export const validateField = (field: string, value: string) => {
  switch (field) {
    case "email":
      return isValidEmail(value);
    case "password":
      return isValidPassword(value);
    case "nombre":
      return isValidNombre(value);
    case "apellidos":
      return isValidApellidos(value);
    case "usuario":
      return isValidUsuario(value);
    default:
      return { valid: true, errorMessage: "" };
  }
};
