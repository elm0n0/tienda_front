import httpService from "../httpService";
import { AuthResponse, LoginRequest, RegisterRequest } from "./types/auth";

const REPOSITORY_BASE = "/auth";

const LOGIN_PATH = "/login";

const REGISTER_PATH = "/register";

export interface IAuthService {
  login(loginRequest: LoginRequest): Promise<AuthResponse | null>;
  register(registerRequest: RegisterRequest): Promise<AuthResponse | null>;
}

export class AuthService implements IAuthService {
  async login(loginRequest: LoginRequest): Promise<AuthResponse | null> {
    return await httpService<AuthResponse, LoginRequest>(
      REPOSITORY_BASE,
      LOGIN_PATH,
      {
        method: "POST",
        body: loginRequest,
      }
    );
  }

  async register(
    registerRequest: RegisterRequest
  ): Promise<AuthResponse | null> {
    return await httpService<AuthResponse, RegisterRequest>(
      REPOSITORY_BASE,
      REGISTER_PATH,
      {
        method: "POST",
        body: registerRequest,
      }
    );
  }
}

export const authService = new AuthService();
