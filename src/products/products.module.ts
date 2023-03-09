import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repositoy';
import { DepartmentsRepository } from '../departments/departments.repository';
import { FilesService } from '../files/files.service';
import { FilesRepository } from '../files/files.repository';
import { UsersRepository } from '../users/users.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    DepartmentsRepository,
    FilesService,
    FilesRepository,
    UsersRepository,
  ],
})
export class ProductsModule {}
