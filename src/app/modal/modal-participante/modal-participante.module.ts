import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalParticipantePage } from './modal-participante.page';

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
    //ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalParticipantePage]
})
export class ModalParticipantePageModule { }
