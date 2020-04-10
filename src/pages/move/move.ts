import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';


@Component({
  selector: 'page-move',
  templateUrl: 'move.html',
})
export class MovePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public provedor: HttpLeitos) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovePage');
  }

  voltar() {
    this.navCtrl.pop();
  }
}
