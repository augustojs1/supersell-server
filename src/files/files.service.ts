import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { UsersRepository } from '../users/users.repository';
import { ProductsRepository } from '../products/products.repositoy';
import { File } from '../prisma/models';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  public async create(createFileDto: File[]) {
    if (!createFileDto[0].user_id && !createFileDto[0].product_id) {
      throw new HttpException(
        'User id and product id can not both be null.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (createFileDto[0].user_id && createFileDto[0].product_id) {
      throw new HttpException(
        'User id and product id can not both be sent.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (createFileDto[0].user_id) {
      const user = await this.usersRepository.findById(
        createFileDto[0].user_id,
      );

      if (!user) {
        throw new HttpException(
          'User with this id does not exist!',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.filesRepository.create(createFileDto);

      const files = await this.filesRepository.findByProductId(
        createFileDto[0].product_id,
      );

      return files;
    }

    if (createFileDto[0].product_id) {
      const product = await this.productsRepository.findOneById(
        createFileDto[0].product_id,
      );

      if (!product) {
        throw new HttpException(
          'Product with this id does not exist!',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.filesRepository.create(createFileDto);

      const files = await this.filesRepository.findByProductId(
        createFileDto[0].product_id,
      );

      return files;
    }
  }
}
