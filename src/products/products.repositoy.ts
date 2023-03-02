import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Product } from '../prisma/models';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    userId: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const product = await this.prismaService.products.create({
      data: {
        user_id: userId,
        ...createProductDto,
      },
    });

    return product;
  }

  public async findAllByDepartment(departmentId: string): Promise<Product[]> {
    const products = await this.prismaService.products.findMany({
      where: {
        department_id: departmentId,
      },
    });

    return products;
  }

  public async findOneByName(name: string): Promise<Product | null> {
    const product = await this.prismaService.products.findFirst({
      where: {
        name: name,
      },
    });

    if (!product) {
      return null;
    }

    return product;
  }

  public async findOneById(id: string): Promise<Product | null> {
    const product = await this.prismaService.products.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) {
      return null;
    }

    return product;
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.prismaService.products.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
      },
    });

    return updatedProduct;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.products.delete({
      where: {
        id,
      },
    });
  }
}
