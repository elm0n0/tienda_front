import httpService from "../httpService";
import { UserResponseAPI } from "./types/UserResponse";

const REPOSITORY_BASE = "/user";

const GET_BY_ID_PATH = "/getUserById";

export interface IUserService {
  getUserById(userId: string, token: string): Promise<UserResponseAPI | null>;
}

export class UserService implements IUserService {
  async getUserById(
    userId: string,
    token: string
  ): Promise<UserResponseAPI | null> {
    return await httpService<UserResponseAPI, { userId: string }>(
      REPOSITORY_BASE,
      GET_BY_ID_PATH,
      {
        method: "GET",
        body: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export const userService = new UserService();