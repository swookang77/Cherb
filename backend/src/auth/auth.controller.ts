import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  async authenticate(@Req() request: Request) {
    const accesstoken = request.cookies['accesstoken'];
    const tokenStatus = await this.authService.canActivate(accesstoken);
    return tokenStatus;
  }
}
