import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ModalCategoriaPage } from '../modal/modal-categoria/modal-categoria.page';
import { ModalParticipantePage } from '../modal/modal-participante/modal-participante.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, ModalParticipantePage, ModalCategoriaPage],
  entryComponents: [ModalParticipantePage, ModalCategoriaPage]
})
export class Tab1PageModule { }
