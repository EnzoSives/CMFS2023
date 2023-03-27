import { Test, TestingModule } from '@nestjs/testing';
import { CalculadoraController } from './calculadora.controller';

describe('CalculadoraController', () => {
  let controller: CalculadoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculadoraController],
    }).compile();

    controller = module.get<CalculadoraController>(CalculadoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
