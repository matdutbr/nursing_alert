import { SinaisVitaisPage } from '../sinais-vitais/sinais-vitais';
import { Component, OnInit } from '@angular/core';
import { App, ItemSliding, AlertController } from 'ionic-angular';
import { NativeInterfaceService } from '../../app/services/native-interface/native-interface.service';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';
import { LeitoListaPage } from '../leito-lista/leito-lista';
import { EscorePage } from '../escore/escore';

@Component({
  selector: 'page-acompanhamento-lista',
  templateUrl: 'acompanhamento-lista.html',
})
export class AcompanhamentoListaPage implements OnInit {
  leito: any;
  leito_filter: any;
  leito_consulta: any;  
  filtando_cor: any;  

  constructor(public navCtrl: App, public provedor: HttpLeitos, public alertCtrl: AlertController) {  
  }

  ngOnInit() {         
    this.leito = this.provedor.getLeito();      
    this.leito_consulta = this.leito.consultas;      
  }  

  ionViewDidLoad() {    
  }

  incluir() {           

    var consulta = {
      data: Date(),
      fr: null,
      temp: null,
      pasist: null,
      fc: null,
      nc: null,       
      score: null,
      cor: null,
      avaliacao: null
    };
    this.provedor.setConsulta(consulta);
    this.navCtrl.getRootNav().push(SinaisVitaisPage);    

  }

  excluirConfirm(slidingItem: ItemSliding) {
    let alert = this.alertCtrl.create({
      title: 'Exclusão',
      message: 'Confirma a exclusão deste acompanhamento?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('exclusao cancelada');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            var index = this.leito.consultas.indexOf(slidingItem);
            if (index >= 0) {
              this.leito.consultas.splice(index,1);
              this.salvar();
            }         
          }
        }
      ]
    });
    alert.present();
  }

  excluir(slidingItem: ItemSliding) {
    var index = this.leito.consultas.indexOf(slidingItem);
    if (index >= 0) {
      this.leito.consultas.splice(index,1);
      this.salvar();
    }
  }
 

  consultar(event, item) {
    this.provedor.setConsulta(item);
    this.navCtrl.getRootNav().push(EscorePage);  
  }

  voltar() {       
    this.navCtrl.getRootNav().push(LeitoListaPage);  
  }

  salvar() {
    var leitoText = JSON.stringify(this.provedor.leitos);
    NativeInterfaceService.setPreference('leitos',leitoText);

  }

  getScoreClass(score, consulta1) { 
    //debugger; 
    if (score == 0) return 'branco';
    if (score == 1 || score == 2 || score ==  4) return 'verde';
    if (score == 3) return consulta1.cor;
   // if (score == 3 && this.valida_amarelo() == true) return 'amarelo';
    //if (score == 3 && this.valida_amarelo() == false) return 'verde';
    if (score >= 5 && score <= 6) return 'amarelo';
    if (score >= 7) return 'vermelho';

  } 
  
 
}
