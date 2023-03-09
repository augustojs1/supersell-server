import { File } from 'src/prisma/models';
import { Product } from 'src/prisma/models';

export class CompleteProductDto extends Product {
  files: File[];
}
