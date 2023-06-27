import { Module } from '@nestjs/common';
import { VitaminService } from './vitamin.service';
import { VitaminController } from './vitamin.controller';

@Module({
  controllers: [VitaminController],
  providers: [VitaminService]
})
export class VitaminModule {}
