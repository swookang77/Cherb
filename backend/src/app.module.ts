import { Module } from '@nestjs/common';
import { VitaminModule } from './vitamin/vitamin.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    VitaminModule,
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
