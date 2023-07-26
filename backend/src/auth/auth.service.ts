import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async signIn(id: string) {
    const payload = { id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  canActivate(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
  getId(token: string) {
    const decode = this.jwtService.decode(token) as { id: string };
    const id = decode.id;
    console.log(id);
    return id;
  }
}
