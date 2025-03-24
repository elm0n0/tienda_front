export interface UserResponseAPI {
  id: string;
  nombre: string;
  apellidos: string;
  usuario: string;
  email: string;
  idTelefono: string;
  idDireccion: string;
}

export class UserResponse {
  id: string;
  nombre: string;
  apellidos: string;
  usuario: string;
  email: string;
  idTelefono: string;
  idDireccion: string;

  constructor(
    id: string,
    nombre: string,
    apellidos: string,
    usuario: string,
    email: string,
    idTelefono: string,
    idDireccion: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.usuario = usuario;
    this.email = email;
    this.idTelefono = idTelefono;
    this.idDireccion = idDireccion;
  }

  static mapUserResponse(response: UserResponseAPI): UserResponse {
    const userResponse: UserResponse = new UserResponse(
      response.id,
      response.nombre,
      response.apellidos,
      response.usuario,
      response.email,
      response.idTelefono,
      response.idDireccion
    );

    return userResponse;
  }
}
