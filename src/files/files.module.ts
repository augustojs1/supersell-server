import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { UsersRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repositoy';

@Module({
  providers: [
    FilesService,
    FilesRepository,
    UsersRepository,
    ProductsRepository,
  ],
})
export class FilesModule {}
