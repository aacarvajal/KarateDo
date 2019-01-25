import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ModalCategoriaPage } from '../modal/modal-categoria/modal-categoria.page';
import { ModalParticipantePage } from '../modal/modal-participante/modal-participante.page';
import { PuntosParticipantePage } from '../modal/puntos-participante/puntos-participante.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
declarations: [Tab1Page, ModalParticipantePage, ModalCategoriaPage,PuntosParticipantePage ],//PuntosParticipantePage
  entryComponents: [ModalParticipantePage, ModalCategoriaPage, PuntosParticipantePage ] //PuntosParticipantePage
})
export class Tab1PageModule { }
