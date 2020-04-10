import { ProtocolosepsePage } from '../pages/protocolosepse/protocolosepse';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LeitoListaPage } from '../pages/leito-lista/leito-lista';
import { SinaisVitaisPage } from '../pages/sinais-vitais/sinais-vitais';
import { AcompanhamentoListaPage } from '../pages/acompanhamento-lista/acompanhamento-lista';
import { EscorePage } from '../pages/escore/escore';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AcoesEscorePage } from '../pages/acoes-escore/acoes-escore';
import { DiagnosticoEnfernmagemPage } from '../pages/diagnostico-enfernmagem/diagnostico-enfernmagem';
import { IntervencaoEnfernmagemPage } from '../pages/intervencao-enfernmagem/intervencao-enfernmagem';
import { ProtocoloSugeridoPage } from '../pages/protocolo-sugerido/protocolo-sugerido';
import { LocalizacaoSugeridaPage } from '../pages/localizacao-sugerida/localizacao-sugerida';
import { HttpLeitos } from '../providers/http-leitos/http-leitos';
import { MovePage } from '../pages/move/move';
import { ProtocolopcrPage } from '../pages/protocolopcr/protocolopcr';
import { HttpModule } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AcompanhamentoListaPage,
    SinaisVitaisPage,
    EscorePage,
    AcoesEscorePage,   
    DiagnosticoEnfernmagemPage,
    IntervencaoEnfernmagemPage,
    ProtocoloSugeridoPage,
    ProtocolopcrPage,
    MovePage,
    ProtocolosepsePage,
    LocalizacaoSugeridaPage,
    LeitoListaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LeitoListaPage,
    SinaisVitaisPage,
    EscorePage,
    AcoesEscorePage,  
    ProtocolopcrPage,
    MovePage,
    ProtocolosepsePage,
    DiagnosticoEnfernmagemPage,
    IntervencaoEnfernmagemPage,
    ProtocoloSugeridoPage,
    LocalizacaoSugeridaPage,
    AcompanhamentoListaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpLeitos
  ]
})
export class AppModule {}
