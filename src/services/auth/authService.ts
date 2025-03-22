import { AuthResponse, LoginRequest, RegisterRequest } from "./types/auth";


const API_BASE_URL = 'http://localhost';

const API_PORT = '8080';

const REPOSITORY_BASE = '/auth';

const LOGIN_PATH = '/login';

const REGISTER_PATH = '/register'

export const authService = {
  login: async (loginRequest: LoginRequest): Promise<AuthResponse | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}:${API_PORT}${REPOSITORY_BASE}${LOGIN_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': navigator.userAgent,
        },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data: AuthResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      return null;
    }
  },

  register: async (registerRequest:RegisterRequest): Promise<AuthResponse | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}:${API_PORT}${REPOSITORY_BASE}${REGISTER_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': navigator.userAgent,
        },
        body: JSON.stringify(registerRequest),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data: AuthResponse = await response.json();
      return data;

    } catch (error) {
      console.error('Error en login:', error);
      return null;
    }
  }

};
  