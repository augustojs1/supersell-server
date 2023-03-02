import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DepartmentsRepository } from '../departments/departments.repository';
import type { Product } from '../prisma/models';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repositoy';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly departmentsRepository: DepartmentsRepository,
  ) {}

  public async create(
    userId: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOneByName(
      createProductDto.name,
    );

    if (product) {
      throw new HttpException(
        'Product with this name already exist!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const department = await this.departmentsRepository.findById(
      createProductDto.department_id,
    );

    if (!department) {
      throw new HttpException(
        'Department with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const newProduct = await this.productsRepository.create(
      userId,
      createProductDto,
    );

    return newProduct;
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

  public async update(
    id: string,
    userId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOneById(id);

    if (!product) {
      throw new HttpException(
        'Product with this id does not exist!',
        HttpStatus.NOT_FOUND,
      );
    }

    if (product.user_id !== userId) {
      throw new HttpException(
        'User can not perform this action!',
        HttpStatus.FORBIDDEN,
      );
    }

    const updatedProduct = await this.productsRepository.update(
      id,
      updateProductDto,
    );

    return updatedProduct;
  }

  public async remove(id: string, userId: string): Promise<void> {
    const product = await this.productsRepository.findOneById(id);

    if (!product) {
      throw new HttpException(
        'Product with this id does not exist!',
        HttpStatus.NOT_FOUND,
      );
    }

    if (product.user_id !== userId) {
      throw new HttpException(
        'User can not perform this action!',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.productsRepository.delete(id);
  }
}
