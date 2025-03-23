import httpService from "../httpService";
import { AuthResponseAPI } from "./types/AuthResponse";
import { LoginRequest } from "./types/LoginRequest";
import { RegisterRequest } from "./types/RegisterRequest";

const REPOSITORY_BASE = "/auth";

const LOGIN_PATH = "/login";

const REGISTER_PATH = "/register";

export interface IAuthService {
  login(loginRequest: LoginRequest): Promise<AuthResponseAPI | null>;
  register(registerRequest: RegisterRequest): Promise<AuthResponseAPI | null>;
}

export class AuthService implements IAuthService {
  async login(loginRequest: LoginRequest): Promise<AuthResponseAPI | null> {
    return await httpService<AuthResponseAPI, LoginRequest>(
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
  ): Promise<AuthResponseAPI | null> {
    return await httpService<AuthResponseAPI, RegisterRequest>(
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
