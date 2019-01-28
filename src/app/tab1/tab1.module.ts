import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ModalCategoriaPage } from '../modal/modal-categoria/modal-categoria.page';
import { ModalParticipantePage } from '../modal/modal-participante/modal-participante.page';
import { PuntosParticipantePage } from '../modal/puntos-participante/puntos-participante.page';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { setTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader), deps: [HttpClient]
      }
    })

  ],
declarations: [Tab1Page, ModalParticipantePage, ModalCategoriaPage,PuntosParticipantePage ],
  entryComponents: [ModalParticipantePage, ModalCategoriaPage, PuntosParticipantePage ]
})
export class Tab1PageModule { }
