import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { setTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { PuntosParticipantePage } from '../modal/puntos-participante/puntos-participante.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader), deps: [HttpClient]
      }
    })


  ],
declarations: [Tab2Page/*, PuntosParticipantePage*/],
entryComponents: [/*PuntosParticipantePage*/],
})
export class Tab2PageModule {}
