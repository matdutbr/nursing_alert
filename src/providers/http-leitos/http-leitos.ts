import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpLeitos {  
    leitos: any[];
    leito: any;
    consulta: any;
    reavaliar: any;
    coren: any;
    estado: any;
    ultimoscore: any;

  constructor() {     
    this.leitos = [];
    this.reavaliar = 0; 
    this.coren = "";
    this.estado = "";
    this.ultimoscore = 0;
    //console.log('Bem vindo Provider');
        
  }

  setLeito(leito) {
    this.leito = leito;
  }
  getLeito() {
    return this.leito;
  }

  setConsulta(consulta) {
    this.consulta = consulta;
  }
  getConsulta() {
    return this.consulta;
  }

  getReavaliar() {
    return this.reavaliar;
  }

  setReavaliar(reavaliar) {
    this.reavaliar = reavaliar;    
  }

  setCoren(coren) {
    this.coren = coren;
  }
  getCoren() {
    return this.coren;
  }

  setEstado(estado) {
    this.estado = estado;
  }
  getEstado() {
    return this.estado;
  }

  setUltimoEscore(ultimoscore) {
    this.ultimoscore = ultimoscore;
  }
  getUltimoScore() {
    return this.ultimoscore;
  }

}
