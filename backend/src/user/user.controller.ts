import { Post, Body, Controller, HttpException, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/join')
  async join(@Body() createUserDto: CreateUserDto) {
    const { id, password, email } = createUserDto;
    const isExistId = await this.userService.isExistId(id);
    if (isExistId) throw new HttpException('id already exists', 409);
    await this.userService.save(id,password,email);
    return { message: '회원가입 완료. 로그인 해주세요.' };
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    //id있는지 확인
    const { id, password } = loginUserDto;
    const isExistId = await this.userService.isExistId(id);
    if (!isExistId)
      throw new HttpException(
        'id를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요',
        404,
      );
    //id,pw 일치확인.
    const isMatch = await this.userService.checkUser(id, password);
    if (!isMatch)
      throw new HttpException(
        '비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요',
        401,
      );
    //jwt발급
    const jwt = await this.authService.signIn(id);
    response.cookie('accesstoken', jwt.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return { message: '로그인 완료' };
  }
}
