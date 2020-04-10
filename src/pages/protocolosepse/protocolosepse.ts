import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';

@Component({
  selector: 'page-protocolosepse',
  templateUrl: 'protocolosepse.html',
})
export class ProtocolosepsePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public provedor: HttpLeitos) {
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ProtocolosepsePage');
  }

  voltar() {
    this.navCtrl.pop();
  }
}
