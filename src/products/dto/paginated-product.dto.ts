import type { Product } from '../../prisma/models';

export class PaginatedProductsDTO {
  data: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
