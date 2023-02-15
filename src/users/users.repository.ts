import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from '../auth/dto';
import { User } from '../prisma/models';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(signUpDto: SignUpDto): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        username: signUpDto.username,
        email: signUpDto.email,
        password: signUpDto.password,
      },
    });

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | null> {
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

  public async findById(id: string): Promise<User | null> {
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
