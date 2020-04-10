import { AcompanhamentoListaPage } from '../acompanhamento-lista/acompanhamento-lista';
import { Component, OnInit } from '@angular/core';
import { App, NavController } from 'ionic-angular';
import { EscorePage } from '../escore/escore';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';
import { NativeInterfaceService } from '../../app/services/native-interface/native-interface.service';

@Component({
  selector: 'page-sinais-vitais',
  templateUrl: 'sinais-vitais.html',
})
export class SinaisVitaisPage implements OnInit {  
 fr: number; temp: number; pasist: number; fc: number; nc: string; score: string;
 isLabelActive: Boolean = false;

 leito: any;
 consulta: any;
 total: number;
 score_calculado: any;
 leito_consulta: any;
 cor_calculada: string;

  constructor(public navCtrl: App, public provedor: HttpLeitos, public nav: NavController) {
  }

  ngOnInit() {   
    this.leito = this.provedor.getLeito();
    this.consulta = this.provedor.getConsulta();  
    this.leito_consulta = this.provedor.getLeito();
    this.total = 0;   
   }

   getClassNivelConsciencia() {
    //debugger;    
    if (this.consulta != null) {    
      if (this.consulta.nc == 'Alerta') {
          return 'branco'
      } 
      if (this.consulta.nc == 'Reage a voz') {
        return 'verde'
      } 
      if (this.consulta.nc == 'Reage a dor') {
        return 'amarelo'
      } 
      if (this.consulta.nc == 'Sem reação') {
        return 'vermelho'
      }      
    }     
  }

  getClassFr() {        
    //debugger;
    if (this.consulta.fr != null) {    
    
      if (this.consulta.fr >= 9 && this.consulta.fr <= 14) {
          return 'branco'
      } 
      if (this.consulta.fr >= 15 && this.consulta.fr <= 20) {
          return 'verde'
      }    
      if (this.consulta.fr >= 21 && this.consulta.fr <= 29) { 
          return 'amarelo'    
      }    
      if (this.consulta.fr < 9) { 
          return 'amarelo' 
      }      
      if (this.consulta.fr >= 30) {
          return 'vermelho'                 
      } 
    } else {
      return 'branco' 
    }    
  } 

  getClassTemp() {   
    
    if (this.consulta.temp != null) {    
      if (this.consulta.temp >= 35 && this.consulta.temp <= 38.4) {
          return 'branco'
      } 
      if (this.consulta.temp < 35) {
          return 'amarelo'
      }    
      if (this.consulta.temp >= 38.5) { 
          return 'amarelo'    
      }    
    } else {
      return 'branco' 
    }     
  } 

  getClassPasist() {   
    
    if (this.consulta.pasist != null) {    
      if (this.consulta.pasist >= 81 && this.consulta.pasist <= 100) {
          return 'verde'
      } 
      if (this.consulta.pasist >= 101 && this.consulta.pasist <= 199) {
          return 'branco'
      }    
      if (this.consulta.pasist >= 71 && this.consulta.pasist <= 80) { 
          return 'amarelo'    
      }    
      if (this.consulta.pasist >= 200) { 
          return 'amarelo' 
      }      
      if (this.consulta.pasist <= 70) {
          return 'vermelho'                 
      } 
    } else {
      return 'branco' 
    }      
  } 

  getClassFc() {   
    
    if (this.consulta.fc != null) {    
      if (this.consulta.fc >= 51 && this.consulta.fc <= 100) {
          return 'branco'
      } 
      if (this.consulta.fc >= 41 && this.consulta.fc <= 50) {
          return 'verde'
      }    
      if (this.consulta.fc >= 101 && this.consulta.fc <= 110) { 
          return 'verde'    
      }    
      if (this.consulta.fc >= 111 && this.consulta.fc <= 129) { 
        return 'amarelo'    
      }
      if (this.consulta.fc <= 40) {
        return 'amarelo'                 
      }         
      if (this.consulta.fc >= 130) {
          return 'vermelho'                 
      } 
    } else {
      return 'branco' 
    }      
  } 
 
  formatar_fr() {
    if (this.consulta != null) {     
      var login = this.consulta.fr;

      if(this.consulta.fr != undefined){    
      login = login.replace(/\D/g, '');
      this.consulta.fr = login;
      }
    }
  }

