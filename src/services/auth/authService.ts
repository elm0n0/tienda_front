import httpService from "../httpService";
import { AuthResponseAPI } from "./types/AuthResponse";
import { LoginRequest } from "./types/LoginRequest";
import {
  RefreshTokenRequest,
} from "./types/RefreshTokenRequest";
import { RegisterRequest } from "./types/RegisterRequest";

const REPOSITORY_BASE = "/auth";

const LOGIN_PATH = "/login";

const REGISTER_PATH = "/register";

const REFRESH_TOKEN_PATH = "/refresh-token";

export interface IAuthService {
  login(loginRequest: LoginRequest): Promise<AuthResponseAPI | null>;
  register(registerRequest: RegisterRequest): Promise<AuthResponseAPI | null>;
  refreshToken(registerRequest: RefreshTokenRequest): Promise<AuthResponseAPI | null>;
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

  async refreshToken(
    refreshToken: RefreshTokenRequest
  ): Promise<AuthResponseAPI | null> {
    return await httpService<AuthResponseAPI, RefreshTokenRequest>(
      REPOSITORY_BASE,
      REFRESH_TOKEN_PATH,
      {
        method: "POST",
        body: refreshToken,
      }
    );
  }
}

export const authService = new AuthService();
