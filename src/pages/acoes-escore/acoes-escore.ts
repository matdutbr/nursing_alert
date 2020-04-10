import { MovePage } from '../move/move';
import { ProtocolopcrPage } from '../protocolopcr/protocolopcr';
import { Component, OnInit } from '@angular/core';
import { NavParams, App } from 'ionic-angular';
import { DiagnosticoEnfernmagemPage } from '../diagnostico-enfernmagem/diagnostico-enfernmagem';
import { HttpLeitos } from '../../providers/http-leitos/http-leitos';
import { EscorePage } from '../escore/escore';

@Component({
  selector: 'page-acoes-escore',
  templateUrl: 'acoes-escore.html',
})
export class AcoesEscorePage implements OnInit {
  cor1: string; 
  cor2: string; 
  scoreultimo: number;   
  leito_consultas: any;

  constructor(public navParams: NavParams, public provedor: HttpLeitos, public navCtrl: App ) {
  }

  ngOnInit() {       
    this.leito_consultas = this.provedor.getConsulta();

    if (this.leito_consultas.avaliacao == 1) {
      this.provedor.setReavaliar(0);     
      this.provedor.setUltimoEscore(0);  
    } else if (this.leito_consultas.avaliacao == 2) {
      this.provedor.setReavaliar(1);
    } else if (this.leito_consultas.avaliacao >= 3) {
      this.provedor.setReavaliar(2);
    }  
  }  

  ionViewDidLoad() {       
    
  }

 
  diagnosticos() {
    //this.navCtrl.pop();
    this.navCtrl.getRootNav().push(DiagnosticoEnfernmagemPage);  
  }

  protocoloPCR() {
    //this.navCtrl.pop();
    this.navCtrl.getRootNav().push(ProtocolopcrPage); 
  }

  Move() {
    //this.navCtrl.pop();
    this.navCtrl.getRootNav().push(MovePage); 
  }

  mensagemscore(score) {  
    if (this.provedor.getReavaliar() == 0) {
      if (score == 0) return  'Monitorizar SV a cada 6h ou seguir rotina do setor';
      if (score == 1 || score == 2 || score == 4) return "Avaliar paciente \n Avaliar parâmetros alterados \n Revisar plano de cuidados \n Reavaliar paciente após 1 hora";
      if (score == 3 && this.leito_consultas.cor == 'verde') return "Avaliar paciente \n Avaliar parâmetros alterados \n Revisar plano de cuidados \n Reavaliar paciente após 1 hora";
      if (score == 3 && this.leito_consultas.cor == 'amarelo') return 'Solicitar avaliação médica urgente \n (máx de 15 min) \n Revisar plano de cuidado \n Instalar monitoração não invasiva \n Reavaliar paciente após 1 hora';
      if (score >= 5 && score <= 6) return 'Solicitar avaliação médica urgente \n (máx de 15 min) \n Revisar plano de cuidado \n Instalar monitoração não invasiva \n Reavaliar paciente após 1 hora';
      if (score >= 7) return  'Solicitar acionar médico em caráter de emergência \n Posicionar carro de PCR \n Monitorizar com cardioversor \n Verificar a presença de pulso carotídeo e movimentos ventilatórios \n Identificar: se paciente em PCR e iniciar protocolo \n Se não estiver em PCR iniciar MOVE';

    } else if (this.provedor.getReavaliar() == 1) {
      if (score == 0) return  'Monitorizar SV a cada 6h ou seguir rotina do setor';
      if (score == 1 || score == 2 ) return 'manter monitorização mínima de 4 a 6 horas';
      if (score == 3 && this.leito_consultas.cor == 'verde') return 'manter monitorização mínima de 4 a 6 horas';
      if (score == 4) return 'solicitar avaliação médica em até 30 min \n Reavaliar plano de cuidados \n Monitorização mínima a cada 4h com reavaliação médica agendada';
      if (score == 3 && this.leito_consultas.cor == 'amarelo') return 'Avaliar medidas anteriores \n Checar monitorização \n Checar plano de cuidados \n Checar prescição nova \n Reavaliar após 1 hora';
      if (score >= 5 && score <= 6) return 'Avaliar medidas anteriores \n Checar monitorização \n Checar plano de cuidados \n Checar prescição nova \n Reavaliar após 1 hora';
      if (score >= 7) return 'Solicitar acionar médico em caráter de emergência \n Posicionar carro de PCR \n Monitorizar com cardioversor \n Verificar a presença de pulso carotídeo e movimentos ventilatórios \n Identificar: se paciente em PCR e iniciar protocolo \n Se não estiver em PCR iniciar MOVE';      
    } else {
      if (score == 0) return 'Monitorizar SV a cada 6h ou seguir rotina do setor';           
      if (score == 1 || score == 2 || score == 4) return 'solicitar avaliação médica em até 30 min \n Reavaliar plano de cuidados \n Monitorização mínima a cada 4h com reavaliação médica agendada';
      if (score == 3 && this.leito_consultas.cor == 'verde') return 'solicitar avaliação médica em até 30 min \n Reavaliar plano de cuidados \n Monitorização mínima a cada 4h com reavaliação médica agendada';    
      if (score == 3 && this.leito_consultas.cor == 'amarelo') return 'Se persistir no amarelo chamar médico em caráter de urgência para reavaliar prescrição e considerar transferência para unidade fechada. \n Se permanecer na unidade aberta manter monitoramento de 4-4h com reavaliação médica agendada.';
      if (score >= 5 && score <= 6) return 'Se persistir no amarelo chamar médico em caráter de urgência para reavaliar prescrição e considerar transferência para unidade fechada. \n Se permanecer na unidade aberta manter monitoramento de 4-4h com reavaliação médica agendada.';      
      if (score >= 7) return 'Solicitar acionar médico em caráter de emergência \n Posicionar carro de PCR \n Monitorizar com cardioversor \n verificar a presença de pulso carotídeo e movimentos ventilatórios \n Identificar: se paciente em PCR e iniciar protocolo \n Se não estiver em PCR iniciar MOVE';
    }
  }

  getScoreClass(score, consulta1) {  
    if (score == 0) return 'branco menu_text';
    if (score == 1 || score == 2 || score == 4) return 'verde menu_text';
    if (score == 3) return consulta1.cor || ' menu_text';
    //if (score == 3) return 'amarelo menu_text';
    if (score >= 5 && score <= 6) return 'amarelo menu_text';
    if (score >= 7) return  'vermelho menu_text';
  } 


  voltar() {       
    this.navCtrl.getRootNav().push(EscorePage);  
  }
}
