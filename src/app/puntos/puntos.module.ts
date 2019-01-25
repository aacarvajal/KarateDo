import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PuntosPage } from './puntos.page';
import { PuntosParticipantePage } from '../modal/puntos-participante/puntos-participante.page';

const routes: Routes = [
  {
    path: '',
    component: PuntosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PuntosPage, ],//PuntosParticipantePage
  entryComponents:[],//PuntosParticipantePage
})
export class PuntosPageModule {}
