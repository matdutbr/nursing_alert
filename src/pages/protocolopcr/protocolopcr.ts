import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';

/**
 * Generated class for the ProtocolopcrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-protocolopcr',
  templateUrl: 'protocolopcr.html',
})
export class ProtocolopcrPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public provedor: HttpLeitos) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProtocolopcrPage');
  }

  voltar() {
    this.navCtrl.pop();
  }

}
