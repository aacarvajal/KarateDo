import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalParticipantePage } from './modal-participante.page';
import { TranslateModule } from '@ngx-translate/core';
//import { PuntosParticipantePage } from '../puntos-participante/puntos-participante.page';

const routes: Routes = [
  {
    path: '',
    component: ModalParticipantePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [/*ModalParticipantePage, PuntosParticipantePage*/],
  entryComponents: [/*PuntosParticipantePage*/],
})
export class ModalParticipantePageModule { }
