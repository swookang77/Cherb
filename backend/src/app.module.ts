import { Module } from '@nestjs/common';
import { VitaminModule } from './vitamin/vitamin.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongodbPassword, typeOrmConfig } from './config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://sungwoo:${mongodbPassword}@cluster0.plzwyjv.mongodb.net/Cherb`,
    ),
    VitaminModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
