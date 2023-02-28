import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  public async create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  public async findAll() {
    return `This action returns all products`;
  }

  public async findAllByDepartment(departmentId: string) {
    return `This action returns all products with department id #${departmentId}`;
  }

  public async findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  public async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  public async remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
