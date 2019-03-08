import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { setTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ModalParticipantePage } from '../modal/modal-participante/modal-participante.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    //ModalParticipantePage,
    ReactiveFormsModule,
    TabsPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader), deps: [HttpClient]
      }
    })
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
