import { ProtocoloSugeridoPage } from '../protocolo-sugerido/protocolo-sugerido';
import { AcompanhamentoListaPage } from '../acompanhamento-lista/acompanhamento-lista';
import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';

/**
 * Generated class for the LocalizacaoSugeridaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-localizacao-sugerida',
  templateUrl: 'localizacao-sugerida.html',
})
export class LocalizacaoSugeridaPage {

  constructor(public navCtrl: App, public provedor: HttpLeitos) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad LocalizacaoSugeridaPage');
  }

  getScoreClass(score, consulta1) {    
    //debugger;
    if (score ==  0) return 'branco menu_text';
    if (score ==  1 || score ==  2 || score ==  4) return 'verde menu_text';
    if (score == 3) return consulta1.cor || ' menu_text';
    //if (score == 3) return 'amarelo menu_text';
    if (score >= 5 && score <= 6) return 'amarelo menu_text';
    if (score >=  7) return 'vermelho menu_text';
  } 

  getMensagem(score, consulta1) {
    //debugger;
    if (score ==  0) return 'Vigilância rotina';
    if (score ==  1 || score ==  2 || score ==  4) return 'Vigilância Moderada';
    if (score == 3 && consulta1.cor == 'verde') return 'Vigilância Moderada';
    if (score == 3 && consulta1.cor == 'amarelo') return 'Vigilância Alerta';
    if (score >= 5 && score <= 6) return 'Vigilância Alerta';
    if (score >=  7) return 'Alta Vigilância \n Avaliar possibilidade de transferência para unidade fechada';    
  }

  finalizar(){  
    //this.navCtrl.navPop();
    this.navCtrl.getRootNav().push(AcompanhamentoListaPage);
  }


  voltar() {       
    this.navCtrl.getRootNav().push(ProtocoloSugeridoPage);  
  }
  

}