  formatar_Temp() {
    if (this.consulta != null) {     
      var login = this.consulta.temp;
    
      if(this.consulta.temp != undefined){    
      login = login.replace(",", '.');
      this.consulta.temp = login;
      }
    }  

  }

  formatar_pasist() {
    if (this.consulta != null) {     
      var login = this.consulta.pasist;
      
      if(this.consulta.pasist != undefined){        
      login = login.replace(/\D/g, '');
      this.consulta.pasist = login;
      }
    }
  }

  formatar_fc() {
    if (this.consulta != null) {     
      var login = this.consulta.fc;

      if(this.consulta.fc != undefined){    
      login = login.replace(/\D/g, '');
      this.consulta.fc = login;
      }
    }
  }

  incluir() {           


    if (this.consulta.fr == null) {
      alert("Informe a frequência");
      return;
    }

    if (this.consulta.temp == null) {
      alert("Informe a temperatura");
      return;
    }

    if (this.consulta.pasist == null) {
      alert("Informe o PAsist");
      return;
    }

    if (this.consulta.fc == null) {
      alert("Informe a frequência");
      return;
    }

    if (this.consulta.nc == null) {
      alert("Informe o nível de consciência");
      return;
    }

    this.score_calculado = this.calculaEscore(this.consulta);
    this.cor_calculada = this.getScoreClass(this.score_calculado);
    if (this.leito.consultas.length >= 0) {  
              
      //this.leito.consultas[0].score
       if (this.cor_calculada != null && this.cor_calculada != '') {

              this.leito_consulta = this.leito_consulta.consultas.filter((consulta) => {
                return (consulta.cor.indexOf(this.cor_calculada) > -1);
              })             
       }    
      if (this.leito_consulta.length == 0) {
        this.consulta.avaliacao = 1;
        this.provedor.setReavaliar(0);  
      } else {
        this.consulta.avaliacao = this.leito_consulta.length + 1;
        this.consulta.cor = this.cor_calculada;
        this.provedor.setReavaliar(this.leito_consulta.length);  
      }  
    
    }        

    this.total = 0;   
    this.consulta.score = this.score_calculado;
    this.consulta.cor = this.cor_calculada;
    
    var index = this.leito.consultas.indexOf(this.consulta);
    if (index < 0) {
      this.leito.consultas.push(this.consulta);
    } else {
      this.leito.consultas[index] = this.consulta;
    }
      
    this.salvar();        
    this.navCtrl.getRootNav().push(EscorePage);  
  } 

  visualizar() {
    this.navCtrl.getRootNav().push(EscorePage);  
  }

  salvar() {
    var index = this.provedor.leitos.indexOf(this.leito);
    if (index >= 0) {
      this.provedor.leitos[index] = this.leito;
    }
    var leitoText = JSON.stringify(this.provedor.leitos);
    NativeInterfaceService.setPreference('leitos',leitoText);
  }

  escoreFr(evento) {
    if (this.consulta != null) {     
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
  }  

   escoreTemp(evento) {   
    if (this.consulta != null) {     
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
  }
  
  escorePasist(evento) {    
    if (this.consulta != null) {     
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
  }  

  escoreFc(evento) {    
    if (this.consulta != null) {     
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
  }   

  escoreNc(evento) {   
    if (this.consulta != null) {     
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
  } 

  getScoreClass(score) {
    if (score == 0) return 'branco';
    if (score == 1 || score == 2 || score ==  4) return 'verde';
    if (score == 3 && this.valida_amarelo() == true) return 'amarelo';
    if (score == 3 && this.valida_amarelo() == false) return 'verde';
    if (score >= 5 && score <= 6) return 'amarelo';
    if (score >= 7) return 'vermelho';

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

calculaEscore($event) {  
  this.total = 0;
  this.total = this.total + this.escoreFr(this.consulta.fr);
  this.total = this.total + this.escoreFc(this.consulta.fc);
  this.total = this.total + this.escoreTemp(this.consulta.temp);
  this.total = this.total + this.escorePasist(this.consulta.pasist);
  this.total = this.total + this.escoreNc(this.consulta.nc);
  return this.total;
} 

voltar() {       
  this.navCtrl.getRootNav().push(AcompanhamentoListaPage);  
}

/*
voltar1() {       
  this.nav.pop();
}
*/
 
}
