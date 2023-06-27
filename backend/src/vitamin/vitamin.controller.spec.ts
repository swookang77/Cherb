import { Test, TestingModule } from '@nestjs/testing';
import { VitaminController } from './vitamin.controller';
import { VitaminService } from './vitamin.service';

describe('VitaminController', () => {
  let controller: VitaminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VitaminController],
      providers: [VitaminService],
    }).compile();

    controller = module.get<VitaminController>(VitaminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
