import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AccessTokenGuard } from '../auth/guards';
import { GetCurrentUserDecorator } from '../auth/decorators';
import type { CurrentUser } from '../auth/interfaces';
import type { Product } from '../prisma/models';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  public async create(
    @Body() createProductDto: CreateProductDto,
    @GetCurrentUserDecorator() user: CurrentUser,
  ): Promise<Product> {
    return await this.productsService.create(user.sub, createProductDto);
  }

  @Get()
  public async findAll() {
    return this.productsService.findAll();
  }

  @Get('department/:departmentId')
  public async findAllByDepartment(
    @Param('departmentId') departmentId: string,
  ) {
    return await this.productsService.findAllByDepartment(departmentId);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetCurrentUserDecorator() user: CurrentUser,
  ) {
    return await this.productsService.update(id, user.sub, updateProductDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
