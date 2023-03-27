import { Controller, Get, Param, Post, Body, Delete, Put} from '@nestjs/common';
import { PistaService } from './pista.service';
import{Pista} from './pista';

@Controller('pistas')
export class PistaController {
constructor(private pistaService: PistaService) {}

@Get()
public getPistas(): Pista[] {
return this.pistaService.getPistas();
}
@Post()
create(@Body() pista: any): string {
return this.pistaService.addPista(pista);
}
@Get(':id')
public getPista(@Param('id') id): Pista {
return this.pistaService.getPista(parseInt(id));
}

@Delete(':id')
public deletePista(@Param('id') id : number) : string {
return this.pistaService.deletePista(id);
}
@Put(':id')
public update(@Body() pista, @Param('id') id : number) {
return this.pistaService.updatePista(id, pista);
}
}