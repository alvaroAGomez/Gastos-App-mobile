export interface Categoria {
  id: number;
  nombre: string;
  icono?: string;
  color_hex?: string;
  es_global?: boolean;
  usuarioId?: number;
}

// ── DTOs de creación/actualización (POST/PATCH /categoria) ────────────────
export interface CreateCategoriaDto {
  nombre: string;
  es_global: boolean;
  color_hex?: string;
  icono?: string;
}

export interface UpdateCategoriaDto extends Partial<CreateCategoriaDto> {}
