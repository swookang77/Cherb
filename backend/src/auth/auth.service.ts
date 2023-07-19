import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/config';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async signIn(id: string) {
    const payload = { id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async canActivate(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
