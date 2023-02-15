import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from '../auth/dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(signUpDto: SignUpDto) {
    const newUser = await this.prisma.user.create({
      data: {
        username: signUpDto.username,
        email: signUpDto.email,
        password: signUpDto.password,
      },
    });

    return newUser;
  }

  public async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return user;
    }

    return null;
  }

  public async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (user) {
      return user;
    }

    return null;
  }
}
