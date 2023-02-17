import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AcessTokenStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { HashProvider } from './providers/hash.provider';
@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AcessTokenStrategy, HashProvider],
})
export class AuthModule {}
