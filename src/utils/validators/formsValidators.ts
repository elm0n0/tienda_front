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
    errorMessage: valid ? "" : "INVALID_EMAIL",
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
      : "INVALID_PASSWORD",
  };
};

export const isValidNombre = (nombre: string): ValidationResult => {
  const valid: boolean = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{4,}$/.test(nombre);
  return {
    valid,
    errorMessage: valid ? "" : "INVALID_NAME",
  };
};

export const isValidApellidos = (apellidos: string): ValidationResult => {
  const valid: boolean = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,}$/.test(apellidos);
  return {
    valid,
    errorMessage: valid
      ? ""
      : "INVALID_SURNAME",
  };
};

export const isValidUsuario = (usuario: string): ValidationResult => {
  const valid: boolean = /^[A-Za-z0-9]{4,}$/.test(usuario);
  return {
    valid,
    errorMessage: valid
      ? ""
      : "INVALID_USERNAME",
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
