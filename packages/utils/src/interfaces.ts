export interface PaginationResult<T> {
  data: T[],
  pagination: {
    count: number,
    totalPages: number,
    page: number,
    limit: number,
  },
}

export interface PaginationResponse<T> {
  data: T[],
  meta: {
    count: number,
    totalPages: number,
    page: number,
    limit: number,
  },
}

