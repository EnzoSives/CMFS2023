import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PistaController } from './pista/pista.controller';
import { PistaService } from './pista/pista.service';
import { CalculadoraController } from './calculadora/calculadora.controller';
import { CalculadoraService } from './calculadora/calculadora.service';

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'reproductor') }),],
  controllers: [AppController, PistaController, CalculadoraController],
  providers: [AppService, PistaService, CalculadoraService],
})
export class AppModule {}
