import { Module } from '@nestjs/common';
import { VitaminModule } from './vitamin/vitamin.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config';
@Module({
  imports: [VitaminModule, UserModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
