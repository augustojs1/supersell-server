import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';
import { AccessTokenGuard } from './guards';
import { Request } from 'express';
import { Token } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/signup')
  public async signUpLocal(@Body() signUpDto: SignUpDto): Promise<Token> {
    return await this.authService.signUpLocal(signUpDto);
  }

  @Post('local/signin')
  public async signInLocal(@Body() signInDto: SignInDto): Promise<Token> {
    return await this.authService.signInLocal(signInDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('local/me')
  public async getMe(@Req() req: Request): Promise<string> {
    return await this.authService.getMe(req.user['sub']);
  }
}
