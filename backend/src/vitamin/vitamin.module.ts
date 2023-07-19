import { Module } from '@nestjs/common';
import { VitaminService } from './vitamin.service';
import { VitaminController } from './vitamin.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [VitaminController],
  providers: [VitaminService, AuthService],
})
export class VitaminModule {}
