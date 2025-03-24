export interface DeviceDtoAPI {
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

export class DeviceDto {
  deviceName: string;
  accessToken: string;
  refreshToken: string;
  accessTokenCreatedAt: Date;
  accessTokenExpiresAt: Date;
  refreshTokenCreatedAt: Date;
  refreshTokenExpiresAt: Date;
  revoked: boolean;
  lastUsedAt: Date;

  constructor(
    deviceName: string,
    accessToken: string,
    refreshToken: string,
    accessTokenCreatedAt: Date,
    accessTokenExpiresAt: Date,
    refreshTokenCreatedAt: Date,
    refreshTokenExpiresAt: Date,
    revoked: boolean,
    lastUsedAt: Date
  ) {
    this.deviceName = deviceName;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.accessTokenCreatedAt = accessTokenCreatedAt;
    this.accessTokenExpiresAt = accessTokenExpiresAt;
    this.refreshTokenCreatedAt = refreshTokenCreatedAt;
    this.refreshTokenExpiresAt = refreshTokenExpiresAt;
    this.revoked = revoked;
    this.lastUsedAt = lastUsedAt;
  }

  static mapDeviceDto(device: DeviceDtoAPI): DeviceDto {
    const deviceDto: DeviceDto = {
      deviceName: device.deviceName,
      accessToken: device.accessToken,
      refreshToken: device.refreshToken,
      accessTokenCreatedAt: new Date(device.accessTokenCreatedAt),
      accessTokenExpiresAt: new Date(device.accessTokenExpiresAt),
      refreshTokenCreatedAt: new Date(device.refreshTokenCreatedAt),
      refreshTokenExpiresAt: new Date(device.refreshTokenExpiresAt),
      revoked: device.revoked,
      lastUsedAt: new Date(device.lastUsedAt),
    };

    return deviceDto;
  }
}
/**
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

export interface AuthResponse {
  id: string;
  usuarioId: string;
  email: string;
  roles: AuthRoles[];
  device: DeviceDto;
}

export const mapAuthResponse = (response: string): AuthResponse => {
  return {
    id: response.id,
    usuarioId: response.usuarioId,
    email: response.email,
    roles: mapAuthRoles(response.roles),
    device: mapAuthRoles(response.device),
  };
};

export const mapAuthRoles = (roles: string[]): AuthRoles[] => {
  return roles.map((rol) => {
    switch (rol) {
      case "ADMIN":
        return AuthRoles.ADMIN;
      case "USER":
        return AuthRoles.USER;
      default:
        break;
    }
  });
};

export const mapDeviceDto = (device: string): DeviceDto => {
  return {
    deviceName: device.deviceName,
    accessToken: device.accessToken,
    refreshToken: device.refreshToken,
    accessTokenCreatedAt: new Date(device.accessTokenCreatedAt),
    accessTokenExpiresAt: new Date(device.accessTokenExpiresAt),
    refreshTokenCreatedAt: new Date(device.refreshTokenCreatedAt),
    refreshTokenExpiresAt: new Date(device.refreshTokenExpiresAt),
    revoked: device.revoked,
    lastUsedAt: new Date(device.lastUsedAt),
  };
};
*/
