import { AuthResponse, LoginRequest } from "./types/auth";


const API_URL = 'http://localhost:8080/auth/login';

export const authService = {
  login: async (loginRequest: LoginRequest): Promise<AuthResponse | null> => {
    try {
      const response = await fetch(API_URL, {
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
};
  