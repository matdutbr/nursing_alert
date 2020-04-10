import { LeitoListaPage } from '../leito-lista/leito-lista';
import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, App, NavController } from 'ionic-angular';
import { NativeInterfaceService } from '../../app/services/native-interface/native-interface.service';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage implements OnInit { 
 
  leito: any;
  novo_leito: string;
  
  constructor(public navCtrl: NavController, public nav: App, private view: ViewController, public provedor: HttpLeitos) {    
  }

  ngOnInit() { 
      this.leito = this.provedor.getLeito();  
      this.novo_leito = "";
      this.provedor.setReavaliar(false);
  }
   
  ionViewDidLoad() {      
  }

  closeModal() {
    this.view.dismiss();
  }
  
  incluir(evento) {     
    
    var leito = {
      nome: this.novo_leito,
      data: new Date(),
      score: 0,
      consultas: []
    }
    this.provedor.leitos.push(leito);
    this.salvar();   

  }

  salvar() {
    var leitoText = JSON.stringify(this.provedor.leitos);
    NativeInterfaceService.setPreference('leitos',leitoText);
    this.nav.getRootNav().push(LeitoListaPage);   
    this.view.dismiss();
  }

  voltar() {
    this.navCtrl.pop();
  }

}
