export class Pista{
    private identificador:number;
    private titulo:string;
    private duracion:number;
    private interprete:string;
    constructor(identificacion:number,titulo:string,duracion:number,interprete:string){
        this.identificador = identificacion;
        this.titulo = titulo;
        this.duracion = duracion;
        this.interprete = interprete;
    }

    getIdentificador(){
        return this.identificador;
    }
    getTitulo(){
        return this.titulo;
    }
    getDuracion(){
        return this.duracion;
    }
    getInterprete(){
        return this.interprete;
    }
}