import { Test, TestingModule } from '@nestjs/testing';
import { PartysController } from './partys.controller';

describe('PartysController', () => {
  let controller: PartysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartysController],
    }).compile();

    controller = module.get<PartysController>(PartysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
