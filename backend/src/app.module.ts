import { Module } from '@nestjs/common';
import { VitaminModule } from './vitamin/vitamin.module';
@Module({
  imports: [VitaminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
