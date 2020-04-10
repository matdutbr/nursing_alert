import { AcoesEscorePage } from '../acoes-escore/acoes-escore';
import { SinaisVitaisPage } from '../sinais-vitais/sinais-vitais';
import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { IntervencaoEnfernmagemPage } from '../intervencao-enfernmagem/intervencao-enfernmagem';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';

@Component({
  selector: 'page-diagnostico-enfernmagem',
  templateUrl: 'diagnostico-enfernmagem.html',
})
export class DiagnosticoEnfernmagemPage implements OnInit { 
  leito: any;
  fonte: number;
  constructor(public navCtrl: App, public provedor: HttpLeitos) {
  }
  
  ionViewDidLoad() {      
  }

  ngOnInit() {  
    this.fonte = 0;     
    this.fonte_visivel(); 
  }
  
  fonte_visivel() {    
    var valor = this.provedor.consulta;
    if (valor.fr >= 9 && valor.fr <= 14) {
       this.fonte = 2;
    } 
    if (valor.temp >= 35 && valor.temp <= 38.4) {
      this.fonte = 2 + this.fonte;
    } 
    if (valor.pasist >= 101 && valor.pasist <= 199) {
      this.fonte = 2 + this.fonte;
    }  
    if (valor.fc >= 51 && valor.fc <= 100) {
      this.fonte = 2 + this.fonte;
    } 
    if (valor.nc == 'Alerta') {
      this.fonte = 2 + this.fonte;
    } 

  }

  getMensagemFr(valor) {    
    if (valor.fr >= 9 && valor.fr <= 14) {
      return 'Normopneico'
    } 
    if (valor.fr >= 15 && valor.fr <= 20) {
        return 'Padrão ventilatório ineficaz'
    }    
    if (valor.fr >= 21 && valor.fr <= 29) { 
        return 'Padrão ventilatório ineficaz'    
    }    
    if (valor.fr < 9) { 
        return 'Ventilação espontânea prejudicada' 
    }      
    if (valor.fr >= 30) {
        return 'Troca de gases prejudicada'                 
    }      
  }

  getCorFr(valor) {
   
    if (valor.fr >= 9 && valor.fr <= 14) {
      return 'branco menu_text'
    } 
    if (valor.fr >= 15 && valor.fr <= 20) {
        return 'verde menu_text'
    }    
    if (valor.fr >= 21 && valor.fr <= 29) { 
        return 'amarelo menu_text'    
    }    
    if (valor.fr < 9) { 
        return 'amarelo menu_text' 
    }      
    if (valor.fr >= 30) {
        return 'vermelho menu_text'                 
    }    
  }

  getMensagemTemp(valor) {    
    if (valor.temp >= 35 && valor.temp <= 38.4) {
      return 'Normotérmico'
    } 
    if (valor.temp < 35) {
        return 'Termorregulação ineficaz'
    }    
    if (valor.temp >= 38.5) { 
        return 'Termorregulação ineficaz'    
    }       
  }

  getCorTemp(valor) {
   
    if (valor.temp >= 35 && valor.temp <= 38.4) {
      return 'branco menu_text'
    } 
    if (valor.temp < 35) {
        return 'amarelo menu_text'
    }    
    if (valor.temp >= 38.5) { 
        return 'amarelo menu_text'    
    }   

  }
  

  getMensagemPA(valor) {
    if (valor.pasist >= 81 && valor.pasist <= 100) {
      return 'Pressão sistólica diminuída'
    } 
    if (valor.pasist >= 101 && valor.pasist <= 199) {
        return 'Normotenso'
    }    
    if (valor.pasist >= 71 && valor.pasist <= 80) { 
        return 'Pressão sistólica diminuída'    
    }    
    if (valor.pasist >= 200) { 
        return 'Hipertensão sistólica' 
    }      
    if (valor.pasist <= 70) {
        return 'Risco para choque'                 
    }      
  }

  getCorPa(valor) {
   
    if (valor.pasist >= 81 && valor.pasist <= 100) {
      return 'verde menu_text'
    } 
    if (valor.pasist >= 101 && valor.pasist <= 199) {
        return 'branco menu_text'
    }    
    if (valor.pasist >= 71 && valor.pasist <= 80) { 
        return 'amarelo menu_text'    
    }    
    if (valor.pasist >= 200) { 
        return 'amarelo menu_text' 
    }      
    if (valor.pasist <= 70) {
        return 'vermelho menu_text'                 
    }   
  }

  getMensagemFc(valor) {
    if (valor.fc >= 51 && valor.fc <= 100) {
      return 'Normocárdico'
    } 
    if (valor.fc >= 41 && valor.fc <= 50) {
        return 'Padrão cardíaco diminuído'
    }    
    if (valor.fc >= 101 && valor.fc <= 110) { 
        return 'Padrão cardíaco aumentado'    
    }    
    if (valor.fc <= 40) { 
        return 'Padrão cardíaco diminuído' 
    }      
    if (valor.fc >= 111 && valor.fc <= 129) { 
        return 'Padrão cardíaco aumentado'                 
    }      
    if (valor.fc >= 130) { 
      return 'Débito cardíaco aumentado'                 
    }      
  }

  getCorFc(valor) {
   
    if (valor.fc >= 51 && valor.fc <= 100) {
      return 'branco menu_text'
    } 
    if (valor.fc >= 41 && valor.fc <= 50) {
        return 'verde menu_text'
    }    
    if (valor.fc >= 101 && valor.fc <= 110) { 
        return 'verde menu_text'    
    }    
    if (valor.fc <= 40) { 
        return 'amarelo menu_text' 
    }      
    if (valor.fc >= 111 && valor.fc <= 129) { 
        return 'amarelo menu_text'                 
    }      
    if (valor.fc >= 130) { 
      return 'vermelho menu_text'                 
    }    

  }


  getMensagemNc(valor) {
    if (valor.nc == 'Alerta') {
      return 'Normovigil'
    } 
    if (valor.nc == 'Reage a voz') {
        return 'Nível de consciência alterado'
    }    
    if (valor.nc == 'Reage a dor') { 
        return 'Nível de consciência alterado'    
    }    
    if (valor.nc == 'Sem reação') { 
        return 'Nível de inconsciência' 
    }         
  }

  getCorNc(valor) {
   
    if (valor.nc == 'Alerta') {
      return 'branco menu_text'
    } 
    if (valor.nc == 'Reage a voz') {
        return 'verde menu_text'
    }    
    if (valor.nc == 'Reage a dor') { 
        return 'amarelo menu_text'    
    }    
    if (valor.nc == 'Sem reação') { 
        return 'vermelho menu_text' 
    }  

  }


  getScoreClass(score) {       
    if (score ==  0) return 'branco menu_text';
    if (score ==  1 || score ==  2 || score ==  4) return 'verde menu_text';
    if (score == 3) return 'amarelo menu_text';
    if (score >= 5 && score <= 6) return 'amarelo menu_text';
    if (score >=  7) return 'vermelho menu_text';
  } 

  intervencao() {
    //this.navCtrl.pop();
    this.navCtrl.getRootNav().push(IntervencaoEnfernmagemPage);
  }

  reavaliar(event) {
    this.navCtrl.getRootNav().push(SinaisVitaisPage);  
  }

  voltar() {       
    this.navCtrl.getRootNav().push(AcoesEscorePage);  
  }

}
