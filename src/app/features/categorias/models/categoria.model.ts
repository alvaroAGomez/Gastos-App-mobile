export interface Categoria {
  id: number;
  nombre: string;
  icono: string;
  color?: string;
  esPersonalizada: boolean;
  usuarioId?: number;
}

export interface CreateCategoriaDto {
  nombre: string;
  icono: string;
  color?: string;
}

export interface UpdateCategoriaDto extends Partial<CreateCategoriaDto> {}
