import { Component, OnInit } from '@angular/core';
import { App } from 'ionic-angular';
import { LeitoListaPage } from '../leito-lista/leito-lista';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';
import { NativeInterfaceService } from '../../app/services/native-interface/native-interface.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {  
  container = {
    coren: null,
    estado: null
  }
  
  constructor(public navCtrl: App, public provedor: HttpLeitos) { }
  
  ngOnInit() {       
    this.container.coren = NativeInterfaceService.getPreference('coren',null);
    this.container.estado = NativeInterfaceService.getPreference('estado',null);
    console.log("coren " + this.container.coren);
    console.log("estado " + this.container.estado);
    this.carregaCoren();
  }


/*  ionViewDidLoad() {
    
    //debugger;
    this.container.coren = NativeInterfaceService.getPreference('coren',null);
    this.container.estado = NativeInterfaceService.getPreference('estado',null);
    console.log("core " + this.container.coren);
   // NativeInterfaceService.setPreference('coren',null);
   // NativeInterfaceService.setPreference('estado',null);   
    this.carregaCoren();
  }*/
  
  inclui_coren() {     
    this.provedor.setCoren(this.container.coren); 
    NativeInterfaceService.setPreference('coren',this.container.coren);
    //this.provedor.setEstado(this.container.estado);     
    //NativeInterfaceService.setPreference('estado', this.container.estado);
    this.validar_coren;
  }
  
  inclui_estado() {  
    this.provedor.setEstado(this.container.estado);     
    NativeInterfaceService.setPreference('estado', this.container.estado);
    this.validar_coren;  
  }
  
  validar_coren() {    
    if (this.container.coren.length!=6 || this.container.estado.length==0){
      return true;
    } else if (this.container.coren.length == 6 || this.container.estado.length!=0) {      
      return false;
    }
  }

  carregaCoren() {
    if (this.container.coren == null) {
      this.container.coren = this.provedor.coren;
    }
    if (this.container.estado == null) {
      this.container.estado = this.provedor.estado;    
    }      
    
  }
  
  formatar() {
       var login = this.container.coren;

       if(this.container.coren != undefined){
        login = login.replace(/\D/g, '');
        this.container.coren = login;        
       }

  }

  processo() {
    this.inclui_coren();
    this.inclui_estado();

   // console.log("coren " + this.container.coren);
   // console.log("estado " + this.container.estado);

    this.navCtrl.getRootNav().push(LeitoListaPage);  
  }
  
}
