export interface RefreshTokenRequestAPI {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
