import { DiagnosticoEnfernmagemPage } from '../diagnostico-enfernmagem/diagnostico-enfernmagem';
import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { ProtocoloSugeridoPage } from '../protocolo-sugerido/protocolo-sugerido';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';
import { LocalizacaoSugeridaPage } from '../localizacao-sugerida/localizacao-sugerida';

@Component({
  selector: 'page-intervencao-enfernmagem',
  templateUrl: 'intervencao-enfernmagem.html',
})
export class IntervencaoEnfernmagemPage implements OnInit {
 // leito: any;
  //consulta: any;
  fonte: number;
  sugerida: number;
  constructor(public navCtrl: App, public provedor: HttpLeitos) {
  }

  ngOnInit() {         
    this.fonte = 0;
    this.sugerida = 0;
    this.fonte_visivel();   

    this.verificar(); 
  }  

  ionViewDidLoad() {      
  }  

  verificar() {    
    if (this.provedor.consulta.temp >= 38.5) {
      this.sugerida = 1;
    } 
    if (this.provedor.consulta.pasist >= 200) {
      this.sugerida = 1;
    }
    if (this.provedor.consulta.pasist >= 71 && this.provedor.consulta.pasist <= 80) {
      this.sugerida = 1;
    }
    if (this.provedor.consulta.fc <= 40) {
      this.sugerida = 1
    }
    if (this.provedor.consulta.fr < 9) {
      this.sugerida = 1
    }
  } 

  protocolo() {
    if (this.sugerida > 0) {
      this.navCtrl.getRootNav().push(ProtocoloSugeridoPage);
    } else {
      this.navCtrl.getRootNav().push(LocalizacaoSugeridaPage);
    }
    
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
      return ''
    } 
    if (valor.fr >= 15 && valor.fr <= 20) {
        return 'Verificar nessessidade de aspiração de VAS \n Manter controle das VAS \n Verificar glicemia \n Posicionar paciente adequadamente no leito'
    }    
    if (valor.fr >= 21 && valor.fr <= 29) { 
        return 'Controlar VAS \n Avaliar oxigenoterapia instalada'    
    }    
    if (valor.fr < 9) { 
        return 'Verificar se VAS pérveas \n Instalar oxigenoterapia prescrita \n Controlar glicemia \n Posicionar carro de PCR' 
    }      
    if (valor.fr >= 30) {
        return 'Avaliar assistência ventilatória \n Preparar material para entubação \n Puncionar acesso venoso calibroso'                 
    }      
  }

  getMensagemTemp(valor) {
    if (valor.temp >= 35 && valor.temp <= 38.4) {
      return ''
    } 
    if (valor.temp < 35) {
        return 'Avaliar perdas térmicas \n Manter controle do ambiente'
    }    
    if (valor.temp >= 38.5) { 
        return 'Realizar curva térmica \n Avaliar resfriamento corporal \n Avaliar uso de anti-térmico'    
    }       
  }

  getMensagemPA(valor) {   
    if (valor.pasist >= 81 && valor.pasist <= 100) {
      return 'Investigar sintomas de lesão de outros órgãos \n Avaliar anti-hipertensivos administrados'
    } 
    if (valor.pasist >= 101 && valor.pasist <= 199) {
        return ''
    }    
    if (valor.pasist >= 71 && valor.pasist <= 80) { 
        return 'Verificar posicionamento do cliente \n Puncionar acesso calibroso \n Administrar volume se prescrito \n Posicionar carro de PCR'    
    }    
    if (valor.pasist >= 200) { 
        return 'Verificar monitorização \n Avaliar anti-hipertensivos administrados' 
    }      
    if (valor.pasist <= 70) {
        return 'Verificar acesso venoso calibroso \n  Avaliar débito urinário \n Avaliar pele fria/pegajosa \n Administrar volume se prescrito'                 
    }      
  }

  getMensagemFc(valor) {
    if (valor.fc >= 51 && valor.fc <= 100) {
      return ''
    } 
    if (valor.fc >= 41 && valor.fc <= 50) {
        return 'Avaliar volumes administrados \n Investigar presença de sangramento'
    }    
    
    if (valor.fc >= 101 && valor.fc <= 110) { 
        return 'Avaliar dor \n Avaliar fatores de estresse'    
    }    
    if (valor.fc <= 40) { 
        return 'Investigar perdas de volume \n Instalar acesso periférico calibroso \n Posicionar carro de PCR' 
    }      
    if (valor.fc >= 111 && valor.fc <= 129) { 
        return 'Avaliar fatores desencadeantes \n Avaliar medicações administradas'                 
    }      
    if (valor.fc >= 130) { 
      return 'Controlar volume de líquidos ganhos \n Posicionar paciente adequadamente no leito \n Evitar esforço físico'                 
    }      
  }

  getMensagemNc(valor) {
    if (valor.nc == 'Alerta') {
      return ''
    } 
    if (valor.nc == 'Reage a voz') {
        return 'Avaliar nível de alteração neurológica'
    }    
    if (valor.nc == 'Reage a dor') { 
        return 'Avaliar fatores desencadeantes de alteração neurológica \n manter VAS pérveas'    
    }    
    if (valor.nc == 'Sem reação') { 
        return 'Controlar VAS \n Verificar suporte ventilatório \n  Avaliar sinais vitais \n Manter acesso venoso calibroso' 
    }         
  }

  getScoreClass(valor, consulta1) {       
    if (valor.score ==  0) return 'menu_text';
    if (valor.score ==  1 || valor.score ==  2 || valor.score ==  4) return 'menu_text';    
    if (valor.score == 3) return consulta1.cor || 'menu_text';
    //if (valor.score == 3) return 'menu_text';
    if (valor.score >= 5 && valor.score <= 6) return 'menu_text';
    if (valor.score >=  7) return 'menu_text';    
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

  voltar() {       
    this.navCtrl.getRootNav().push(DiagnosticoEnfernmagemPage);  
  }

}
