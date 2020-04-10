import { AcompanhamentoListaPage } from '../acompanhamento-lista/acompanhamento-lista';
import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { AcoesEscorePage } from '../acoes-escore/acoes-escore';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';

@Component({
  selector: 'page-escore',
  templateUrl: 'escore.html',
})
export class EscorePage implements OnInit  {
  consulta: any;
  //total: number; 

  constructor(public navCtrl: App, public provedor: HttpLeitos) {
  }

  ngOnInit() {   
    this.consulta = this.provedor.getConsulta();   
    //this.total = 0; 
   }

  getScoreClass(score) {    
    //debugger;    
    if (score ==  0) return 'branco menu_text';
    if (score ==  1 || score ==  2 || score ==  4) return 'verde menu_text';
    if (score == 3 && this.valida_amarelo() == true) return 'amarelo';
    if (score == 3 && this.valida_amarelo() == false) return 'verde';
    if (score >= 5 && score <= 6) return 'amarelo menu_text';
    if (score >=  7) return 'vermelho menu_text';
  } 
  
  valida_amarelo() {
    if (this.escoreFr(this.consulta.fr) == 3) {
      return true;
    }
    if (this.escoreFc(this.consulta.fc) == 3) {
     return true;
    }    
    if (this.escorePasist(this.consulta.pasist) == 3) {
     return true;
    } 
    if (this.escoreNc(this.consulta.nc) == 3) {
     return true;
    } 
 
    return false;
  }

  acao() {
    this.navCtrl.getRootNav().push(AcoesEscorePage); 
  }

  escoreFr(evento) {
    if (this.consulta.fr >= 9 && this.consulta.fr <= 14) {
      return 0; 
    }
    if (this.consulta.fr >= 15 && this.consulta.fr <= 20) {
      return 1; 
    } 
    if (this.consulta.fr >= 21 && this.consulta.fr <= 29) {
      return 2; 
    } 
    if (this.consulta.fr < 9) {
      return 2; 
    }
    if (this.consulta.fr >= 30) {
      return 3; 
    }
  }  

   escoreTemp(evento) {   

    if (this.consulta.temp >= 35 && this.consulta.temp <= 38.4) {
      return 0; 
    }
    if (this.consulta.temp < 35) {
      return 2;  
    }     
    if (this.consulta.temp >= 38.5) {  
      return 2;    
    }
  }
  
  escorePasist(evento) {    
    if (this.consulta.pasist >= 81 && this.consulta.pasist <= 100) {
      return 1; 
    }
    if (this.consulta.pasist >= 101 && this.consulta.pasist <= 199) {
      return 0;     
    }
    if (this.consulta.pasist >= 71 && this.consulta.pasist <= 80) {
      return 2; 
    }
    if (this.consulta.pasist >= 200) {
      return 2; 
    }
    if (this.consulta.pasist <= 70) {
      return 3; 
    }
  }  

  escoreFc(evento) {    
    if (this.consulta.fc >= 51 && this.consulta.fc <= 100) {
      return 0;     
    }
    if (this.consulta.fc >= 41 && this.consulta.fc <= 50) {
      return 1;  
    }
    if (this.consulta.fc >= 101 && this.consulta.fc <= 110) {
      return 1;  
    }
    if (this.consulta.fc >= 111 && this.consulta.fc <= 129) {
      return 2;  
    }
    if (this.consulta.fc <= 40) {
      return 2; 
    }
    if (this.consulta.fc >= 130 ) {
      return 3;  
    }
  }   

  escoreNc(evento) {   
   // debugger;
    if (this.consulta.nc == 'Alerta') {
      return 0
    } 
    if (this.consulta.nc == 'Reage a voz') {
      return 1
    } 
    if (this.consulta.nc == 'Reage a dor') {
      return 2
    } 
    if (this.consulta.nc == 'Sem reação') {
      return 3
    }      
  } 

 /* 
  calculaEscore($event) {

  this.total = this.total + this.escoreFr(this.consulta.fr);
  this.total = this.total + this.escoreFr(this.consulta.fc);
  this.total = this.total + this.escoreFr(this.consulta.temp);
  this.total = this.total + this.escoreFr(this.consulta.pasist);
  this.total = this.total + this.escoreFr(this.consulta.nc);
  return this.total;
 } 
 */
 
voltar() {       
  this.navCtrl.getRootNav().push(AcompanhamentoListaPage);  
}

}
