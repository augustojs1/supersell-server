import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { Token } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  private async getToken(userId: string, email: string): Promise<Token> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email: email,
      },
      {
        secret: 'at-secret', // refactor to config module
        expiresIn: 60 * 30, // refactor to config module
      },
    );

    return {
      access_token: accessToken,
    };
  }
  public async signUpLocal(signUpDto: SignUpDto): Promise<Token> {
    const user = await this.usersRepository.findByEmail(signUpDto.email);

    if (user) {
      throw new HttpException(
        'User with this email already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.hashData(signUpDto.password);

    const newUser = await this.usersRepository.create({
      email: signUpDto.email,
      username: signUpDto.username,
      password: hashedPassword,
    });

    const token = await this.getToken(newUser.id, newUser.email);

    return token;
  }

  public async signInLocal(signInDto: SignInDto): Promise<Token> {
    const user = await this.usersRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.FORBIDDEN,
      );
    }

    const passwordMatches = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.FORBIDDEN,
      );
    }

    const token = await this.getToken(user.id, user.email);

    return token;
  }

  public async getMe(userId: string): Promise<string> {
    const user = await this.usersRepository.findById(userId);

    return user.id;
  }
}
