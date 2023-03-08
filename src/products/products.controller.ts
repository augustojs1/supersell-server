import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedProductsDTO } from './dto/paginated-product.dto';
import { AccessTokenGuard } from '../auth/guards';
import { GetCurrentUserDecorator } from '../auth/decorators';
import type { CurrentUser } from '../auth/interfaces';
import type { Product } from '../prisma/models';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 6, {
      storage: diskStorage({
        destination: './tmp/products',
        filename: function (_, file, callback) {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  )
  public async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @GetCurrentUserDecorator() user: CurrentUser,
  ): Promise<void> {
    // return await this.productsService.create(user.sub, createProductDto);
  }

  @Get()
  public async searchProduct(
    @Query('search') search: string,
  ): Promise<Product[]> {
    return await this.productsService.searchByName(search);
  }

  @Get('department/:departmentId')
  public async findAllByDepartment(
    @Param('departmentId') departmentId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedProductsDTO> {
    return await this.productsService.findAllByDepartment(
      { page: Number(page), limit: Number(limit) },
      departmentId,
    );
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<string> {
    return this.productsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetCurrentUserDecorator() user: CurrentUser,
  ): Promise<Product> {
    return await this.productsService.update(id, user.sub, updateProductDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  public async remove(
    @Param('id') id: string,
    @GetCurrentUserDecorator() user: CurrentUser,
  ): Promise<void> {
    return await this.productsService.remove(id, user.sub);
  }
}
