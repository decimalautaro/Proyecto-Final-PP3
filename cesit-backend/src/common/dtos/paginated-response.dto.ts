class PaginatedResponseDto<T> {
  constructor(
    public data: T[] | null,
    public offset: number,
    public limit: number,
    public total: number,
  ) {}
}

export default PaginatedResponseDto;
