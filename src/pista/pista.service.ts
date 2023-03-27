import { Injectable } from '@nestjs/common';
import { Pista } from './pista';
import * as fs from 'fs';

@Injectable()
export class PistaService {
  [x: string]: any;
  private static readonly CANTIDAD_PISTAS = 10;
  private listaPistas: Pista[] = [];
  constructor() {
    this.loadPistas();
  }

  private loadPistas(): void {
    let archivo = fs.readFileSync('./src/pista/pistas.csv', 'utf8');
    let datos = archivo
      .split('\n')
      .map((p) => p.replace('\r', ''))
      .map((p) => p.split(','));
    this.listaPistas = [];
    for (let i = 0; i < datos.length; i++) {
      let pista = new Pista(
        parseInt(datos[i][0]),
        datos[i][1],
        parseInt(datos[i][2]),
        datos[i][3],
      );
      this.listaPistas.push(pista);
    }
  }
  public getPistas(): Pista[] {
    return this.listaPistas;
  }

  public addPista(pistaNueva: any): string {
    let pista = new Pista(
      pistaNueva.identificador,
      pistaNueva.titulo,
      pistaNueva.duracion,

      pistaNueva.interprete,
    );

    if (
      pista.getIdentificador() &&
      pista.getTitulo() &&
      pista.getDuracion() &&
      pista.getInterprete()
    ) {
      this.listaPistas.push(pista);
      fs.appendFileSync(
        './src/pista/pistas.csv',
        `\n${pista.getIdentificador()},${pista.getTitulo()},${pista.getDuracion()},${pista.getInterprete()}`,
      );
      return 'ok';
    } else return 'parametros incorrectos';
  }

  public getPista(id: number): Pista {
    let pista = null;
    // Más adelante agregar manejo de status code
    for (let i = 0; i < this.listaPistas.length; i++) {
      if (this.listaPistas[i].getIdentificador() == id) {
        pista = this.listaPistas[i];
      }
    }
    return pista;
  }

  public deletePista(id: Number): string {
    let index = this.listaPistas.filter(pista => pista.getIdentificador() != id);
    console.log(index)
    if (index.length != this.listaPistas.length) {
      this.listaPistas = index;
      return "ok";
    }
    return "404";
  }

  public reWriteCSV(){
    this.listaPistas.forEach(pista => {
        fs.appendFileSync('./src/pista/pistas.csv',
        `\n${pista.getIdentificador()},${pista.getTitulo()},${pista.getDuracion()},${pista.getInterprete()}`,
      );})  

    }
  

  public updatePista(id : number, pistaNueva: any): string {
    let index = this.listaPistas.filter(pista => pista.getIdentificador() != id);

    if(index.length != this.listaPistas.length){
      let updatePista = new Pista(pistaNueva.identificador,pistaNueva.titulo,pistaNueva.duracion,pistaNueva.interprete);
      this.deletePista(id);
      this.listaPistas.push(updatePista)

      return "ok";
      }
      else{
      return "404";
      }
    }
  }

  /*public getPistas(): any {
    let listaPistas = [];
    for (let i = 0; i < PistaService.CANTIDAD_PISTAS; i++) {
      let pista = {
        identificador: i,
        titulo: `titulo ${i}`,
        duracion: Math.floor(Math.random() * 300),
        interprete: `interprete ${Math.floor(Math.random() * 3)}`,
      };
      listaPistas.push(pista);
    }
    return listaPistas;
  }*/

