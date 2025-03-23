interface FieldToValidate {
  field: string;
  value: string;
  validators: Validator[];
}

export interface ValidationRule {
  field: string;
  value: string;
  validators: ((value: string) => boolean)[];
  errorMessage: string;
}

export interface ValidationResult {
  valid: boolean;
  errorMessage: string;
}

export type Validator = (value: string) => ValidationResult;

export type FormValidationResult = Record<
  string,
  { valid: boolean; errorMessage: string }
>;

export const isValidEmail: Validator = (email) => {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return {
    valid,
    errorMessage: valid ? "" : "El correo no es válido",
  };
};

export const isValidPassword = (password: string): ValidationResult => {
  const minLength = password.length >= 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const valid: boolean =
    minLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
  return {
    valid,
    errorMessage: valid
      ? ""
      : "La contraseña debe tener al menos 12 caracteres, incluyendo mayúsculas, minúsculas, un número y un símbolo.",
  };
};

export const isValidNombre = (nombre: string): ValidationResult => {
  const valid: boolean = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{4,}$/.test(nombre);
  return {
    valid,
    errorMessage: valid ? "" : "el Nombre debe tener un minimo de 4 letras",
  };
};

export const isValidApellidos = (apellidos: string): ValidationResult => {
  const valid: boolean = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,}$/.test(apellidos);
  return {
    valid,
    errorMessage: valid
      ? ""
      : "el Apellido debe tener un minimo de 4 letras y están permitidos los espacios",
  };
};

export const isValidUsuario = (usuario: string): ValidationResult => {
  const valid: boolean = /^[A-Za-z0-9]{4,}$/.test(usuario);
  return {
    valid,
    errorMessage: valid
      ? ""
      : "el usuario debe tener un minimo de 4 caracteres que sean letras y numeros",
  };
};

export const validateForm = (
  fields: FieldToValidate[]
): FormValidationResult => {
  const result: FormValidationResult = {};

  fields.forEach(({ field, value, validators }) => {
    for (const validator of validators) {
      const { valid, errorMessage } = validator(value);
      if (!valid) {
        result[field] = { valid: false, errorMessage };
        return;
      }
    }
    result[field] = { valid: true, errorMessage: "" };
  });

  return result;
};
