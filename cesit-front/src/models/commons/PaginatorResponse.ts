export class PaginatedResponse<T> {
  constructor(
    public data: T[] | null,
    public offset: number,
    public limit: number,
    public total: number
  ) {}
}
