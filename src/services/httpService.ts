import { store } from "../store/auth";
import { setAuthUser } from "../store/auth/authSlice";
import { authService } from "./auth/authService";
import { RefreshTokenRequest } from "./auth/types/RefreshTokenRequest";

interface RequestOptions<T> extends Omit<RequestInit, "body"> {
  body?: T;
}

const API_BASE_URL = "http://localhost";
const API_PORT = "8080";

const httpService = async <TResponse, TBody = undefined>(
  controllerPath: string,
  path: string,
  options: RequestOptions<TBody>
): Promise<TResponse | null> => {
  const { body, ...rest } = options;

  const isGET = rest.method === "GET";
  let url = `${API_BASE_URL}:${API_PORT}${controllerPath}${path}`;

  if (isGET && body && typeof body === "object") {
    const queryParams = new URLSearchParams(
      body as Record<string, string>
    ).toString();
    url += `?${queryParams}`;
  }

  const token = store.getState().auth.user?.device.accessToken;
  let headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(rest.headers || {}),
    ...(token && path != '/refresh-token' ? { Authorization: `Bearer ${token}` } : {}),
  };

  const doFetch = async (): Promise<Response> =>
    fetch(url, {
      ...rest,
      body: !isGET && body ? JSON.stringify(body) : undefined,
      headers,
    });

  let response = await doFetch();

  if (response.status === 401) {

    const token = store.getState().auth.user?.device.accessToken;
    const refresh = store.getState().auth.user?.device.refreshToken;

    if (token != undefined &&
      refresh != undefined
    ) {
      const refreshTokenRequest = new RefreshTokenRequest(
        token,
        refresh
      );

      if (refreshTokenRequest) {
        const newTokens = await authService.refreshToken(refreshTokenRequest);
  
        if (newTokens) {
          store.dispatch(setAuthUser(newTokens));
          headers = {
            ...headers,
            Authorization: `Bearer ${newTokens.device.accessToken}`,
          };
          response = await fetch(url, {
            ...rest,
            body: !isGET && body ? JSON.stringify(body) : undefined,
            headers,
          });
        } else {
          console.warn("Fallo al refrescar el token");
          return null;
        }
      }
    } else {
      console.warn("Fallo al obtener el token del store");
    }
  }

  if (!response.ok) {
    console.error("Error en la petición:", response.statusText);
    return null;
  }

  try {
    const data: TResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error al parsear JSON:", error);
    return null;
  }
};

export default httpService;