import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { DepartmentsModule } from './departments/departments.module';
import { ProductsModule } from './products/products.module';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './tmp',
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DepartmentsModule,
    ProductsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
