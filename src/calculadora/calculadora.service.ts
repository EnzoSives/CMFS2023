import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
public getResultado(ope : string, op1 : number, op2 : number) : any {
let resultado=null;
switch (ope) {
case 'sumar':
resultado = { "resultado" : `${op1+op2}` };
break;
case 'restar':
resultado = { "resultado" : `${op1-op2}` };
break;
case 'multiplicar':
resultado = { "resultado" : `${op1*op2}` };
break;
case 'dividir':
if (op2 == 0){
resultado = { "resultado" : "Division por 0"};
} else {
resultado = { "resultado" : `${op1/op2}` };
}
break;

}
return resultado;
}}