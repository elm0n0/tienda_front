interface RequestOptions<T> extends Omit<RequestInit, "body"> {
  body?: T;
}

const API_BASE_URL = "http://localhost";
const API_PORT = "8080";

const httpService = async <TResponse, Tbody = undefined>(
  controllerPath: string,
  path: string,
  options: RequestOptions<Tbody>
): Promise<TResponse | null> => {
  const { body, ...rest } = options;

  try {
    const response = await fetch(
      `${API_BASE_URL}:${API_PORT}${controllerPath}${path}`,
      {
        ...rest,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          "Content-Type": "application/json",
          ...(rest.headers || {}),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error al realizar la petición: ${response.statusText}`);
    }

    const data: TResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return null;
  }
};

export default httpService;
