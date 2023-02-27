import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { Token } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { HashProvider } from './providers/hash.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
    private readonly hashProvider: HashProvider,
  ) {}

  private async hashData(data: string): Promise<string> {
    return await this.hashProvider.hashData(data, 10);
  }

  public async getToken(
    userId: string,
    email: string,
    isAdmin: boolean,
  ): Promise<Token> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email: email,
        isAdmin: isAdmin,
      },
      {
        secret: this.configService.get<string>('jwt.secret'),
        expiresIn: this.configService.get<number>('jwt.expiresIn'),
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

    const token = await this.getToken(
      newUser.id,
      newUser.email,
      newUser.isAdmin,
    );

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

    const passwordMatches = await this.hashProvider.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.FORBIDDEN,
      );
    }

    const token = await this.getToken(user.id, user.email, user.isAdmin);

    return token;
  }

  public async getMe(userId: string): Promise<string> {
    const user = await this.usersRepository.findById(userId);

    return user.id;
  }
}
