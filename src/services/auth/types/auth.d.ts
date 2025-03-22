export interface LoginRequest {
  credential: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellidos: string;
  usuario: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  usuarioId: string;
  email: string;
  roles: AuthRoles[];
  device: DeviceDto;
}

export enum AuthRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface DeviceDto {
  deviceName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenCreatedAt: Date;
  accessTokenExpiresAt: Date;
  refreshTokenCreatedAt: Date;
  refreshTokenExpiresAt: Date;
  revoked: boolean;
  lastUsedAt: Date;
}
