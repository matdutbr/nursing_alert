import { IntervencaoEnfernmagemPage } from '../intervencao-enfernmagem/intervencao-enfernmagem';
import { ProtocolosepsePage } from '../protocolosepse/protocolosepse';
import { ProtocolopcrPage } from '../protocolopcr/protocolopcr';
import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { LocalizacaoSugeridaPage } from '../localizacao-sugerida/localizacao-sugerida';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';

@Component({
  selector: 'page-protocolo-sugerido',
  templateUrl: 'protocolo-sugerido.html',
})
export class ProtocoloSugeridoPage implements OnInit {
  validar: number; 

  constructor(public navCtrl: App, public provedor: HttpLeitos) {    
  }

  ionViewDidLoad() {   
  }

  ngOnInit() { 
    this.validar = 0;
    this.verificar_PCR(this.provedor.consulta);
  }

  verificar_PCR(valor) {
    this.validar = 0;
    if (valor.fr < 9) {
      this.validar = 1
    }
    if (valor.pasist >= 200) {
      this.validar = 1
    } 
    if (valor.pasist >= 71 && valor.pasist <= 80) {
      this.validar = 1
    } 
    if (valor.fc <= 40) {
      this.validar = 1
    }
  }
  
  protocoloPCR() {
    //this.navCtrl.pop();
    this.navCtrl.getRootNav().push(ProtocolopcrPage); 
  }

  protocolosepse() {
    //this.navCtrl.pop();
    this.navCtrl.getRootNav().push(ProtocolosepsePage); 
  }

  getMensagem(valor) {
    if (valor.temp >= 38.5) { 
      return '*Verificar protocolo de sepse'    
    }   
    if (valor.pasist >= 200) { 
      return '*Verificar protocolo de PCR' 
    } 
    if (valor.fr >= 30) { 
      return '*Seguir protocolo de PCR ' 
    }   
    if (valor.pasist <= 70) { 
      return '*Seguir protocolo de PCR ' 
    }     
    if (valor.fc >= 130) { 
      return '*Seguir protocolo de PCR ' 
    }     
    if (valor.nc == "U") { 
      return '*Seguir protocolo de PCR ' 
    }     
  }

  getMensagemFr(valor) {    
    if (valor.fr >= 30 || valor.fr < 9) {
        return '*Seguir protocolo de PCR'                 
    } else {
      return '' 
    }     
  }

  getMensagemTemp(valor) {       
    if (valor.temp >= 38.5) { 
        return '*Verificar protocolo de sepse'    
    } else {
      return '' 
    }       
  }

  getMensagemPA(valor) {
    if (valor.pasist <= 70) {
        return '*Seguir protocolo de PCR'                 
    } 
    if (valor.pasist >= 71 && valor.pasist <= 80) {
        return '*Seguir protocolo de PCR'  
    } else {
      return '' 
    }       
  }

  getMensagemFc(valor) {
    if (valor.fc >= 130) { 
      return '*Seguir protocolo de PCR '         
    }
    if (valor.fc <= 40) {
      return '*Seguir protocolo de PCR '
    } else {
      return '' 
    }      
  }

  getMensagemNc(valor) {
  
    if (valor.nc == 'U') { 
        return '*Seguir protocolo de PCR' 
    } else {
      return '' 
    }         
  }

  Localizacao() {
    this.navCtrl.getRootNav().push(LocalizacaoSugeridaPage);
  }

  voltar() {       
    this.navCtrl.getRootNav().push(IntervencaoEnfernmagemPage);  
  }

}
