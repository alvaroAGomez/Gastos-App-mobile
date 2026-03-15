export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  message: string;
  status: number;
  error?: string | string[];
}

export interface PaginatedResponse<T> {
  gastos: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  ok: false;
  message: string;
  error?: any;
  status: number;
}
