export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  avatar?: string;
}

export interface UpdatePerfilDto {
  nombre?: string;
  password?: string;
  avatar?: string;
}
