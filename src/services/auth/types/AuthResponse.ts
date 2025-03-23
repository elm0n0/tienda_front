import { AuthRoles } from "./AuthRoles";
import { DeviceDto, DeviceDtoAPI } from "./DeviceDto";

export interface AuthResponseAPI {
  id: string;
  usuarioId: string;
  email: string;
  roles: string[];
  device: DeviceDtoAPI;
}

export class AuthResponse {
  id: string;
  usuarioId: string;
  email: string;
  roles: AuthRoles;
  device: DeviceDto;

  constructor(
    id: string,
    usuarioId: string,
    email: string,
    roles: AuthRoles,
    device: DeviceDto
  ) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.email = email;
    this.roles = roles;
    this.device = device;
  }

  static mapAuthResponse(response: AuthResponseAPI): AuthResponse {
    const roles: AuthRoles = new AuthRoles(response.roles);

    const device: DeviceDto = DeviceDto.mapDeviceDto(response.device);

    return new AuthResponse(
      response.id,
      response.usuarioId,
      response.email,
      roles,
      device
    );
  }
}
