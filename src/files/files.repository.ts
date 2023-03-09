import { PrismaService } from '../prisma/prisma.service';
import type { File } from '../prisma/models';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(file: File[]): Promise<Prisma.BatchPayload> {
    const createdFiles = await this.prismaService.files.createMany({
      data: file,
    });

    return createdFiles;
  }

  public async findByProductId(product_id: string): Promise<File[] | null> {
    const files = await this.prismaService.files.findMany({
      where: {
        product_id,
      },
    });

    if (files.length === 0) {
      return null;
    }

    return files;
  }
}
