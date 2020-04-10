import { AcompanhamentoListaPage } from '../acompanhamento-lista/acompanhamento-lista';
import { Component, OnInit } from '@angular/core';
import { App, AlertController, ItemSliding, ModalController, Platform } from 'ionic-angular';
import { NativeInterfaceService } from '../../app/services/native-interface/native-interface.service';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';

@Component({
  selector: 'page-leito-lista',
  templateUrl: 'leito-lista.html',
})

export class LeitoListaPage implements OnInit {    
  leitos: any[];

  constructor(public navCtrl: App, public platform: Platform, public modalcontroller: ModalController,public alertCtrl: AlertController, public provedor: HttpLeitos) {
    this.platform = platform;    
    this.carregaLeitos();
  }

  ngOnInit() { 
    this.provedor.setReavaliar(0);  
  } 

  ionViewDidLoad() {   
    var leitosCarregados = NativeInterfaceService.getPreference('leitos',null);    
    if (leitosCarregados != null) {
      this.provedor.leitos = JSON.parse(leitosCarregados);
    } else {
      this.provedor.leitos = [];
    }        
    this.carregaLeitos();
  }

  carregaLeitos() {    
    this.leitos = this.provedor.leitos; 
  }

  getScoreClass(score, leito) {     
    if (leito == null) return null;
    if (leito.consultas == null || leito.consultas.length == 0) return null;
    var index = leito.consultas.length - 1;
    var consulta1 = leito.consultas[index];
    //debugger;

    if (score == 0) return 'branco';
    if (score == 1 || score == 2 || score == 4) return 'verde';
    if (score == 3) return consulta1.cor;
    if (score >= 5 && score <= 6) return 'amarelo';
    if (score >= 7) return 'vermelho';

  }
  
  excluirConfirm(slidingItem: ItemSliding) {
    let alert = this.alertCtrl.create({
      title: 'Exclusão',
      message: 'Confirma a exclusão deste leito?',
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
            var index = this.provedor.leitos.indexOf(slidingItem);
            if (index >= 0) {
              this.provedor.leitos.splice(index,1);
              this.salvar();
            }         
          }
        }
      ]
    });
    alert.present();
  }

  getLeitos(searchTerm: any) {
    this.carregaLeitos();    
    const val = searchTerm.data;   
     
    if (val && val.trim() != '') {
       this.leitos = this.leitos.filter((leito) => {
       return (leito.nome.indexOf(val) > -1);
        })
    }

    /*if (leito == null) return null;
    if (this.provedor.leitos.length == 0) return null;
    var index = leito;   
    var consulta = this.provedor.leitos[index.data];
    return consulta; */
  }

  getData(leito) {
    if (leito == null) return null;   
    if (leito.consultas == null || leito.consultas.length == 0) return null;
    var index = leito.consultas.length - 1;
    var consulta = leito.consultas[index];
    return consulta.data;

  }

  /*getData(leito) {
    if (leito == null) return null;
    if (leito.consultas == null || leito.consultas.length == 0) return null;
    var index = leito.consultas.length - 1;
    var consulta = leito.consultas[index];
    return consulta.data;

  } */

  getScore(leito) {
    if (leito == null) return null;
    if (leito.consultas == null || leito.consultas.length == 0) return null;
    var index = leito.consultas.length - 1;
    var consulta = leito.consultas[index];
    return consulta.score;
  }

  excluir(slidingItem: ItemSliding) {
 
    var index = this.provedor.leitos.indexOf(slidingItem);
    if (index >= 0) {
      this.provedor.leitos.splice(index,1);
      this.salvar();
    }
  }

  consultar(event, leito) {
    this.provedor.setReavaliar(0);  
    this.provedor.setLeito(leito);      
    //this.navCtrl.navPop();  
    this.navCtrl.getRootNav().push(AcompanhamentoListaPage);          
  }  

  chama_modal(event, leito) {   
    this.provedor.setLeito(leito);    
    const modal = this.modalcontroller.create('ModalPage'); 
    //this.navCtrl.pop();
    modal.present();   
  }  

 
salvar() {
  var leitoText = JSON.stringify(this.provedor.leitos);
  NativeInterfaceService.setPreference('leitos',leitoText);

}

exitApp() {
  this.platform.exitApp();
}

}