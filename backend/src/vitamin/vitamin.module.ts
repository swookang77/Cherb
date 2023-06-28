import { Module } from '@nestjs/common';
import { VitaminService } from './vitamin.service';
import { VitaminController } from './vitamin.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [VitaminController],
  providers: [VitaminService],
})
export class VitaminModule {}
