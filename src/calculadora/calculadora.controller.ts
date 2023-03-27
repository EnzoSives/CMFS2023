import { Controller, Get, Param } from '@nestjs/common';
import { CalculadoraService } from './calculadora.service';

@Controller('calculadora')
export class CalculadoraController {
constructor (private calculadoraService : CalculadoraService) {}

@Get(':oper/:ope1/:ope2')
ejecutar(@Param('oper') oper, @Param('ope1') ope1, @Param('ope2') ope2) : string {
let num1=parseInt(ope1);
let num2=parseInt(ope2);
return this.calculadoraService.getResultado(oper, num1, num2);
}
}