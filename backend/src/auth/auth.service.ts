import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = '임시';
    // const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  // const [type, token] = request.headers.authorization?.split(' ') ?? [];
  // return type === 'Bearer' ? token : undefined;
  // }
}
