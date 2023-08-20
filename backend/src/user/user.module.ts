import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:'User',schema:UserSchema}]), AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
