import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repositoy';
import { DepartmentsRepository } from '../departments/departments.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, DepartmentsRepository],
})
export class ProductsModule {}
