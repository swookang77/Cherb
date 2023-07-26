import { Module } from '@nestjs/common';
import { VitaminService } from './vitamin.service';
import { VitaminController } from './vitamin.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CombinationSchema } from './schema/combination.schema';
import { CombiListSchema } from './schema/combiList.schema';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Combination', schema: CombinationSchema },
      { name: 'CombiList', schema: CombiListSchema },
    ]),
  ],
  controllers: [VitaminController],
  providers: [VitaminService, AuthService],
})
export class VitaminModule {}
